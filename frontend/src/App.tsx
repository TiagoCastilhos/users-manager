import { Outlet } from "react-router-dom";
import Navbar from './components/navbar.tsx';
import styles from "./main.module.scss";
import { useEffect, useState } from "react";
import { Authentication } from "./models/authentication.ts";
import { UserContext } from "./contexts/user-context.ts";
import { getAuthenticatedUser } from "./services/authentication-service.ts";

export default function App() {
    const [authentication, setAuthentication] = useState<Authentication | undefined>();

    useEffect(() => {
        const authenticatedUser = getAuthenticatedUser();
        if (authenticatedUser) {
            setAuthentication(authenticatedUser);
        }
    }, [])

    return (
        <UserContext.Provider value={{ authentication: authentication, setAuthentication: setAuthentication }}>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <Navbar />
                </div>
                <div className={styles.app}>
                    <Outlet />
                </div>
            </div>
        </UserContext.Provider>
    )
}