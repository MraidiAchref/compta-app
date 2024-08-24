<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\BankStatementController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::post('/posts', [PostController::class, 'show'])->middleware('web');

Route::get('/getTransactions', [TransactionController::class, 'getAllTransactions']);
Route::get('/getTransactionsAtDate', [TransactionController::class, 'getTransactionsAtDate']);
Route::get('/getSavedBanks', [BankStatementController::class, 'getSavedBanks']);
Route::get('/getBankStatmentBetweenDateAtBank', [BankStatementController::class, 'getBankStatmentBetweenDateAtBank']);
Route::post('/saveNewBankStatmentLinesToDB', [BankStatementController::class, 'saveNewBankStatmentLinesToDB'])->middleware('web');



