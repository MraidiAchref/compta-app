<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankStatement extends Model
{
    use HasFactory;

    protected $table = 'bankstatments';

    protected $fillable = [
        'Date',
        'Description',
        'Debit',
        'Credit',
        'Bank',
    ];
}
