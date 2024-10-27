php artisan install:api

php artisan migrate

php artisan make:model ${name}

php artisan make:seeder ${name}

php artisan make:migration ${name}
(If name matches the pattern: create_xxx_table, it uses snippets with the given name)

php artisan db:seed