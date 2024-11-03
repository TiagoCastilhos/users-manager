import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user-context";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/button";
import styles from "./login.module.scss";
import { createUser } from "../services/authentication-service";
import { User } from "../models/user";

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (values: FieldValues) => {
        try {
            const user: User = {
                birthDate: values.birthDate,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                userName: values.userName,
                admin: false
            };

            return await createUser(user, values.password);
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
                                const authentication = await onSubmit(values);
                                if (authentication) {
                                    setAuthentication(authentication);
                                    navigate("/home");
                                }
                            })}>
                            <h2>Register</h2>
                            <h3>Please, register by submitting to the form below:</h3>

                            <div>
                                <label htmlFor="username">User name</label>
                                <input type="text" {...register("userName", {
                                    required: { value: true, message: 'User name is required' },
                                    minLength: { value: 4, message: 'User name must have at least 4 characters' },
                                    maxLength: { value: 16, message: 'User name cannot have more than 16 characters' },
                                })}></input>
                                {errors.userName && <span>{errors.userName.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="firstname">First name</label>
                                <input type="text" {...register("firstName", {
                                    required: { value: true, message: 'First name is required' },
                                    minLength: { value: 2, message: 'First name must have at least 2 characters' },
                                    maxLength: { value: 50, message: 'First name cannot have more than 50 characters' },
                                })}></input>
                                {errors.firstName && <span>{errors.firstName.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="lastname">Last name</label>
                                <input type="text" {...register("lastName", {
                                    required: { value: true, message: 'Last name is required' },
                                    minLength: { value: 2, message: 'Last name must have at least 2 characters' },
                                    maxLength: { value: 50, message: 'Last name cannot have more than 50 characters' },
                                })}></input>
                                {errors.lastName && <span>{errors.lastName.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="birthdate">Birth date</label>
                                <input type="date" {...register("birthDate", { required: { value: true, message: 'Birth date is required' }, valueAsDate: true })}></input>
                                {errors.birthDate && <span>{errors.birthDate.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="text" {...register("email", {
                                    required: { value: true, message: 'Email is required' },
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Incorrect format' },
                                    maxLength: { value: 255, message: 'Email cannot have more than 255 characters' },
                                })}></input>
                                {errors.email && <span>{errors.email.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" {...register("password", {
                                    required: { value: true, message: 'Password is required' },
                                    minLength: { value: 6, message: 'Password must have at least 6 characters' },
                                })}></input>
                                {errors.password && <span>{errors.password.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="confirmpassword">Confirm password</label>
                                <input type="password" {...register("confirmPassword",
                                    {
                                        validate: (value, values) => {
                                            if (value !== values.password) {
                                                return "Must match password value"
                                            }
                                        }
                                    })}>
                                </input>
                                {errors.confirmPassword && <span>{errors.confirmPassword.message as string}</span>}
                            </div>

                            <div>
                                <Button name="Register" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </UserContext.Consumer>
    )
}