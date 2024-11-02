import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import styles from "./admin.module.scss";
import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { User } from '../models/user';
import Button from '../components/button';
import { UserContext } from '../contexts/user-context';
import { deleteUser, getUsers } from '../services/users-service';

export default function Admin() {
    const [users, setUsers] = useState<User[] | undefined>(useLoaderData() as User[]);

    const CustomButtonComponent = (props: any) => {
        return (
            <UserContext.Consumer>
                {({ authentication }) => (
                    <Button
                        type='button'
                        name='Delete'
                        onClick={async () => {
                            await deleteUser(props.data.id, authentication!);
                            setUsers(await getUsers(authentication!))
                        }} />
                )}
            </UserContext.Consumer>
        );
    };

    const columns: any = useMemo(() => [
        { field: "id" },
        { field: "email" },
        { field: "userName" },
        { field: "firstName" },
        { field: "lastName" },
        { field: "birthDate" },
        { field: "createdAt" },
        { field: 'delete', cellRenderer: CustomButtonComponent, flex: 1 },
    ], []);

    return (
        <div className={styles.container}>
            <div
                style={{ height: 500, width: '100%' }}>
                {
                    users &&
                    <AgGridReact
                        rowData={users}
                        columnDefs={columns}
                    />
                }
            </div>
        </div>

    )
}