<?php

namespace App\Http\Controllers;
use App\Models\BankStatement;
use Illuminate\Http\Request;

class BankStatementController extends Controller
{
    public function getSavedBanks()
    {
        $banks = BankStatement::distinct()->pluck('Bank');
        return response()->json($banks, 200);
    }

    public function getBankStatmentBetweenDateAtBank(Request $request){
        try {
            $endDate = $request->input('endDate');
            $startDate = $request->input('startDate');
            $bank = $request->input('bank');

            $bankStatements = BankStatement::whereBetween('Date', [$startDate, $endDate])
            ->when($bank, function($query) use ($bank) {
                return $query->where('Bank', $bank); 
            })
            ->orderBy('Date', 'asc')
            ->get();

            return response()->json($bankStatements, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch bankStatments  ' ], 500);
        }  

    }
}
