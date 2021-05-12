import { FC, HTMLAttributes } from "react";
import Button from "@material-ui/core/Button";
import { ControllerTextInput } from "../../components/ControllerFormInputs";
import { useLoginForm } from "./hooks/useLoginForm";

interface Props extends HTMLAttributes<HTMLFormElement> {}

export const LoginForm: FC<Props> = (props) => {
  const { onSubmit, control } = useLoginForm();

  return (
    <form onSubmit={onSubmit} {...props}>
      <ControllerTextInput
        inputProps={{ variant: "filled" }}
        label="Email"
        control={control}
        name="email"
      />
      <ControllerTextInput
        inputProps={{ variant: "filled" }}
        label="Password"
        control={control}
        name="password"
      />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
  );
};
