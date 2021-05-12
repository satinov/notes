import { useForm } from "react-hook-form";
import {
  loginDefaultValues,
  loginValidationScheme,
  LoginFormData,
} from "../form";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

export const useLoginForm = () => {
  const { handleSubmit, ...form } = useForm({
    resolver: yupResolver(loginValidationScheme),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = useCallback((formValues: LoginFormData) => {
    console.log(formValues);
  }, []);

  return {
    ...form,
    onSubmit: handleSubmit(onSubmit),
  };
};
