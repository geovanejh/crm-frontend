import type { ColumnDef } from '@tanstack/react-table'
import type { Costumer } from '../../types/costumer.types'

const formatCpf = (value: string) =>
  value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

const formatCnpj = (value: string) =>
  value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')

export const columns: ColumnDef<Costumer>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => {
      const costumer = row.original
      return costumer.type === 'PJ' ? costumer.nomeFantasia : costumer.name
    },
  },
  {
    accessorKey: 'document',
    header: 'Documento',
    cell: ({ row }) => {
      const costumer = row.original
      const raw = costumer.document.replace(/\D/g, '')
      return costumer.type === 'PJ' ? formatCnpj(raw) : formatCpf(raw)
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
  },
  {
    accessorKey: 'plan',
    header: 'Plano',
  },
]
