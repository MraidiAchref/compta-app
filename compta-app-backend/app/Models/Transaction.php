<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'compte_532'; 

    protected $fillable = [
        'ID',
        'Date',
        'Description',
        'Debit',
        'Credit',
    ];
}
