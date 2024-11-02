import { Authentication } from "../models/authentication";
import { User } from "../models/user";
import { apiUrl, getJsonPostRequestInitOptions } from "./service";

export async function getUsers(authentication: Authentication): Promise<User[] | undefined> {
    const options = getJsonPostRequestInitOptions(undefined, "GET", authentication);
    const response = await fetch(`${apiUrl}/users`, options);

    const responseData = await response.json();

    if (response.ok) {
        return responseData;
    }

    console.error(responseData.message);
}

export async function deleteUser(id: number, authentication: Authentication) {
    const options = getJsonPostRequestInitOptions(undefined, "DELETE", authentication);
    const response = await fetch(`${apiUrl}/users/${id}`, options);

    if (!response.ok) {
        const responseData = await response.json();
        console.error(responseData.message);
    }
}