"use client";

import Link from "next/link";
import { useEffect } from "react";

import { ArrowRight, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useRegister from "../_hooks/use-register";

export function RegisterForm({
  email,
  token,
}: {
  email?: string;
  token: string;
}) {
  const {
    visiblePassword,
    handleVisiblePassword,
    form,
    isPendingRegister,
    onSubmit,
  } = useRegister(token);

  useEffect(() => {
    if (email) {
      form.setValue("email", email);
    }
  }, [email, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-3"}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Nama Pertama</FormLabel>
              <FormControl>
                <Input autoFocus type="text" placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Nama Terakhir</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@kjsr.com"
                  {...field}
                  disabled={!!email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="johndoe" {...field} />
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
              <FormLabel className="text-primary">Password</FormLabel>
              <FormControl>
                <Input
                  type={visiblePassword.password ? "text" : "password"}
                  placeholder="Password"
                  endContent={
                    <button
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? <EyeOffIcon /> : <EyeIcon />}
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
          className="w-full"
          disabled={isPendingRegister}
        >
          {isPendingRegister ? <Loader2 className="animate-spin" /> : "Daftar"}
        </Button>
      </form>
      <p className="text-muted-foreground mt-1">
        Sudah memiliki akun?&nbsp;
        <Button variant={"link"} className="p-0">
          <Link
            href={"/login"}
            className="text-primary flex justify-center gap-1"
          >
            Masuk <ArrowRight />
          </Link>
        </Button>
      </p>
    </Form>
  );
}
