import { Authentication } from "../models/authentication";

const apiUrl: string = import.meta.env.VITE_API_URL;
const userCacheKey: string = 'user';
const tokenCacheKey: string = 'token';

export default async function signIn(email: string, password: string) {
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

export function getAuthenticatedUser() : Authentication | undefined {
    const cachedUser = sessionStorage.getItem(userCacheKey);
    const cachedToken = sessionStorage.getItem(tokenCacheKey);

    if (cachedUser && cachedToken) {
        return {
            token: JSON.parse(cachedToken),
            user: JSON.parse(cachedUser),
        }
    }

    return undefined;
}

export function signOut() {
    sessionStorage.removeItem(userCacheKey);
    sessionStorage.removeItem(tokenCacheKey);
}

function getJsonPostRequestInitOptions(body: any): RequestInit {
    return {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }
}