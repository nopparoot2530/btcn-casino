<?php

use Illuminate\Http\Client\Request;
use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/



$router->group(['prefix' => 'api'], function () use ($router) {


    $router->get('/', ['middleware' => 'jwt', function () use ($router) {
        return $router->app->version();
    }]);

    // Auth routes
    $router->group(['prefix' => 'auth'], function () use ($router) {

        $router->get('/create-pw-hash/{pw}', function ($pw) {
            return Hash::make($pw);
        });

        $router->post('/login', [
            'uses' => 'AuthController@login'
        ]);

        $router->get('/me', [
            'middleware' => 'jwt',
            'uses' => 'AuthController@me'
        ]);
    });

    // Casino CRUD routes
    $router->group(['prefix' => 'casino'], function () use ($router) {

        $router->get('/', 'CasinoController@getAllCasino');
        $router->get('/{id}', 'CasinoController@getCasino');
        $router->group(['middleware' => 'jwt'], function () use ($router) {
            $router->post('/', 'CasinoController@create');
            $router->post('/{id}', 'CasinoController@uploadPicture');
            $router->put('/{id}', 'CasinoController@update');
            $router->delete('/{id}', 'CasinoController@delete');
        });
    });
});
