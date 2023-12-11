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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 15);
            $table->string('apellido', 15)->nullable();
            $table->string('cedula', 13)->nullable()->unique();
            $table->binary('imagen')->nullable(); // formato para agregar archivos multimedias
            $table->string('correo')->nullable()->unique();
            $table->string('direccion')->nullable();
            $table->string('pais')->nullable();
            $table->string('estado')->nullable();
            $table->string('ciudad')->nullable();
            $table->string('telefono')->nullable()->unique();
            $table->string('usuario', 20);
            $table->string('contraseña', 20);
            $table->string('tipoUser', 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
