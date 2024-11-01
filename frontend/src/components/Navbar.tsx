import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <div className={styles.container}>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to={""}
                            className={({ isActive }) =>
                                isActive
                                    ? "active"
                                    : ""
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"manage"}
                            className={({ isActive }) =>
                                isActive
                                    ? "active"
                                    : ""
                            }
                        >
                            Manage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"login"}
                            className={({ isActive }) =>
                                isActive
                                    ? "active"
                                    : ""
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"register"}
                            className={({ isActive }) =>
                                isActive
                                    ? "active"
                                    : ""
                            }
                        >
                            Register
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}