import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { errorToast } from "@/lib/error-toast";

import { refineRegisterSchema } from "../_schemas/register.schema";
// import { refineRegisterSchema } from "../_schemas/register.schema";
import { authServices } from "../_services/auth.service";
import { IRegister } from "../_types/auth";

const useRegister = () => {
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

  const form = useForm<z.infer<typeof refineRegisterSchema>>({
    resolver: zodResolver(refineRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerFn = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: registerMutate, isPending: isPendingRegister } = useMutation({
    mutationFn: registerFn,
    onError: (error) => {
      errorToast(error);
    },
    onSuccess: (_data, variables) => {
      const encodedEmail = btoa(variables.email);
      router.push(`/register/verify?e=${encodedEmail}`);
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof refineRegisterSchema>) =>
    registerMutate(values);

  return {
    visiblePassword,
    handleVisiblePassword,
    form,
    onSubmit,
    isPendingRegister,
  };
};

export default useRegister;
