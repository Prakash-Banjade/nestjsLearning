
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    id: number;
    name: string;
    email: string;
}

export interface UpdateUserInput {
    id: number;
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): User | Promise<User>;
}

type Nullable<T> = T | null;
