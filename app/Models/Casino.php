<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Casino extends Model
{
    //

    protected $table = 'casino';

    protected $fillable  = [
        'id',
        'name',
        'rank',
        'rating',
        'bonus',
        'link',
        'image_link'
    ];

    /**
     * Get the key features.
     */
    public function keyFeatures()
    {
        return $this->hasMany(KeyFeatures::class);
    }
}
