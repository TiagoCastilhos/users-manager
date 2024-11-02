import { UserContext } from "../contexts/user-context";
import styles from "./home.module.scss";

export default function Home() {
    return (
        <UserContext.Consumer>
            {({ authentication }) => (
                <div className={styles.container}>
                    {authentication ?
                        <div>
                            <h2>Hello, {authentication.user.firstName} {authentication.user.lastName}!</h2>
                            <h4>Since you're logged in, you can: </h4>
                            <ul>
                                <li>Manage your data: Feel free to edit your name, birth date, add/remove your address/phone!</li>
                                {
                                    authentication.user.admin ?
                                        <>
                                            <li>List all registered users from the system (admins only)</li>
                                            <li>Delete a user (admins only)</li>
                                        </>
                                        : null
                                }
                            </ul>
                        </div>
                        : <div>
                            <h2>Hello, stranger!</h2>
                            <h4>Since you're not logged in, you can: </h4>
                            <ul>
                                <li>Login, if you already have an account</li>
                                <li>If you don't have an account yet, please Register! (spam emails were not implemented yet, I swear)</li>
                            </ul>
                        </div>
                    }

                    <div>
                        <h4>What is this application made of?</h4>
                        <ul>
                            <li>React framework, using typescript</li>
                            <li>Sass</li>
                            <li>Html</li>
                            <li>Vite</li>
                        </ul>
                    </div>

                    <div>
                        <h4>Where is this application data coming from?</h4>
                        <ul>
                            <li>Data is pulled from an Http rest API</li>
                            <li>This API is developed with Laravel, a very popular PHP framework</li>
                            <li>PostgreSQL was chosen to be the SQL database of that application</li>
                            <li>Eloquent ORM is used to manage the database</li>
                            <li>Sanctum is used to manage authentication/authorization</li>
                        </ul>
                    </div>
                </div>
            )}
        </UserContext.Consumer >
    )
}