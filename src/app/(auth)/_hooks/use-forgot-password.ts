import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { errorToast } from "@/lib/error-toast";
import { identifierSchema } from "@/shared/schemas/identifier.schema";

import { authServices } from "../_services/auth.service";

const useForgotPassword = () => {
  const form = useForm<z.infer<typeof identifierSchema>>({
    resolver: zodResolver(identifierSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const forgotPasswordFn = async (
    payload: z.infer<typeof identifierSchema>
  ) => {
    const result = await authServices.requestOtp(
      payload.identifier,
      "forgot-password"
    );
    return result;
  };

  const { mutate: forgotPasswordMutate, isPending: isPendingForgotPassword } =
    useMutation({
      mutationFn: forgotPasswordFn,
      onSuccess: (response) => {
        const { data } = response;
        toast.success(capitalizeFirstLetter(data.status), {
          description: data.message,
        });

        form.reset();
      },
      onError: (error) => {
        errorToast(error);
      },
    });

  const onSubmitForgotPassword = (values: z.infer<typeof identifierSchema>) => {
    forgotPasswordMutate(values);
  };

  return {
    form,
    onSubmitForgotPassword,
    isPendingForgotPassword,
  };
};

export default useForgotPassword;
