<?php

namespace App\Http\Controllers;

use App\Models\Transaction; 
use Illuminate\Http\Request;
use App\Http\Middleware\Cors;


class TransactionController extends Controller
{
    public function __construct()
    {
        $this->middleware(Cors::class);
    }
    public function getAllTransactions()
    {
        $transactions = Transaction::all();
        return response()->json($transactions);
    }
}
