import { UserModel } from "../models/UserModel";
import { UserType } from "../types/user.type";
import { api } from "./api";

export const login = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<UserType> => {
  try {
    const { user } = await api
      .post("/authenticate", {
        login,
        password,
      })
      .then((res) => res.data);

    if (!user) throw new Error("Usuário e/ou senha incorretos!");

    return UserModel(user);
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};
