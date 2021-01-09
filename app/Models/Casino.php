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

    public function replaceCurrentImage($newImageLink)
    {
        $currentImageName = str_replace(env('IMAGE_BASE_URL', 'https://bitcoincasinolists.com/images') . '/', "", $this->image_link);
        if (file_exists(env("IMAGE_STORAGE_PATH", "./images") . $currentImageName)) {
            unlink(env("IMAGE_STORAGE_PATH", "./images") . $currentImageName);
        }
        $this->image_link = env('IMAGE_BASE_URL',  'https://bitcoincasinolists.com/images') . '/' . $newImageLink;
        $this->save();
    }
}
