import styles from "./manage.module.scss";
import { NavLink, Outlet } from "react-router-dom";

const links = ["User", "Phone", "Address"];

export default function Manage() {

    return (
        <div className={styles.container}>
            <nav>
                <ul>
                    {
                        links.map(l =>
                            <li key={l}>
                                <NavLink
                                    to={`/manage/${l.toLowerCase()}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? styles.active
                                            : ""
                                    }
                                >
                                    {l}
                                </NavLink>
                            </li>)
                    }
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}