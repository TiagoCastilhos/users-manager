# Users Management project

This project is a CRUD http rest APi, developed with Laravel, combined with a SPA developed with react js.
The app is using containers to ease local hosting process.

## Host locally

1. Make sure docker is running
2. Go to the project root folder
3. Run `./up.sh` to create all required containers, migrate and seed database.
3. In your browser, access http://localhost:5120/.
3. Admin account email is super@admin.com, password: 1234 (if you want to delete users).

### API requests

To interact with the api, you should send the desired http request, dependending on what you're trying to do.

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

DELETE /api/users/{id}: Delete a user. This is only accessible by admin users.

GET /api/users/{id}/phone: Return user's phone

PUT /api/users/{id}/phone: Set user's phone
``` json
{
    "areaCode": "11",
    "countryCode": "+55",
    "number": "1234567"
}
```

DELETE /api/users/{id}/phone: Delete user's phone

GET /api/users/{id}/address: Return user's address

PUT /api/users/{id}/address: Set user's address
``` json
{
    "country": "Brazil",
    "state": "RS",
    "city": "Caxias do Sul 2"
}
```

DELETE /api/users/{id}/address: Delete user's address

## Commands I used to develop

- php artisan install:api
- php artisan migrate
- php artisan make:model ${name}
- php artisan make:seeder ${name}
- php artisan make:migration ${name} (If name matches the pattern: create_xxx_table, it uses snippets with the given name)
- php artisan db:seed

## Considerations

- Project was created with laravel, [following this documentation](https://laravel.com/docs/11.x/installation#creating-an-application)
- Eloquent ORM is used to communicate with database
- Sanctum is used for authentication/authorization, also used middlewares to validate access
- Authorization middleware only checks if the authenticated user is an admin
- PostgreSQL was chosen as DB due to its simplicity to run in a container
- Application is containerized, with simplified commands to run and delete containers
- UI was not my focus (clearly), I focused on functionality
- I decided not to use any UI library since it is a very simple application, and I didn't want to spend more time configuring a library than actually implementing it. Used `react-hook-form` for forms, `ag-grid-react` for admin page grid and `react-router-dom` for routing.
- Admin page, manage phone and address are taking longer than expected because I decided to use a router loader to load users list. API is taking too much time to respond any request (+6s). I read some topics and tried a bunch of suggestions, but none of them worked.