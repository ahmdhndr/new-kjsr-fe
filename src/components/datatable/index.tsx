"use client";

import React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CiSearch } from "react-icons/ci";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { LIMIT_DEFAULT, LIMIT_LISTS } from "./datatable-constants";
import { DataTableViewOptions } from "./datatable-view-options";
import { getVisiblePages } from "./get-visible-pages";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  buttonTopContent?: React.ReactNode;
  totalPages: number;
  loading?: boolean;
  currentPage: number;
  onChangePage: (page: number) => void;
  valueLimit: string;
  onChangeLimit: (e: string) => void;
  valueInput: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  buttonTopContent,
  totalPages,
  loading = false,
  currentPage,
  onChangePage,
  valueLimit,
  onChangeLimit,
  valueInput,
  onChangeSearch,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex: 0,
        pageSize: parseInt(valueLimit),
      },
    },
  });

  const topContent = (
    <section className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
      <div className="order-2 md:order-1">
        <Input
          type="text"
          placeholder="Search..."
          startContent={<CiSearch />}
          className="max-w-sm"
          value={valueInput}
          onChange={onChangeSearch}
        />
      </div>
      <div className="order-1 flex items-center gap-1 md:order-2">
        {buttonTopContent && buttonTopContent}
        <DataTableViewOptions table={table} />
      </div>
    </section>
  );

  return (
    <div className="space-y-4">
      {topContent}

      {/* TABLE */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-primary text-white-kjsr"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(LIMIT_DEFAULT)].map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {columns.map((_col, idx) => (
                    <TableCell key={idx}>
                      <Skeleton className="min-h-10 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
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
                <TableCell colSpan={columns.length} className="text-center">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center md:justify-between">
        <div className="hidden md:block">
          <div className="bg-white-kjsr flex items-center space-x-2 rounded-md border p-1">
            <p className="text-sm font-normal">Show:</p>
            <Select value={valueLimit} onValueChange={onChangeLimit}>
              <SelectTrigger className="h-8 w-[40px] border-none bg-transparent p-0 font-normal focus:ring-0 focus:ring-offset-0">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {LIMIT_LISTS.map((pageSize) => (
                  <SelectItem key={pageSize.value} value={`${pageSize.value}`}>
                    {pageSize.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="self-center justify-self-center text-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="bg-gray-100"
              size="sm"
              onClick={() => onChangePage(currentPage - 1)}
              disabled={Number(currentPage) === 1}
            >
              <MdOutlineKeyboardArrowLeft />
            </Button>

            {getVisiblePages(currentPage, totalPages).map((page, i) =>
              typeof page === "string" ? (
                <Button
                  disabled
                  variant="outline"
                  key={`ellipsis-${i}`}
                  className="bg-gray-100 p-4"
                >
                  {page}
                </Button>
              ) : (
                <Button
                  key={`page-${page}`}
                  variant={currentPage === page ? "default" : "outline"}
                  className={cn(
                    "p-4",
                    currentPage === page
                      ? "bg-primary text-white"
                      : "bg-gray-100"
                  )}
                  size="sm"
                  onClick={() => onChangePage(page)}
                >
                  {page}
                </Button>
              )
            )}

            <Button
              variant="outline"
              className="bg-gray-100"
              size="sm"
              onClick={() => onChangePage(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <MdOutlineKeyboardArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
