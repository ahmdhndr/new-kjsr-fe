"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete, MdInfo } from "react-icons/md";

import DataTable from "@/components/datatable";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/context/modal-context";
import { blurDataURL } from "@/lib/blur-data-image-url";
import { isEmpty } from "@/lib/is-empty";

import useCategory from "../_hooks/use-category";
import DeleteCategoryModal from "./delete-category-modal";
import SaveCategoryModal from "./save-category-modal";

export type TCategory = {
  id: string;
  iconUrl: string;
  name: string;
  description: string;
  iconPath: string;
};

export default function CategoryTable({ token }: { token: string }) {
  const { open } = useModal();
  const [dataCategory, setDataCategory] = useState<TCategory | null>(null);
  const [btnAction, setBtnAction] = useState<"add" | "edit">("add");

  const {
    categoryData,
    currentPage,
    currentLimit,
    currentSearch,
    isLoadingCategory,
    isRefetchingCategory,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    setURL,
  } = useCategory();

  const columns: ColumnDef<TCategory>[] = [
    {
      accessorKey: "icon",
      header: "Icon",
      cell: ({ row }) => {
        const category = row.original;

        let url = "";
        if (
          !isEmpty(category.iconUrl) &&
          category.iconUrl.startsWith("https")
        ) {
          url = category.iconUrl;
        } else {
          url = "/logo-bg-transparan.png";
        }

        return (
          <div className="relative h-10 w-10">
            <Image
              fill
              src={url}
              alt={category.name}
              className="object-contain"
              sizes="40px"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <BiDotsVerticalRounded className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  setDataCategory(category);
                  open("edit-category");
                  setBtnAction("edit");
                }}
              >
                <MdInfo className="text-primary h-4 w-4" /> Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-kjsr hover:bg-red-kjsr focus:bg-red-kjsr hover:text-white-kjsr focus:text-white-kjsr cursor-pointer"
                onClick={() => {
                  setDataCategory(category);
                  open("delete-category");
                }}
              >
                <MdDelete className="h-4 w-4 text-inherit" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    if (!currentPage || !currentLimit) {
      setURL();
    }
  }, [currentPage, currentLimit, setURL]);

  return (
    <>
      <DataTable
        loading={isLoadingCategory || isRefetchingCategory}
        columns={columns}
        data={categoryData?.list as TCategory[]}
        totalPages={categoryData?.meta.totalPages as number}
        currentPage={Number(currentPage)}
        onChangePage={handleChangePage}
        valueLimit={currentLimit || "4"}
        onChangeLimit={handleChangeLimit}
        valueInput={currentSearch || ""}
        onChangeSearch={handleChangeSearch}
        buttonTopContent={
          <div className="flex flex-col gap-1 md:flex-row">
            <Button
              size="sm"
              onClick={() => {
                open("add-category");
                setBtnAction("add");
              }}
            >
              Create Category
            </Button>
          </div>
        }
      />

      <SaveCategoryModal token={token} action={btnAction} data={dataCategory} />
      <DeleteCategoryModal token={token} data={dataCategory} />
    </>
  );
}
