<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bankstatments', function (Blueprint $table) {
            $table->id();
            $table->date('Date');
            $table->string('Description');
            $table->decimal('Debit', 10, 2)->default(0);
            $table->decimal('Credit', 10, 2)->default(0);
            $table->string('Bank');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bankstatments');
    }
};
