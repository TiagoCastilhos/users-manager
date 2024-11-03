import { Address } from "../models/address";
import { Authentication } from "../models/authentication";
import { Phone } from "../models/phone";
import { User } from "../models/user";
import { apiUrl, getJsonPostRequestInitOptions } from "./service";

const userCacheKey: string = 'user';
const tokenCacheKey: string = 'token';

export async function signIn(email: string, password: string) {
    const response = await fetch(`${apiUrl}/authenticate`, getJsonPostRequestInitOptions({ email: email, password: password }));
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    const authentication = responseData as Authentication;

    //ToDo: Secure user data storage in session
    sessionStorage.setItem(userCacheKey, JSON.stringify(authentication.user));
    sessionStorage.setItem(tokenCacheKey, authentication.token);

    return authentication;
}

export async function createUser(user: User, password: string) {
    const response = await fetch(`${apiUrl}/users`, getJsonPostRequestInitOptions({ ...user, password: password }));
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error);
    }

    return await signIn(user.email, password);
}

export async function updateUser(user: User, authentication: Authentication) {
    const options = getJsonPostRequestInitOptions(user, 'PUT', authentication);

    const response = await fetch(`${apiUrl}/users/${user.id}`, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error);
    }

    sessionStorage.setItem(userCacheKey, JSON.stringify(responseData));
}

export async function getPhone(authentication: Authentication) {
    const options = getJsonPostRequestInitOptions(undefined, 'GET', authentication);

    const response = await fetch(`${apiUrl}/users/${authentication.user.id}/phone`, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error);
    }

    return responseData ?? null;
}

export async function updatePhone(phone: Phone, authentication: Authentication) {
    const options = getJsonPostRequestInitOptions(phone, 'PUT', authentication);

    const response = await fetch(`${apiUrl}/users/${authentication.user.id}/phone`, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error);
    }
}

export async function deletePhone(authentication: Authentication) {
    const options = getJsonPostRequestInitOptions(undefined, 'DELETE', authentication);

    const response = await fetch(`${apiUrl}/users/${authentication.user.id}/phone`, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error);
    }
}

export async function getAddress(authentication: Authentication) {
    const options = getJsonPostRequestInitOptions(undefined, 'GET', authentication);

    const response = await fetch(`${apiUrl}/users/${authentication.user.id}/address`, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error);
    }

    return responseData ?? null;
}

export async function updateAddress(address: Address, authentication: Authentication) {
    const options = getJsonPostRequestInitOptions(address, 'PUT', authentication);

    const response = await fetch(`${apiUrl}/users/${authentication.user.id}/address`, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error);
    }
}

export async function deleteAddress(authentication: Authentication) {
    const options = getJsonPostRequestInitOptions(undefined, 'DELETE', authentication);

    const response = await fetch(`${apiUrl}/users/${authentication.user.id}/address`, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error);
    }
}

export function getAuthenticatedUser(): Authentication | undefined {
    const cachedUser = sessionStorage.getItem(userCacheKey);
    const cachedToken = sessionStorage.getItem(tokenCacheKey);

    if (cachedUser && cachedToken) {
        return {
            token: cachedToken,
            user: JSON.parse(cachedUser),
        }
    }

    return undefined;
}

export function signOut() {
    sessionStorage.removeItem(userCacheKey);
    sessionStorage.removeItem(tokenCacheKey);
}