# PHP CRUD

This is a crud developed with Laravel + react js.
The app is using containers to ease local hosting process.

## Host locally

Go to \backend\users-manager

1. Run `sail up` to create all required containers.
2. Run `sail php artisan migrate` to migrate the database.
(Optional) 3. Run `sail php artisan db:seed` tp create the admin user.

### API requests

To interact with the api, you should send the desired http request, dependeding on what you're trying to do.

#### Examples:
Authenticate and create user don't require authentication. 
Nny other endpoint will require a Bearer token, issued by authenticate endpoint, to grant access.

##### Anonymous endpoints

POST /api/authenticate
``` json
{
    "email": "your@email.com",
    "password": "yourpassword"
}
```

POST /api/users: Create a user
``` json
{
    "firstName": "test2",
    "lastName": "test2",
    "userName": "test2",
    "password": "123456",
    "birthDate": "2024-10-26 08:00:00",
    "email": "test2@test.com"
}
```
##### Protected endpoints

GET /api/users: Returns all users from database, including related entities. This is only accessible by admin users.

DELETE /api/users/{id}: Delete a user

PUT /api/users/{id}/address: Set the user address
``` json
{
    "country": "Brazil",
    "state": "RS",
    "city": "Caxias do Sul 2"
}
```

PUT /api/users/{id}/phone: Set the user phone
``` json
{
    "areaCode": "11",
    "countryCode": "+55",
    "number": "1234567"
}
```

DELETE /api/users/{id}/address: Delete the user address

PUT /api/users/{id}/phone: Delete the user phone

## Commands I used to develop

php artisan install:api

php artisan migrate

php artisan make:model ${name}

php artisan make:seeder ${name}

php artisan make:migration ${name}
(If name matches the pattern: create_xxx_table, it uses snippets with the given name)

php artisan db:seed