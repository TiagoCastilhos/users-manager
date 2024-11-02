import { UserContext } from "../contexts/user-context";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/button";
import styles from "./login.module.scss";
import { updateUser } from "../services/authentication-service";
import { User } from "../models/user";
import { Authentication } from "../models/authentication";

export default function Manage() {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm();

    const onSubmit = async (values: FieldValues, authentication: Authentication) => {
        try {
            const user: User = {
                id: authentication.user.id,
                birthDate: values.birthDate,
                firstName: values.firstName,
                lastName: values.lastName,
                email: authentication.user.email,
                userName: values.userName,
                admin: false
            };

            return await updateUser(user, authentication);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <UserContext.Consumer>
            {({ authentication }) => (
                <div className={styles.container}>
                    <div className={styles.formContainer}>
                        <form
                            onSubmit={handleSubmit(async (values) => {
                                await onSubmit(values, authentication!);
                            })}>
                            <h2>Manage</h2>

                            <div>
                                <label htmlFor="username">User name</label>
                                <input defaultValue={authentication?.user.userName} type="text" {...register("userName", { required: { value: true, message: 'User name is required' } })}></input>
                                {errors.userName && <span>{errors.userName.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="firstname">First name</label>
                                <input defaultValue={authentication?.user.firstName} type="text" {...register("firstName", { required: { value: true, message: 'First name is required' } })}></input>
                                {errors.firstName && <span>{errors.firstName.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="lastname">Last name</label>
                                <input defaultValue={authentication?.user.lastName} type="text" {...register("lastName", { required: { value: true, message: 'Last name is required' } })}></input>
                                {errors.lastName && <span>{errors.lastName.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="birthdate">Birth date</label>
                                <input defaultValue={authentication?.user.birthDate} type="date" {...register("birthDate", { required: { value: true, message: 'Birth date is required' }, valueAsDate: true })}></input>
                                {errors.birthDate && <span>{errors.birthDate.message as string}</span>}
                            </div>

                            <div className={styles.buttonsContainer}>
                                <Button name="Cancel" onClick={() => reset()} type="button" />
                                <Button name="Save" type="submit" disabled={!isValid} />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </UserContext.Consumer>
    )
}