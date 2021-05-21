import { FC, HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router";

import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

import { ControllerTextInput } from "../../../components/ControllerFormInputs";
import { clearAuthError, login } from "../authSlice";
import {
  loginDefaultValues,
  loginValidationScheme,
  LoginFormData,
} from "../form";
import { useAuth } from "../hooks/useAuth";

interface Props extends HTMLAttributes<HTMLFormElement> {}

export const LoginForm: FC<Props> = (props) => {
  const history = useHistory();
  const { loginError, isLoginLoading } = useAuth();

  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(loginValidationScheme),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = handleSubmit(async (formValues: LoginFormData) => {
    try {
      await dispatch(login(formValues));
      history.push("/my-notes");
    } catch (error) {
      debugger;
    }
  });

  return (
    <form onSubmit={onSubmit} {...props}>
      {loginError && (
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            dispatch(clearAuthError("login"));
          }}
        >
          {loginError}
        </Alert>
      )}
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
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isLoginLoading}
      >
        Войти
      </Button>
    </form>
  );
};
