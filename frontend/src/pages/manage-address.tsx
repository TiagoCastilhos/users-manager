import { UserContext } from "../contexts/user-context";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/button";
import formStyles from "./login.module.scss";
import { deleteAddress, updateAddress } from "../services/authentication-service";
import { Authentication } from "../models/authentication";
import { Address } from "../models/address";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { isEmpty } from "../utils/object-utils";

export default function ManageAddress() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let address = useLoaderData() as Address | null;

    const [canDelete, setCanDelete] = useState(!isEmpty(address));

    useEffect(() => {
        setCanDelete(!isEmpty(address));
    }, [address]);

    const onSubmit = async (values: FieldValues, authentication: Authentication) => {
        try {
            const newAddress: Address = {
                city: values.city,
                country: values.country,
                state: values.state,
            };

            await updateAddress(newAddress, authentication);
            setCanDelete(true);
        }
        catch (err) {
            console.error(err);
        }
    }

    const onDelete = async (authentication: Authentication) => {
        await deleteAddress(authentication);
        setCanDelete(false);
        address = null;
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
                                <label htmlFor="country">Country</label>
                                <input defaultValue={address?.country} type="text" {...register("country", {
                                    required: { value: true, message: 'Country is required' },
                                    minLength: { value: 2, message: 'Country must have at least 2 characters' },
                                    maxLength: { value: 50, message: 'Country cannot have more than 50 characters' },
                                })}></input>
                                {errors.country && <span>{errors.country.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="state">State</label>
                                <input defaultValue={address?.state} type="text" {...register("state", {
                                    required: { value: true, message: 'State is required' },
                                    minLength: { value: 2, message: 'State must have at least 2 characters' },
                                    maxLength: { value: 50, message: 'State cannot have more than 50 characters' },
                                })}></input>
                                {errors.state && <span>{errors.state.message as string}</span>}
                            </div>

                            <div>
                                <label htmlFor="city">City</label>
                                <input defaultValue={address?.city} type="text" {...register("city", {
                                    required: { value: true, message: 'City is required' },
                                    minLength: { value: 2, message: 'City must have at least 2 characters' },
                                    maxLength: { value: 100, message: 'City cannot have more than 100 characters' },
                                })}></input>
                                {errors.city && <span>{errors.city.message as string}</span>}
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