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
        //
        Schema::create('comprados', function (Blueprint $table) {
            $table->id();
            $table->string('asientos')->nullable();
            $table->string('sala')->nullable();
            $table->string('cliente')->nullable();
            $table->string('pelicula')->nullable();
            $table->string('horario')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //

        Schema::dropIfExists('comprados');
    }
};
