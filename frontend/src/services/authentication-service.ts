import { Authentication } from "../models/authentication";
import { User } from "../models/user";

const apiUrl: string = import.meta.env.VITE_API_URL;
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

function getJsonPostRequestInitOptions(body: any, method: "POST" | "PUT" | "GET" | "DELETE" = 'POST', authentication: Authentication | undefined = undefined): RequestInit {
    const options: RequestInit = {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (authentication) {
        //@ts-ignore
        options.headers['Authorization'] = `Bearer ${authentication.token}`;
    }

    return options;
}