"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useModal } from "@/context/modal-context";
import { errorToast } from "@/lib/error-toast";

import {
  UpdateApprovalStatusDTO,
  updateApprovalStatusSchema,
} from "../_dto/preapproval.dto";
import { preapprovalServices } from "../_services/preapproval.service";
import useListPreapproval from "./use-list-approval";

const useUpdateApprovalStatus = (token: string) => {
  const { refetchPreapproval } = useListPreapproval(token);
  const queryClient = useQueryClient();
  const { close } = useModal();
  const form = useForm<z.infer<typeof updateApprovalStatusSchema>>({
    resolver: zodResolver(updateApprovalStatusSchema),
    defaultValues: {
      email: "",
      status: undefined,
      reason: "",
    },
  });

  const updateApprovalStatusFn = async (payload: UpdateApprovalStatusDTO) => {
    const result = await preapprovalServices.updateApproval(token, payload);

    return result.data;
  };

  const {
    mutate: mutateUpdateApprovalStatus,
    isPending: isPendingUpdateApprovalStatus,
  } = useMutation({
    mutationFn: updateApprovalStatusFn,
    onError: (error) => {
      errorToast(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["preapprovals"] });
      refetchPreapproval();
      toast.success(data.message);
      close();
    },
  });

  const onSubmit = (payload: UpdateApprovalStatusDTO) => {
    mutateUpdateApprovalStatus(payload);
  };

  return {
    form,
    onSubmit,
    isPendingUpdateApprovalStatus,
  };
};

export default useUpdateApprovalStatus;
