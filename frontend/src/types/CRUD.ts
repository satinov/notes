export type CRUDKeys = "create" | "read" | "update" | "delete";

export type CRUD<T> = {
  [K in CRUDKeys]: T;
};

export type CRUDSuccess<T> =
  | {
      type: "create";
      data?: T;
    }
  | {
      type: "read";
      data: T;
    }
  | {
      type: "update";
      data: T;
    }
  | {
      type: "delete";
      data?: T;
    };
