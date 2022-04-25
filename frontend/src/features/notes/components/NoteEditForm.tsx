import { FC, HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill"; // ES6
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { ControllerTextInput } from "../../../components/ControllerFormInputs";
import { add, update } from "../noteDetailsSlice";
import { noteDefaultValues, NoteFormData, noteValidationScheme } from "../form";
import { Note } from "../types";
import { useHistory } from "react-router";
import { useNoteDetails } from "../hooks/useNoteDetails";

interface Props extends HTMLAttributes<HTMLFormElement> {
  note: Note;
}

const getValues = (note: Note): NoteFormData => ({
  text: note.text,
  title: note.title,
});
export const NoteEditForm: FC<Props> = ({ note, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isUpdateLoading, updateError } = useNoteDetails();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(noteValidationScheme),
    defaultValues: getValues(note),
  });

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      await dispatch(update(note.id, formValues));
      history.goBack();
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
              <FormHelperText error={true}>
                {(error as any).message}
              </FormHelperText>
            ) : null}
          </div>
        )}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isUpdateLoading}
      >
        Редактировать конспект
      </Button>
    </form>
  );
};
