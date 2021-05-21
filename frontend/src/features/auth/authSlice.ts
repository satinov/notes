import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ApiService from "../../services/apiService";
import { AppThunk } from "../../store";
import { RootState } from "../../store/rootReducer";
import authApi from "./authApiService";
import { LoginFormData, RegistrationFormData } from "./form";
import { CurrentUser } from "./types";
import { clearToken, setToken } from "./utils";

export interface AuthState {
  isAuth: boolean;
  currentUser: CurrentUser;
  isLoading: {
    login: boolean;
    register: boolean;
    initLogin: boolean;
  };
  error: {
    login: null | string;
    register: null | string;
  };
}

export const initialState: AuthState = {
  isAuth: false,
  isLoading: {
    login: false,
    register: false,
    initLogin: false,
  },
  error: {
    login: null,
    register: null,
  },
  currentUser: {
    email: "i.am.satinov@gmail.com",
    id: "60a473949d4a3b2b78ba2d77",
    name: "Akzhol",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (
      state,
      { payload }: PayloadAction<keyof AuthState["isLoading"]>
    ) => {
      state.isLoading[payload] = true;
    },
    stopLoading: (
      state,
      { payload }: PayloadAction<keyof AuthState["isLoading"]>
    ) => {
      state.isLoading[payload] = false;
    },
    setAuthSuccess: (state, { payload }: PayloadAction<CurrentUser>) => {
      state.currentUser = payload;
      state.isAuth = true;
      state.error = {
        login: null,
        register: null,
      };
      state.isLoading = {
        login: false,
        register: false,
        initLogin: false,
      };
    },
    setLogOut: (state) => {
      state.isAuth = false;
      state.currentUser = { email: "", id: "", name: "" };
      state.error = {
        login: null,
        register: null,
      };
      state.isLoading = {
        login: false,
        register: false,
        initLogin: false,
      };
    },
    setAuthFailed: (
      state,
      {
        payload,
      }: PayloadAction<{ type: keyof AuthState["error"]; data: string }>
    ) => {
      const { data, type } = payload;
      state.error[type] = data;
      state.isAuth = false;
    },
    clearAuthError(
      state,
      { payload }: PayloadAction<keyof AuthState["error"]>
    ) {
      state.error[payload] = null;
    },
  },
});

export const {
  setAuthSuccess,
  setLogOut,
  startLoading,
  stopLoading,
  setAuthFailed,
  clearAuthError,
} = authSlice.actions;

export const login =
  (formData: LoginFormData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(startLoading("login"));
      const { user, token } = await authApi.login(formData);
      setToken(token);
      ApiService.updateToken();
      dispatch(setAuthSuccess(user));
    } catch (error) {
      dispatch(setAuthFailed({ type: "login", data: error.message }));
    } finally {
      dispatch(stopLoading("login"));
    }
  };

export const loginByToken = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading("initLogin"));
    const user = await authApi.loginByToken();
    dispatch(setAuthSuccess(user));
  } catch (error) {
    throw error;
  } finally {
    dispatch(stopLoading("initLogin"));
  }
};

export const register =
  (formData: RegistrationFormData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(startLoading("register"));
      const { user, token } = await authApi.register(formData);
      setToken(token);
      ApiService.updateToken();
      dispatch(setAuthSuccess(user));
    } catch (error) {
      dispatch(setAuthFailed({ type: "register", data: error.message }));
      throw error;
    } finally {
      dispatch(stopLoading("register"));
    }
  };

export const logOut = (): AppThunk => async (dispatch) => {
  dispatch(setLogOut());
  clearToken();
};

export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
