import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Degree, Post, Professor } from '../../../../payload-types'

import PageClient from './page.client'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { CategoryHero } from '@/heros/CategoryHero'
import DegreeAccordion from '@/components/DegreeAccordion'
import ProfessorCarousel from '@/components/ProfessorCarousel'
import { CollectionArchive } from '@/components/CollectionArchive'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return categories.docs?.map(({ slug }) => slug)
}

export default async function Post({ params: { slug = '' } }) {
  const url = '/categories/' + slug
  const category = await queryCategoryBySlug({ slug })
  const { degrees, professors, repositories } = category

  if (!category) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <CategoryHero category={category} />

      <div className="relative flex flex-col items-center gap-20 p-8 lg:p-36 ">
        <div className="container max-w-7xl mx-auto text-center">
          <p className="text-primary tracking-tight text-2xl md:text-4xl lg:text-5xl  my-8">
            Carreras
          </p>
          <p className="text-lg lg:text-xl  max-w-3xl mx-auto">
            Estas son las carreras del núcleo académico
          </p>
        </div>
        <div className="container max-w-7xl mx-auto">
          <DegreeAccordion degrees={degrees as Degree[]} />
        </div>

        <div className="container max-w-7xl mx-auto text-center mt-10">
          <p className="text-primary tracking-tight text-2xl md:text-4xl lg:text-5xl  my-8">
            Coordinadores y Profesores
          </p>
          <p className="text-lg lg:text-xl  max-w-3xl mx-auto">
            Contando con los siguientes coordinadores y profesores
          </p>
        </div>
        <div className="container max-w-7xl mx-auto">
          <ProfessorCarousel professors={professors as unknown as Professor[]} />
        </div>

        <div className="container max-w-7xl mx-auto text-center mt-10">
          <p className="text-primary tracking-tight text-2xl md:text-4xl lg:text-5xl  my-8">
            Repositorios
          </p>
          <p className="text-lg lg:text-xl  max-w-3xl mx-auto">Lista de repositorios publicados</p>
        </div>
        <div className="container max-w-7xl mx-auto">
          <CollectionArchive posts={repositories} relationTo="posts" />
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const post = await queryCategoryBySlug({ slug })

  return {
    title: post?.title,
    description: post?.descripcion,
    openGraph: mergeOpenGraph({
      description: post?.descripcion,
      images: post?.image.toString()
        ? [
            {
              url: post?.image.toString() as any,
            },
          ]
        : undefined,
      title: post?.title,
      url: Array.isArray(post?.slug) ? post?.slug.join('/') : '/',
    }),
  }
}

const queryCategoryBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
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
