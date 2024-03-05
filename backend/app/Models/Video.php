<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $table = 'videos';
    protected $primaryKey = 'id';
    protected $fillable = ['itemImageSrc', 'thumbnailVideoSrc', 'alt', 'title'];
    use HasFactory;
}