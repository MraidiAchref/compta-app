<?php

namespace App\Http\Controllers;

use App\Models\Transaction; 
use Illuminate\Http\Request;
use App\Http\Middleware\Cors;
use Illuminate\Support\Facades\Log; 


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

    public function getTransactionsAtDate(Request $request){
        try {
            $endDate = $request->input('endDate');
            $startDate = $request->input('startDate');

           // Log::info('End Date: ' . $endDate);
            $transactions = Transaction::whereBetween('Date', [$startDate, $endDate])
                                                                ->orderBy('Date', 'asc')
                                                                ->get();

            return response()->json($transactions, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch transactions'], 500);
        }  

    }
}
