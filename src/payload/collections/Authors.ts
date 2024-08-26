import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const Authors: CollectionConfig = {
  slug: 'authors',
  labels: {
    plural: 'Autores',
    singular: 'Autor',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'fullName',
  },
  fields: [
    {
      name: 'accountNumber',
      type: 'number',
      required: true,
      label: 'Número de cuenta',
      unique: true,
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Nombre completo',
    },
    {
      name: 'degree',
      type: 'relationship',
      hasMany: true,
      label: 'Carrera',
      relationTo: 'degrees',
    },
  ],
}

export default Authors
