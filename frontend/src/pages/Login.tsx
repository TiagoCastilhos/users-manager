import styles from "./login.module.scss";
import { signIn } from "../services/authentication-service";
import { UserContext } from "../contexts/user-context";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useForm } from "react-hook-form";

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (email: string, password: string) => {
        try {
            return await signIn(email, password);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <UserContext.Consumer>
            {({ setAuthentication }) => (
                <div className={styles.container}>
                    <div className={styles.formContainer}>
                        <form
                            onSubmit={handleSubmit(async (values) => {
                                const authentication = await onSubmit(values.email, values.password);
                                if (authentication) {
                                    setAuthentication(authentication);
                                    navigate("/home");
                                }
                            })}>
                            <h2>Welcome back!</h2>
                            <h3>Please, provide your credentials:</h3>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="text" {...register("email", { required: { value: true, message: 'Email is required' }, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Incorrect format' } })}></input>
                                {errors.email && <span>{errors.email.message as string}</span>}
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" {...register("password", { required: { value: true, message: 'Password is required' } })}></input>
                                {errors.password && <span>{errors.password.message as string}</span>}
                            </div>
                            <div>
                                <Button name="Login" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </UserContext.Consumer>
    )
}