import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { errorToast } from "@/lib/error-toast";

import { verifyUserSchema } from "../_schemas/verify-user.schema";
import { authServices } from "../_services/auth.service";

const useVerifyUser = (email: string) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof verifyUserSchema>>({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const verifyUserFn = async (payload: z.infer<typeof verifyUserSchema>) => {
    const result = await authServices.verifyUser(payload);
    return result;
  };

  const { mutate: verifyUserMutate, isPending: isPendingVerifyUser } =
    useMutation({
      mutationFn: verifyUserFn,
      onSuccess: () => {
        router.push("/register/success");
      },
      onError: (error) => {
        errorToast(error);
      },
    });

  const onSubmit = (values: z.infer<typeof verifyUserSchema>) => {
    verifyUserMutate(values);
  };

  return {
    form,
    onSubmit,
    isPendingVerifyUser,
    // setOtp: (otp: string) => {
    //   form.setValue("otp", otp);
    //   const emailVal = form.getValues("email");
    //   if (otp.length === 6 && emailVal) onSubmit({ email: emailVal, otp });
    // },
  };
};

export default useVerifyUser;
