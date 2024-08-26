import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const Professors: CollectionConfig = {
  slug: 'professors',
  labels: {
    plural: 'Profesores',
    singular: 'Profesor',
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
      label: 'Número de cuenta',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Correo',
      required: true,
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Nombre completo',
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
      label: 'Foto',
      relationTo: 'media',
    },
  ],
}

export default Professors
