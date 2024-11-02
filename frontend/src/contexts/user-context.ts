import React from "react";
import { Authentication } from "../models/authentication";

export interface UserContextDefinition {
    authentication?: Authentication,
    setAuthentication: (authentication?: Authentication) => void
}

export const UserContext = React.createContext<UserContextDefinition>({
    authentication: undefined,
    setAuthentication: (authentication?: Authentication) => { }
});