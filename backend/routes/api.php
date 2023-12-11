<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SalasController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
/* ---- Clientes ---- */
Route::get('/admins', [App\Http\Controllers\AdminController::class, 'index']);
Route::get('/admin/{id}', [App\Http\Controllers\AdminController::class, 'show']);
Route::post('/admin', [App\Http\Controllers\AdminController::class, 'store']);
Route::put('/admin/{id}', [App\Http\Controllers\AdminController::class, 'update']);
Route::delete('/admin/{id}',[App\Http\Controllers\AdminController::class, 'destroy']);
Route::post('/admin/login',[App\Http\Controllers\AdminController::class, 'login']);

/* ---- Salas ---- */
Route::get('/salas', [App\Http\Controllers\SalasController::class, 'index']);
Route::get('/sala/{id}', [App\Http\Controllers\SalasController::class, 'show']);
Route::post('/sala', [App\Http\Controllers\SalasController::class, 'store']);
Route::put('/sala/{id}', [App\Http\Controllers\SalasController::class, 'update']);
Route::delete('/sala/{id}',[App\Http\Controllers\SalasController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
