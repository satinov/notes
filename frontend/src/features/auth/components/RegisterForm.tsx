import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import {
  registerDefaultValues,
  registerValidationScheme,
  RegistrationFormData,
} from "../form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { clearAuthError, register } from "../authSlice";
import Button from "@material-ui/core/Button";
import { ControllerTextInput } from "../../../components/ControllerFormInputs";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router";

interface Props extends HTMLAttributes<HTMLFormElement> {}

export const RegisterForm: FC<Props> = (props) => {
  const { isRegisterLoading, registerError } = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(registerValidationScheme),
    defaultValues: registerDefaultValues,
  });

  const onSubmit = handleSubmit(async (formValues: RegistrationFormData) => {
    try {
      await dispatch(register(formValues));
      history.push("/my-notes");
    } catch (error) {}
  });

  return (
    <form onSubmit={onSubmit} {...props}>
      {registerError && (
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            dispatch(clearAuthError("register"));
          }}
        >
          {registerError}
        </Alert>
      )}
      <ControllerTextInput
        inputProps={{ variant: "filled" }}
        label="Имя"
        control={control}
        name="name"
      />
      <ControllerTextInput
        inputProps={{ variant: "filled" }}
        label="Email"
        control={control}
        name="email"
      />
      <ControllerTextInput
        inputProps={{ variant: "filled", type: "password" }}
        label="Пароль"
        control={control}
        name="password"
      />
      <ControllerTextInput
        inputProps={{ variant: "filled", type: "password" }}
        label="Повторите пароль"
        control={control}
        name="passwordConfirmation"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isRegisterLoading}
      >
        Зарегестрироваться
      </Button>
    </form>
  );
};
