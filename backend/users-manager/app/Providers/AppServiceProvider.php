<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Authentication\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
     /**
     * All of the container bindings that should be registered.
     *
     * @var array
     */
    public $bindings = [
    ];
 
    /**
     * All of the container singletons that should be registered.
     *
     * @var array
     */
    public $singletons = [
        UsersServiceInterface::class => UsersService::class,
    ];

    public function boot(): void
    {
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
