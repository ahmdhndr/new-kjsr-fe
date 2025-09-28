"use client";

import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal-context";

import useDeleteCategory from "../_hooks/use-delete-category";
import { TCategory } from "./article-table";

interface DeleteCategoryModalProps {
  token: string;
  data: TCategory | null;
}

export default function DeleteCategoryModal({
  token,
  data,
}: DeleteCategoryModalProps) {
  const { close } = useModal();
  const { mutateDeleteCategory, isPendingDeleteCategory } =
    useDeleteCategory(token);
  const [selected, setSelected] = useState<TCategory | null>(null);

  useEffect(() => {
    if (data) {
      setSelected(data);
    }
  }, [data]);

  const handleDelete = (id: string | undefined) => {
    if (!id) {
      toast.error("No category selected to be deleted");
      return;
    }

    mutateDeleteCategory(id);
  };

  return (
    <ResponsiveDialog
      modalKey="delete-category"
      title="Delete Category"
      className="max-w-sm"
    >
      <div className="p-4">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete <strong>{selected?.name}</strong>?
          This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="ml-2"
            onClick={() => handleDelete(selected?.id)}
            disabled={isPendingDeleteCategory}
          >
            {isPendingDeleteCategory ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
}
