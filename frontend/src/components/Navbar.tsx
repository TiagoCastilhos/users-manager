import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";
import { UserContext } from "../contexts/user-context";
import { Authentication } from "../models/authentication";
import { signOut } from "../services/authentication-service";

const defaultLinks = ["Home"];
const anonymousLinks = ["Login", "Register"];
const authenticatedLinks = ["Manage"];
const adminLinks = ["Admin"];

export default function Navbar() {
    const getNavbarLinks = (authentication?: Authentication) => {
        return defaultLinks
            .concat(authentication ? authenticatedLinks : anonymousLinks)
            .concat(authentication?.user?.admin ? adminLinks : [])
    }

    const logout = (setAuthentication: (authentication?: Authentication) => void) => {
        signOut();
        setAuthentication(undefined);
    }

    return (
        <UserContext.Consumer>
            {({ authentication, setAuthentication }) => (
                <div className={styles.container}>
                    <nav>
                        <ul>
                            {
                                getNavbarLinks(authentication)
                                    .map(link => (
                                        <li key={link}>
                                            <NavLink
                                                to={link.toLowerCase()}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? styles.active
                                                        : ""
                                                }
                                            >
                                                {link}
                                            </NavLink>
                                        </li>
                                    ))
                            }
                        </ul>

                        {
                            authentication ?
                                <div className={styles.userContext}>
                                    <div className={styles.userContainer}>Hello, <b>{authentication.user.userName}</b>!</div>
                                    <div onClick={() => { logout(setAuthentication) }} className={styles.logoutButton}>Logout</div>
                                </div> : null
                        }
                    </nav>
                </div>
            )}
        </UserContext.Consumer>
    );
}