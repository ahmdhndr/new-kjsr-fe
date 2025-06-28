import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { errorToast } from "@/lib/error-toast";
import { refinePasswordWithConfirmationSchema } from "@/shared/schemas/password.schema";

import { authServices } from "../_services/auth.service";

const useResetPassword = (token: string) => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const form = useForm<z.infer<typeof refinePasswordWithConfirmationSchema>>({
    resolver: zodResolver(refinePasswordWithConfirmationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordFn = async (
    payload: z.infer<typeof refinePasswordWithConfirmationSchema>
  ) => {
    const result = await authServices.resetPassword({
      token,
      ...payload,
    });
    return result;
  };

  const { mutate: resetPasswordMutate, isPending: isPendingResetPassword } =
    useMutation({
      mutationFn: resetPasswordFn,
      onSuccess: (response) => {
        const { data } = response;
        toast.success(capitalizeFirstLetter(data.status), {
          description: data.message,
        });

        form.reset();
        router.push("/login");
      },
      onError: (error) => {
        errorToast(error);
      },
    });

  const onSubmitResetPassword = (
    values: z.infer<typeof refinePasswordWithConfirmationSchema>
  ) => {
    resetPasswordMutate(values);
  };

  return {
    form,
    onSubmitResetPassword,
    isPendingResetPassword,
    visiblePassword,
    handleVisiblePassword,
  };
};

export default useResetPassword;
