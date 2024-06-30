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
            $date = $request->input('date');


            $startDate = date('Y-m-01', strtotime($date)); 
           // Log::info('End Date: ' . $endDate);
            $transactions = Transaction::whereBetween('Date', [$startDate, $date])->get();

            return response()->json($transactions, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch transactions'], 500);
        }  

    }
}
