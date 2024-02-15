<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comprado extends Model
{
    protected $table = 'comprados';
    protected $primaryKey = 'id';
    protected $fillable = ['asientos', 'sala', 'cliente','pelicula','horario'];
    use HasFactory;
}
