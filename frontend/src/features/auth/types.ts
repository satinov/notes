import { User } from "../users/types";

export type CurrentUser = User;

export type HTTPCurentUserResponse = {
  _id: string;
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
};
