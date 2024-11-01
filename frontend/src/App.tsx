import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar.tsx';
import styles from "./main.module.scss";
import { useState } from "react";
import { Authentication } from "./models/authentication.tsx";
import { UserContext } from "./contexts/user-context.ts";

export default function App() {
    const [authentication, setAuthentication] = useState<Authentication | undefined>();

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