import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache, useRef } from 'react'
import RichText from 'src/app/components/RichText'

import type { Author, Media, Post } from '../../../../payload-types'

import { PostHero } from '../../../heros/PostHero'
import { generateMeta } from '../../../utilities/generateMeta'
import PageClient from './page.client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { File, Video } from 'lucide-react'
import Link from 'next/link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return posts.docs?.map(({ slug }) => slug)
}

export default async function Post({ params: { slug = '' } }) {
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  const video = post.video as Media
  const article = post.article as Media
  const authors = post.repositoryAuthors as Author[]

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <PostHero post={post} />

      <div className="flex flex-col gap-4 pt-8">
        <div className="container flex justify-center items-start my-4">
          {authors && (
            <div className="flex justify-start items-start flex-col gap-4">
              <p className="text-lg text-start font-semibold">Autores</p>
              <ul className="gap-4 grid grid-cols-1  list-disc list-inside">
                {authors.map((author, index) => {
                  const { fullName, degree } = author

                  // Format degree titles if they exist
                  const degreeTitles = degree
                    ? degree.map((d) => (typeof d === 'string' ? d : d.title)).join(', ')
                    : ''

                  // Combine author details
                  const authorDetails = `${fullName}${degreeTitles ? ` - ${degreeTitles}` : ''}`

                  return <li key={index}>{authorDetails}</li>
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="container lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={post.content}
            enableGutter={false}
          />
        </div>

        <RelatedPosts
          className="mt-12"
          docs={post.relatedPosts.filter((post) => typeof post === 'object')}
        />
      </div>

      <div className="fixed bottom-4 right-4 flex-wrap space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Video className="h-4 w-4 mr-2" />
              Ver video
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Video del Repositorio</DialogTitle>
              <DialogDescription>
                Este video, es una muestra del trabajo realizado.
              </DialogDescription>
            </DialogHeader>
            <video autoPlay loop playsInline>
              <source src={`${video!.url}`} />
            </video>
          </DialogContent>
        </Dialog>
        <Link target="_blank" href={`${article!.url}`}>
          <Button>
            <File className="h-4 w-4 mr-2" />
            Ver Artículo
          </Button>
        </Link>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
