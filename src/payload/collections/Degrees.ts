import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const Degrees: CollectionConfig = {
  slug: 'degrees',
  labels: {
    plural: 'Carreras',
    singular: 'Carrera',
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
      unique: true,
      label: 'Nombre de la Carrera',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      label: 'Descripción',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default Degrees
