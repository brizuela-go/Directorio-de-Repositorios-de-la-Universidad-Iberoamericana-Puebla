import Image from 'next/image'
import React from 'react'

export const Logo = () => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <Image
      alt="Ibero Puebla logo"
      className="max-w-[9.375rem] invert dark:invert-0"
      src="/Logo.svg"
      width={100}
      height={100}
    />
  )
}
