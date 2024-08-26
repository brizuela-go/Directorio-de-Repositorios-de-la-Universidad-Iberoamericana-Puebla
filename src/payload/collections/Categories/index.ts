import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '../../fields/slug'
import { revalidateCategory } from './hooks/revalidateCategory'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    plural: 'Núcleos Académicos',
    singular: 'Núcleo Académico',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nombre del núcleo',
      unique: true,
    },
    {
      name: 'descripcion',
      type: 'text',
      label: 'Descripción',
      required: true,
    },
    {
      name: 'degrees',
      type: 'relationship',
      hasMany: true,
      relationTo: 'degrees',
      label: 'Carreras',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen',
      required: true,
    },
    {
      name: 'repositories',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: 'Repositorios',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de publicación',
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'professors',
      type: 'relationship',
      label: 'Profesores',
      relationTo: 'professors',
      hasMany: true,
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateCategory],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}

export default Categories
