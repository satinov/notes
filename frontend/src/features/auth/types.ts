export type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

export type HTTPCurentUserResponse = {
  _id: string;
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
};
