import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { errorToast } from "@/lib/error-toast";

import { preRegisterSchema } from "../_schemas/pre-register.schema";
import { authServices } from "../_services/auth.service";

const usePreRegister = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof preRegisterSchema>>({
    resolver: zodResolver(preRegisterSchema),
    defaultValues: {
      email: "",
    },
  });

  const loginFn = async (payload: { email: string }) => {
    const result = await authServices.preApprovalRequest(payload);

    return result;
  };

  const { mutate: preRegisterMutate, isPending: isPendingPreRegister } =
    useMutation({
      mutationFn: loginFn,
      onError: (error) => {
        errorToast(error);
      },
      onSuccess: () => {
        router.push("/pre-register/success");
        form.reset();
      },
    });

  const onSubmit = (values: z.infer<typeof preRegisterSchema>) =>
    preRegisterMutate(values);

  return {
    form,
    onSubmit,
    isPendingPreRegister,
  };
};

export default usePreRegister;
