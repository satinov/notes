import { FC, HTMLAttributes } from "react";
import { useRegistrationForm } from "./hooks/useRegistrationForm";
import { ControllerTextInput } from "../../components/ControllerFormInputs";
import Button from "@material-ui/core/Button";

interface Props extends HTMLAttributes<HTMLFormElement> {}

export const RegisterForm: FC<Props> = (props) => {
  const { onSubmit, control } = useRegistrationForm();

  return (
    <form onSubmit={onSubmit} {...props}>
      <ControllerTextInput
        inputProps={{ variant: "filled" }}
        label="First Name"
        control={control}
        name="firstName"
      />
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
      <ControllerTextInput
        inputProps={{ variant: "filled" }}
        label="Confirm Password"
        control={control}
        name="passwordConfirmation"
      />
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
    </form>
  );
};
