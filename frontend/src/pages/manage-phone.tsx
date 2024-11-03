import { UserContext } from "../contexts/user-context";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/button";
import formStyles from "./login.module.scss";
import { deletePhone, updatePhone } from "../services/authentication-service";
import { Authentication } from "../models/authentication";
import { Phone } from "../models/phone";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { isEmpty } from "../utils/object-utils";

export default function ManagePhone() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let phone = useLoaderData() as Phone | null;

    const [canDelete, setCanDelete] = useState(!isEmpty(phone));

    useEffect(() => {
        setCanDelete(!isEmpty(phone));
    }, [phone])

    const onSubmit = async (values: FieldValues, authentication: Authentication) => {
        try {
            const newPhone: Phone = {
                areaCode: values.areaCode,
                countryCode: values.countryCode,
                number: values.number
            };

            await updatePhone(newPhone, authentication);
            setCanDelete(true);
        }
        catch (err) {
            console.error(err);
        }
    }

    const onDelete = async (authentication: Authentication) => {
        await deletePhone(authentication);
        setCanDelete(false);
        phone = null;
        reset();
    }

    return (
        <UserContext.Consumer>
            {({ authentication }) => (
                <div className={formStyles.container}>
                    <div className={formStyles.formContainer}>
                        <form
                            onSubmit={handleSubmit(async (values) => {
                                await onSubmit(values, authentication!);
                            })}>
                            <h2>Manage</h2>

                            <div>
                                <label htmlFor="countrycode">Country code</label>
                                <input defaultValue={phone?.countryCode} type="text" {...register("countryCode", {
                                    required: { value: true, message: 'Country code is required' },
                                    minLength: { value: 2, message: 'Country code must have at least 2 characters' },
                                    maxLength: { value: 6, message: 'Country code cannot have more than 6 characters' },
                                })}></input>
                                {errors.countryCode && <span>{errors.countryCode.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="areacode">Area code</label>
                                <input defaultValue={phone?.areaCode} type="text" {...register("areaCode", {
                                    required: { value: true, message: 'Area code is required' },
                                    minLength: { value: 2, message: 'Area code must have at least 2 characters' },
                                    maxLength: { value: 10, message: 'Area code cannot have more than 10 characters' },
                                })}></input>
                                {errors.areaCode && <span>{errors.areaCode.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="number">Number</label>
                                <input defaultValue={phone?.number} type="text" {...register("number", {
                                    required: { value: true, message: 'Number is required' },
                                    minLength: { value: 4, message: 'Number must have at least 4 characters' },
                                    maxLength: { value: 20, message: 'Number cannot have more than 20 characters' },
                                })}></input>
                                {errors.number && <span>{errors.number.message as string}</span>}
                            </div>

                            <div className={formStyles.buttonsContainer}>
                                <Button name="Cancel" onClick={() => reset()} type="button" />
                                <Button name="Delete" onClick={async () => await onDelete(authentication!)} type="button" disabled={!canDelete} />
                                <Button name="Save" type="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </UserContext.Consumer>
    )
}