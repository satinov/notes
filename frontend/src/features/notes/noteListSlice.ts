import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { RootState } from "../../store/rootReducer";
import { Pagination } from "../../types";
import noteApi from "./noteApiService";
import { Note } from "./types";

type NoteListState = {
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  pageCount: number;
  notes: Note[];
};

let initialState: NoteListState = {
  isLoading: false,
  error: null,
  notes: [],
  currentPage: 1,
  pageCount: 1,
};

function startLoading(state: NoteListState) {
  state.isLoading = true;
}

function loadingFailed(state: NoteListState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const noteListSice = createSlice({
  name: "noteList",
  initialState: { ...initialState },
  reducers: {
    getNotesStart: startLoading,

    getNotesSuccess(
      state,
      { payload }: PayloadAction<Pagination & { notes: Note[] }>
    ) {
      const { currentPage, pageCount, notes } = payload;

      state.pageCount = pageCount;
      state.notes = [...state.notes, ...notes];
      state.isLoading = false;
      state.error = null;
    },

    resetNoteList() {
      return { ...initialState };
    },
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
    getNotesFailure: loadingFailed,
  },
});

export const {
  getNotesStart,
  getNotesFailure,
  getNotesSuccess,
  setCurrentPage,
  resetNoteList,
} = noteListSice.actions;

export default noteListSice.reducer;

export const fetchNotes =
  (
    params: {
      pageSize?: number;
      symbols?: string;
      userId?: string;
    } = {}
  ): AppThunk =>
  async (dispatch, getState) => {
    const currentPage = getState().noteList.currentPage;
    try {
      dispatch(getNotesStart());
      const noteList = await noteApi.getAll({ ...params, currentPage });
      dispatch(getNotesSuccess(noteList));
      dispatch(setCurrentPage(currentPage + 1));
    } catch (err) {
      dispatch(getNotesFailure(err.message));
    }
  };

export const noteListSelector = (state: RootState) => state.noteList;
