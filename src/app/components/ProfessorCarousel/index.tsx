'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Professor } from 'src/payload-types'
import { Media } from '../Media'
import Link from 'next/link'

type Props = {
  professors: Professor[]
}

export default function ProfessorCarousel({ professors }: Props) {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full flex justify-center items-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-full flex">
        {professors?.map(({ id, description, fullName, image, email }) => (
          <CarouselItem key={id} className="flex-shrink-0 w-full px-4">
            <div className="p-1">
              <Card className="h-[450px] w-full relative flex flex-col justify-between items-center gap-y-4">
                <CardHeader className="flex justify-center pt-4 text-center">
                  {image && (
                    <Media imgClassName="object-cover rounded-full h-48 w-48 " resource={image} />
                  )}
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <CardTitle className="text-lg md:text-xl font-semibold">{fullName}</CardTitle>
                  <CardDescription className="text-sm md:text-lg text-primary mt-2 text-center">
                    {description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="text-center flex justify-center items-center pb-4 text-sm">
                  <Link href={`mailto:${email}`} className="hover:underline">
                    {email}
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
