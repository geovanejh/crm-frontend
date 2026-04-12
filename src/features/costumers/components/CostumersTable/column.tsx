'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { CostumerFormData } from '../../schemas/costumer.schema'

export const columns: ColumnDef<CostumerFormData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'document',
    header: 'Document',
    cell: ({ row }) => {
      const document = row.getValue('document') as string
      return <>{document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</>
    },
  },
]
