import { Authentication } from "../models/authentication";

export const apiUrl: string = import.meta.env.VITE_API_URL;

export function getJsonPostRequestInitOptions(
    body?: any,
    method: "POST" | "PUT" | "GET" | "DELETE" = 'POST',
    authentication: Authentication | undefined = undefined): RequestInit {
        
    const options: RequestInit = {
        method: method,
        body: body? JSON.stringify(body) : undefined,
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