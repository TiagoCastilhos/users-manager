import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { UserContext } from "../contexts/user-context";

const defaultLinks = ["Home"];
const anonymousLinks = ["Login", "Register"];
const authenticatedLinks = ["Manage", "Logout"];
const adminLinks = ["Admin"];

export default function Navbar() {
    return (
        <UserContext.Consumer>
            {({ authentication }) => (
                <div className={styles.container}>
                    <nav>
                        <ul>
                            {
                                defaultLinks
                                    .concat(authentication ? authenticatedLinks : anonymousLinks)
                                    .concat(authentication?.user?.admin ? adminLinks : [])
                                    .map(link => (
                                        <li key={link}>
                                            <NavLink
                                                to={link.toLowerCase()}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                {link}
                                            </NavLink>
                                        </li>
                                    ))
                            }
                        </ul>
                    </nav>
                </div>
            )}
        </UserContext.Consumer>
    );
}