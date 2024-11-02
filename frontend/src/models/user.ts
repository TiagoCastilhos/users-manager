import { Address } from "./address";
import { Phone } from "./phone";

export interface User {
    id?: number,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    birthDate: string,
    admin: boolean,
    phone?: Phone,
    address?: Address
}