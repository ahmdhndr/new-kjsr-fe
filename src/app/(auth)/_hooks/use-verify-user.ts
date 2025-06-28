import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
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

  const resendOTPFn = async (payload: { email: string }) => {
    const result = await authServices.requestOtp(payload.email, "resend-otp");
    return result;
  };

  const { mutate: resendOTPMutate, isPending: isPendingResendOTP } =
    useMutation({
      mutationFn: resendOTPFn,
      onSuccess: (response) => {
        const { data } = response;
        toast.success(capitalizeFirstLetter(data.status), {
          description: data.message,
        });
      },
      onError: (error) => {
        errorToast(error);
      },
    });

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
    resendOTPMutate,
    isPendingResendOTP,
  };
};

export default useVerifyUser;
