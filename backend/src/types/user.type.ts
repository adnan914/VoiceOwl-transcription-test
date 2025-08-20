import { Types, Document } from "mongoose";
import { Role, Status } from "@/enums";

export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserDocument extends Document {
    _id: Types.ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    profileImg?: string;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    accessToken?: string;
    refreshToken?: string;
}

export interface UpdateUserInput {
    firstName: string;
    lastName: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface UserListInput {
    limit?: number;
    lastSeenId?: string;
}
