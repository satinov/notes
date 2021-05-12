import { useForm } from "react-hook-form";
import {
  registerDefaultValues,
  registerValidationScheme,
  RegistrationFormData,
} from "../form";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

export const useRegistrationForm = () => {
  const { handleSubmit, ...form } = useForm({
    resolver: yupResolver(registerValidationScheme),
    defaultValues: registerDefaultValues,
  });

  const onSubmit = useCallback((formValues: RegistrationFormData) => {
    console.log(formValues);
  }, []);

  return {
    ...form,
    onSubmit: handleSubmit(onSubmit),
  };
};
