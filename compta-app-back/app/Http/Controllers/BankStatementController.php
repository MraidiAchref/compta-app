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
    public function saveNewBankStatmentLinesToDB(Request $request){
        \Log::info('Session data:', $request->session()->all());

        try {
            
             
            $chosenBank = $request->input('bank');
            \Log::info('bank name:', ['bank' => $chosenBank]);
        
            $dataToSave = $request->input('data'); 

            foreach ($dataToSave as $line) {
                $date = $line['Date'];
                $description = $line['Description'];
                $debit = $line['Debit']?? 0;
                $credit = $line['Credit']?? 0;
    
                $existingRecord = BankStatement::where('Date', $date)
                    ->where('Description', $description)
                    ->where('Debit', $debit)
                    ->where('Credit', $credit)
                    ->where('Bank', $chosenBank)
                    ->first();
    
                    \Log::info('line data:', $line);
                if (!$existingRecord) {
                    BankStatement::create([
                        'Date' => $date,
                        'Description' => $description,
                        'Debit' => $debit,
                        'Credit' => $credit,
                        'Bank' => $chosenBank
                    ]);
                }
            }
            
            return response()->json(['message' => 'Data processing completed'],200);
        } catch (\Exception $e) {
            \Log::error('Failed to save bank statements: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to save bankStatments  ' ], 500);
        }  

    }
}
