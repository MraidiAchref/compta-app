<?php

namespace App\Http\Controllers;

use App\Models\Transaction; 
use Illuminate\Http\Request;
use App\Http\Middleware\Cors;


class TransactionController extends Controller
{
    public function __construct()
    {
    }
    public function getAllTransactions()
    {
        try {
            $transactions = Transaction::all();
            return response()->json($transactions, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch transactions'], 500);
        }
    }
}
