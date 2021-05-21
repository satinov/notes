import ApiService from "../../services/apiService";
import { Pagination } from "../../types";

import { NoteFormData } from "./form";
import { HTTPNoteResponse, Note } from "./types";

export class NoteApiService extends ApiService {
  async add(formData: NoteFormData) {
    try {
      const { data } = await ApiService.fetcher.post<HTTPNoteResponse>(
        "/notes",
        formData
      );
      return NoteApiService.transformNote(data);
    } catch (error) {
      throw error.response.data;
    }
  }

  async getAll({
    currentPage = 1,
    pageSize = 10,
    ...params
  }: {
    symbols?: string;
    userId?: string;
    currentPage?: number;
    pageSize?: number;
  }) {
    try {
      const { data } = await ApiService.fetcher.get<
        Pagination & { notes: HTTPNoteResponse[] }
      >("/notes", { params: { currentPage, pageSize, ...params } });

      return { ...data, notes: data.notes.map(NoteApiService.transformNote) };
    } catch (error) {
      throw error.response.data;
    }
  }

  async getById(id: string) {
    try {
      const { data } = await ApiService.fetcher.get<HTTPNoteResponse>(
        "/notes/" + id
      );

      return NoteApiService.transformNote(data);
    } catch (error) {
      throw error.response.data;
    }
  }

  async update(id: string, formData: NoteFormData) {
    try {
      const { data } = await ApiService.fetcher.put<HTTPNoteResponse>(
        `/notes/${id}`,
        formData
      );
      return NoteApiService.transformNote(data);
    } catch (error) {
      throw error.response.data;
    }
  }

  async remove(id: string) {
    try {
      const { data } = await ApiService.fetcher.delete<{ message: string }>(
        `/notes/${id}`
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async copy(id: string) {
    try {
      const { data } = await ApiService.fetcher.post<{ message: string }>(
        `/notes/copy/${id}`
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }

  static transformNote(noteResponse: HTTPNoteResponse): Note {
    const {
      _id,
      createdAt,
      isFavorite,
      isPublic,
      text,
      title,
      updatedAt,
      user,
      originalNote,
    } = noteResponse;

    return {
      id: _id,
      createdAt,
      isFavorite,
      isPublic,
      text,
      title,
      updatedAt,
      user: {
        email: user.email,
        id: user._id,
        name: user.name,
      },
      originalNote,
    };
  }
}

const noteApi = new NoteApiService();

export default noteApi;
