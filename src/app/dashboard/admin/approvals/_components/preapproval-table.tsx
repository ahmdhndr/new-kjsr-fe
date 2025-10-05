"use client";

import { useEffect, useState } from "react";

import { ColumnDef } from "@tanstack/react-table";

import DataTable from "@/components/datatable";
import { DataTableColumnHeader } from "@/components/datatable/datatable-column-header";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal-context";

import useListPreapproval from "../_hooks/use-list-approval";
import { Preapproval } from "../_interfaces/preapproval.interface";
import PreapprovalModal from "./preapproval-modal";

export default function PreapprovalTable({ token }: { token: string }) {
  const { open } = useModal();
  const {
    preapprovalData,
    currentPage,
    currentLimit,
    currentSearch,
    isLoadingPreapproval,
    isRefetchingPreapproval,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    setURL,
  } = useListPreapproval(token);

  const [dataPreapproval, setDataPreapproval] = useState<Preapproval | null>(
    null
  );

  const columns: ColumnDef<Preapproval>[] = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row: _row }) => {
        return (
          <div className="w-fit rounded-sm border border-yellow-500 bg-yellow-500/10 p-1 text-yellow-500">
            Pending
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const preapproval = row.original;

        return (
          <Button
            onClick={() => {
              setDataPreapproval(preapproval);
              open("action-preapproval");
            }}
          >
            Detail
          </Button>
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
        loading={isLoadingPreapproval || isRefetchingPreapproval}
        columns={columns}
        data={preapprovalData?.list as Preapproval[]}
        totalPages={preapprovalData?.meta.totalPages as number}
        currentPage={Number(currentPage)}
        onChangePage={handleChangePage}
        valueLimit={currentLimit || "4"}
        onChangeLimit={handleChangeLimit}
        valueInput={currentSearch || ""}
        onChangeSearch={handleChangeSearch}
      />
      <PreapprovalModal token={token} data={dataPreapproval} />
    </>
  );
}
