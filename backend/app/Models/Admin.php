<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admins';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'apellido', 'cedula', 'imagen', 'correo', 'direccion', 'pais', 'estado', 'ciudad', 'telefono', 'usuario', 'contraseña', 'tipoUser'];
    use HasFactory;
}
