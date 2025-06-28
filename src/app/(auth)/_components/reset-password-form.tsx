"use client";

import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

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

import useResetPassword from "../_hooks/use-reset-password";

export default function ResetPasswordForm({ token }: { token: string }) {
  const {
    form,
    visiblePassword,
    isPendingResetPassword,
    onSubmitResetPassword,
    handleVisiblePassword,
  } = useResetPassword(token);

  return (
    <Card className="border-primary w-full max-w-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-primary text-2xl">Kata sandi baru</CardTitle>
        <CardDescription>
          Silakan buat kata sandi yang mudah untuk diingat namun sulit untuk
          ditembus
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitResetPassword)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      type={visiblePassword.password ? "text" : "password"}
                      placeholder="Password"
                      endContent={
                        <button
                          type="button"
                          onClick={() => handleVisiblePassword("password")}
                        >
                          {visiblePassword.password ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeIcon />
                          )}
                        </button>
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Konfirmasi Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={visiblePassword.password ? "text" : "password"}
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"default"}
              className="w-full cursor-pointer"
              disabled={isPendingResetPassword}
            >
              {isPendingResetPassword ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Ubah Kata Sandi"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
