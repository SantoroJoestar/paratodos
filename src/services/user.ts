import { UserModel } from "../models/UserModel";
import { UserType } from "../types/user.type";
import { api, handleApiError } from "./api";

const USER_NOT_FOUND_MESSAGE = "Usuário e/ou senha incorretos!";

export const login = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<UserType> => {
  try {
    const response = await api.post("/authenticate", { login, password });

    const user = response?.data?.user;

    if (!user) {
      throw new Error(USER_NOT_FOUND_MESSAGE);
    }

    return UserModel(user);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};