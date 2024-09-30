import { UserType } from "../types/user.type";

export const UserModel = (obj: Partial<UserType> = {}): UserType => ({
    name: obj?.name || "",
    address: obj?.address || "",
    login: obj?.login || "",
    role: obj?.role || "",
    active: obj?.active || true,
})