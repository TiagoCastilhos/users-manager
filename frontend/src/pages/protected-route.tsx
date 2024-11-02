import React from 'react'
import { PropsWithChildren } from "react"
import { UserContext } from '../contexts/user-context'
import { Navigate } from 'react-router-dom';

export interface ProtectedRouteProps {
    adminOnly?: boolean
}

export function ProtectedRoute({ children, adminOnly }: PropsWithChildren<ProtectedRouteProps>) {
    return (
        <UserContext.Consumer>
            {({ authentication }) => (
                authentication && authentication.user && (!adminOnly || (adminOnly && authentication.user.admin)) ?
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                    : <Navigate to="/home">
                    </Navigate>
            )}
        </UserContext.Consumer>
    );
}