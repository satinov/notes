import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

interface IFormInputProps<
  TFieldValues extends FieldValues,
  TInputProps extends {}
> extends PartialBy<ControllerProps<TFieldValues>, "render"> {
  inputProps?: TInputProps;
  label?: string;
}

export const ControllerTextInput = <
  TFieldValues extends FieldValues = FieldValues
>({
  inputProps = {},
  label = "",
  ...props
}: IFormInputProps<TFieldValues, TextFieldProps>) => {
  return (
    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...inputProps}
          label={label}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
      {...props}
    />
  );
};
