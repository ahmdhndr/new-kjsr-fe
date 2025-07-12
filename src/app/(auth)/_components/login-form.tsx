"use client";

import Link from "next/link";

import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useLogin from "../_hooks/use-login";

export function LoginForm() {
  const {
    isVisible,
    toggleVisibilityPassword,
    form,
    isPendingLogin,
    onSubmit,
  } = useLogin();

  return (
    <Card className="border-primary w-full max-w-sm shadow-xl">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Username atau Email
                  </FormLabel>
                  <FormControl>
                    <Input autoFocus type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary flex items-center justify-between">
                    Password
                    <span>
                      <Button
                        asChild
                        variant={"link"}
                        className="h-auto p-0 underline"
                      >
                        <Link href={"/forgot-password"}>Lupa password?</Link>
                      </Button>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="Password"
                      endContent={
                        <button
                          type="button"
                          onClick={() => toggleVisibilityPassword()}
                        >
                          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      }
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
              className="w-full"
              disabled={isPendingLogin}
            >
              {isPendingLogin ? <Loader2 className="animate-spin" /> : "Masuk"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <p className="text-muted-foreground text-center">
        <Button variant={"link"} className="p-0">
          <Link
            href={"/pre-register"}
            className="text-primary flex justify-center gap-1"
          >
            Pengajuan akun baru
          </Link>
        </Button>
      </p>
    </Card>
  );
}
