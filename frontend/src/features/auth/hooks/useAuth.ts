import { useSelector } from "react-redux";
import { authSelector } from "../authSlice";

export const useAuth = () => {
  const {
    isAuth,
    currentUser,
    error: { login: loginError, register: registerError },
    isLoading: {
      initLogin: isInitLoginLoading,
      login: isLoginLoading,
      register: isRegisterLoading,
    },
  } = useSelector(authSelector);
  return {
    loginError,
    registerError,
    isInitLoginLoading,
    isLoginLoading,
    isRegisterLoading,
    isAuth,
    currentUser,
  };
};
