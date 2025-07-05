import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { errorToast } from "@/lib/error-toast";

import { loginSchema } from "../_schemas/login.schema";
import { ILogin } from "../_types/auth";

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Kredensial tidak valid.",
  default: "Terjadi kesalahan saat login.",
};

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibilityPassword = () => setIsVisible(!isVisible);

  const url = searchParams.get("callbackUrl") || "/";
  const callbackUrl = decodeURIComponent(url);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const loginFn = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (!result) {
      throw new Error("Tidak bisa terhubung ke server");
    }
    if (result.error) {
      const message = errorMessages[result.error] || errorMessages.default;
      throw new Error(message);
    }
  };

  const { mutate: loginMutate, isPending: isPendingLogin } = useMutation({
    mutationFn: loginFn,
    onError: (error) => {
      errorToast(error);
    },
    onSuccess: () => {
      router.push(callbackUrl);
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => loginMutate(values);

  return {
    isVisible,
    toggleVisibilityPassword,
    form,
    onSubmit,
    isPendingLogin,
  };
};

export default useLogin;
