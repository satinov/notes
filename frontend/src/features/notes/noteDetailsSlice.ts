import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { RootState } from "../../store/rootReducer";
import { CRUD, CRUDKeys, CRUDSuccess } from "../../types/CRUD";
import { NoteFormData } from "./form";
import noteApi from "./noteApiService";
import { Note } from "./types";

type NoteDetailsState = {
  error: CRUD<string | null> & {
    copy: string | null;
  };
  isLoading: CRUD<boolean> & {
    copy: boolean;
  };
  details?: Note;
};

let initialState: NoteDetailsState = {
  error: {
    create: null,
    update: null,
    delete: null,
    read: null,
    copy: null,
  },
  isLoading: {
    create: false,
    update: false,
    delete: false,
    read: false,
    copy: false,
  },
};

const issuesDisplaySlice = createSlice({
  name: "issuesDisplay",
  initialState,
  reducers: {
    startLoading: (state, { payload }: PayloadAction<CRUDKeys | "copy">) => {
      state.isLoading[payload] = true;
    },
    stopLoading: (state, { payload }: PayloadAction<CRUDKeys | "copy">) => {
      state.isLoading[payload] = false;
    },
    setNoteDetailsSuccess: (
      state,
      {
        payload,
      }: PayloadAction<CRUDSuccess<Note> | { type: "copy"; data?: Note }>
    ) => {
      state.details = payload.data;
      state.error[payload.type] = null;
      state.isLoading[payload.type] = false;
    },
    clearNoteDetails(state) {
      state.details = undefined;
    },
    setNoteDetailsFailur(
      state,
      { payload }: PayloadAction<{ type: CRUDKeys | "copy"; data: string }>
    ) {
      const { data, type } = payload;
      state.error[type] = data;
    },
  },
});

export const {
  clearNoteDetails,
  setNoteDetailsFailur,
  setNoteDetailsSuccess,
  startLoading,
  stopLoading,
} = issuesDisplaySlice.actions;

export const add =
  (formData: NoteFormData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(startLoading("create"));
      await noteApi.add(formData);
      dispatch(setNoteDetailsSuccess({ type: "create" }));
    } catch (error) {
      dispatch(
        setNoteDetailsFailur({ type: "create", data: (error as any).message })
      );
    } finally {
      dispatch(stopLoading("create"));
    }
  };
export const update =
  (id: string, formData: NoteFormData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(startLoading("update"));
      const note = await noteApi.update(id, formData);
      dispatch(setNoteDetailsSuccess({ type: "update", data: note }));
    } catch (error) {
      dispatch(
        setNoteDetailsFailur({ type: "update", data: (error as any).message })
      );
    } finally {
      dispatch(stopLoading("update"));
    }
  };

export const getById =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(startLoading("read"));
      const note = await noteApi.getById(id);
      dispatch(setNoteDetailsSuccess({ type: "read", data: note }));
    } catch (err) {
      dispatch(setNoteDetailsFailur({ type: "read", data: err.message }));
    }
  };

export const remove =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(startLoading("delete"));
      await noteApi.remove(id);

      dispatch(setNoteDetailsSuccess({ type: "delete" }));
    } catch (err) {
      dispatch(setNoteDetailsFailur({ type: "delete", data: err.message }));
    }
  };

export const copy =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(startLoading("copy"));
      await noteApi.copy(id);

      dispatch(setNoteDetailsSuccess({ type: "copy" }));
    } catch (err) {
      dispatch(setNoteDetailsFailur({ type: "copy", data: err.message }));
    }
  };

export const noteDetailsSelector = (state: RootState) => state.noteDetails;

export default issuesDisplaySlice.reducer;
