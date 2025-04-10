import { User } from "./user.model";

export interface Token {
    token: string,
    roleFlag: number,
    profileInfo: User
}