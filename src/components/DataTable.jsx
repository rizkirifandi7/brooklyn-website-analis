/* eslint-disable react/prop-types */
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export function DataTableDemo({ data }) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    {
      accessorKey: "borough",
      header: "Borough",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("borough")}</div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
    },
    {
      accessorKey: "street_name",
      header: "Street Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("street_name")}</div>
      ),
    },
    {
      accessorKey: "cross_street",
      header: "Cross Street",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("cross_street")}</div>
      ),
    },
    {
      accessorKey: "latitude",
      header: "Latitude",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("latitude")}</div>
      ),
    },
    {
      accessorKey: "longitude",
      header: "Longitude",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("longitude")}</div>
      ),
    },
    {
      accessorKey: "contributing_factor",
      header: "Contributing Factor",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("contributing_factor")}</div>
      ),
    },

    {
      accessorKey: "cyclists_injured",
      header: "Cyclists Injured",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("cyclists_injured")}</div>
      ),
    },
    {
      accessorKey: "cyclists_killed",
      header: "Cyclists Killed",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("cyclists_killed")}</div>
      ),
    },
    {
      accessorKey: "motorists_injured",
      header: "Motorists Injured",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("motorists_injured")}</div>
      ),
    },
    {
      accessorKey: "motorists_killed",
      header: "Motorists Killed",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("motorists_killed")}</div>
      ),
    },
    {
      accessorKey: "pedestrians_injured",
      header: "Pedestrians Injured",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("pedestrians_injured")}</div>
      ),
    },
    {
      accessorKey: "pedestrians_killed",
      header: "Pedestrians Killed",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("pedestrians_killed")}</div>
      ),
    },
    {
      accessorKey: "persons_injured",
      header: "Persons Injured",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("persons_injured")}</div>
      ),
    },
    {
      accessorKey: "persons_killed",
      header: "Persons Killed",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("persons_killed")}</div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full h-full">
      <div className="rounded-md border m-2">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}