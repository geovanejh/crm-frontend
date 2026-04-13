import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { columns } from './column'
import type { CostumerFormData } from '../../schemas/costumer.schema'

export const CostumersTable = () => {
  const data: CostumerFormData[] = [
    {
      name: 'Costumer 1',
      document: '12345678900',
      birthDate: '1990-01-01',
      email: 'costumer1@email.com',
      phone: '11999999999',
    },
    {
      name: 'Costumer 2',
      document: '12345678900',
      birthDate: '1985-05-15',
      email: 'costumer2@email.com',
      phone: '11988888888',
    },
    {
      name: 'Costumer 3',
      document: '12345678900',
      birthDate: '1992-12-20',
      email: 'costumer3@email.com',
      phone: '11977777777',
    },
  ]

  // TanStack Table exposes non-memoizable functions and is intentionally excluded from React Compiler memoization.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
