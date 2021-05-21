import * as yup from "yup";

// Registration
export type NoteFormData = {
  title: string;
  text: string;
};

export const noteValidationScheme = yup.object().shape({
  title: yup.string().required("Название не должно быть пустым"),
  text: yup.string().required("Текст не должен быть пустым"),
});

export const noteDefaultValues: NoteFormData = {
  title: "",
  text: "",
};
