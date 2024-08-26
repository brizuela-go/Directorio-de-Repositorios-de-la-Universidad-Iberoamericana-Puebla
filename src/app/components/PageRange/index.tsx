import React from 'react'

const defaultCollectionLabels = {
  posts: {
    plural: 'Repositorios',
    singular: 'Repositorio',
  },
  categories: {
    plural: 'Núcleos Académicos',
    singular: 'Núcleo Académico',
  },
}

export const PageRange: React.FC<{
  className?: string
  collection?: string
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural, singular } =
    collectionLabelsFromProps || defaultCollectionLabels[collection || '']

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Sin resultados...'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `Mostrando ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} de ${totalDocs} ${
          totalDocs > 1 ? plural : singular
        }`}
    </div>
  )
}
