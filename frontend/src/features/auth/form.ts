import * as yup from "yup";

// Registration
export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const registerValidationScheme = yup.object().shape({
  name: yup.string().required("Firstname is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is requred"),
  passwordConfirmation: yup.string().test({
    name: "password-confirmation",
    message: "Passwords need to match",
    test: function () {
      const { password, passwordConfirmation } = this.parent;
      if (password && passwordConfirmation !== password) {
        return false;
      }
      return true;
    },
  }),
});

export const registerDefaultValues: RegistrationFormData = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

// Login
export interface LoginFormData {
  email: string;
  password: string;
}

export const loginValidationScheme = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is requred"),
});

export const loginDefaultValues: LoginFormData = {
  email: "",
  password: "",
};
