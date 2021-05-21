import { User } from "../users/types";

export type HTTPUserResponse = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export type Note = {
  id: string;
  title: string;
  text: string;
  user: User;
  originalNote?: Note;
  isPublic: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type HTTPNoteResponse = {
  _id: string;
  title: string;
  text: string;
  user: HTTPUserResponse;
  originalNote?: Note;
  isFavorite: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};
