import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar.tsx';
import styles from "./main.module.scss";

function App() {

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.app}>
                <Outlet />
            </div>
        </div>
    )
}

export default App;
