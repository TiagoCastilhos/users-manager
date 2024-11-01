import { useState } from "react";
import styles from "./Login.module.scss";
import signIn from "../services/authentication-service";
import { UserContext } from "../contexts/user-context";

export default function Login() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            return await signIn(email!, password!);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <UserContext.Consumer>
            {({ authentication, setAuthentication }) => (
                <div className={styles.container}>
                    <h2>Welcome back!</h2>
                    <h4>Please, provide your credentials:</h4>

                    <form onSubmit={async (e) => {
                        const authentication = await onSubmit(e);
                        if (authentication) {
                            setAuthentication(authentication);
                        }
                    }}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="text" onChange={(v) => setEmail(v.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={(v) => setPassword(v.target.value)}></input>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            )}
        </UserContext.Consumer>
    )
}