"use client";

import { useEffect } from "react";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PreapprovalStatus } from "@/shared/constants/global.constant";

import useUpdateApprovalStatus from "../_hooks/use-update-approval-status";
import { Preapproval } from "../_interfaces/preapproval.interface";

type PreapprovalModalProps = {
  token: string;
  // action: "action-preapproval";
  data: Preapproval | null;
};

export default function PreapprovalModal({
  token,
  // action,
  data,
}: PreapprovalModalProps) {
  const { form, onSubmit, isPendingUpdateApprovalStatus } =
    useUpdateApprovalStatus(token);

  useEffect(() => {
    if (data) {
      form.setValue("email", data.email);
    }
  }, [form, data]);

  return (
    <ResponsiveDialog
      modalKey="action-preapproval"
      title={`Approval email ${data?.email}`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value={PreapprovalStatus.APPROVED}>
                      Approve
                    </SelectItem>
                    <SelectItem value={PreapprovalStatus.REJECTED}>
                      Reject
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keterangan</FormLabel>
                <FormControl>
                  <Textarea onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isPendingUpdateApprovalStatus}
          >
            Submit
          </Button>
        </form>
      </Form>
    </ResponsiveDialog>
  );
}
