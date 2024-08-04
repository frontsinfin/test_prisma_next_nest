export interface IAuthForm {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name?: string;
  email: string;
}
export interface IAdmin {
  id: number;
  email: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}
export interface ICategory {
  id: string;
  name: string;
  image?: ICategoryImage | null;
}
export interface ICategoryImage {
  id: number;
  filename: string;
  mimetype: string;
  description?: string;
  createdAt: string;
  categoryId: string;
}

export type TypeUserForm = Omit<IUser, "id"> & { password?: string };
