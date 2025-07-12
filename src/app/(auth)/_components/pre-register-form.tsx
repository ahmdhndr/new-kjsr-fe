"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import usePreRegister from "../_hooks/use-pre-register";

export function PreRegisterForm() {
  const { form, isPendingPreRegister, onSubmit } = usePreRegister();

  return (
    <Card className="border-primary w-full max-w-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-primary text-lg">
          Pengajuan Akun KJSR
        </CardTitle>
        <CardDescription>
          Untuk bisa mendaftar akun KJSR, kamu perlu mengajukan email terlebih
          dahulu. Setelah disetujui admin, kamu akan mendapatkan link
          pendaftaran lewat email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Email</FormLabel>
                  <FormControl>
                    <Input autoFocus type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"default"}
              className="w-full"
              disabled={isPendingPreRegister}
            >
              {isPendingPreRegister ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Kirim pengajuan"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
