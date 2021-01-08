<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KeyFeatures extends Model

{
    protected $table = 'key_features';

    protected $fillable = ['name', 'casino_id'];

    public function casino()
    {
        return $this->belongsTo(Casino::class, 'casino_id');
    }
}
