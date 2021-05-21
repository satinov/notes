import { FC, HTMLAttributes, useState } from "react";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import { ControllerTextInput } from "../../../components/ControllerFormInputs";
import { add } from "../noteDetailsSlice";
import { noteDefaultValues, noteValidationScheme } from "../form";
import { useHistory } from "react-router";
import "draft-js/dist/Draft.css";
import classes from "*.module.css";
interface Props extends HTMLAttributes<HTMLFormElement> {
  isLoading: boolean;
}

export const NoteAddForm: FC<Props> = ({ isLoading, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(noteValidationScheme),
    defaultValues: noteDefaultValues,
  });

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      await dispatch(add(formValues));
      history.push("/my-notes");
    } catch (error) {
      debugger;
    }
  });

  return (
    <form onSubmit={onSubmit} {...props}>
      {/* {loginError && (
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            dispatch(clearAuthError("login"));
          }}
        >
          {loginError}
        </Alert>
      )} */}
      <ControllerTextInput
        inputProps={{ variant: "filled" }}
        label="Название"
        control={control}
        name="title"
      />
      <Controller
        control={control}
        name="text"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div style={{ marginBottom: 16 }}>
            <ReactQuill value={value} onChange={onChange} />
            {error ? (
              <FormHelperText error={true}>{error.message}</FormHelperText>
            ) : null}
          </div>
        )}
      />
      {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isLoading}
      >
        Добавить конспект
      </Button>
    </form>
  );
};
