import Link from 'next/link'
import React from 'react'

import { Button } from '../components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 className="animate-pulse" style={{ marginBottom: 0 }}>
          404
        </h1>
        <p className="mb-4">La página que estás buscando ha sido removida o no existe.</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">Ir a Inicio</Link>
      </Button>
    </div>
  )
}
