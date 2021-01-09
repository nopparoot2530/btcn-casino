<?php

namespace App\Http\Controllers;

use App\Models\Casino;
use App\Models\KeyFeatures;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class CasinoController extends Controller
{
    public function getAllCasino()
    {
        $casinos = Casino::select('name', 'id', 'rank', 'rating', 'bonus', 'image_link')->with(array('KeyFeatures' => function ($query) {
            $query->select('casino_id', 'name');
        }))->get();
        return response()->json($casinos);
    }

    public function getCasino($id)
    {
        $casino = Casino::select('name', 'id', 'rank', 'rating', 'bonus')->with(array('KeyFeatures' => function ($query) {
            $query->select('casino_id', 'name');
        }))->find($id);
        if (!isset($casino)) {
            return response()->json(['message' => 'not found'], 404);
        }
        return $casino;
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:casino,name|string',
            'rank' => 'required|unique:casino,rank|integer',
            'rating' => 'required|integer|max:5|min:1',
            'key_features' => 'required|array',
            'bonus' => 'required|string',
            'link' => 'required|string',
        ]);

        $casino = Casino::create([
            'name' => $request->name,
            'rank' => $request->rank,
            'rating' => $request->rating,
            'bonus' => $request->bonus,
            'link' => $request->link
        ]);

        $casino->save();
        $jsonKeyFeatures = $request->key_features;

        foreach ($jsonKeyFeatures as $keyFeature) {

            $newKeyFeature = KeyFeatures::create([
                'name' => $keyFeature['name'],
                'casino_id' => $casino->id
            ]);

            $newKeyFeature->save();
        }

        $casino->key_features = KeyFeatures::select('name', 'id')->where('casino_id', $casino->id)->get();
        return $casino;
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|unique:casino,name,' . $id . '|string',
            'rank' => 'required|unique:casino,rank,' . $id . '|integer',
            'rating' => 'required|integer|max:5|min:1',
            'key_features' => 'required|array',
            'bonus' => 'required|string',
            'link' => 'required|string',
        ]);

        $casino = Casino::find($id);
        $casino->name = $request->name;
        $casino->rank = $request->rank;
        $casino->rating = $request->rating;
        $casino->bonus = $request->bonus;
        $casino->link = $request->link;
        $casino->save();

        $jsonKeyFeatures = $request->key_features;

        foreach ($jsonKeyFeatures as $keyFeature) {
            $databaseKeyFeature = KeyFeatures::find($keyFeature['id']);
            $databaseKeyFeature->name = $keyFeature['name'];
        }

        $casino->key_features = $jsonKeyFeatures;
        return $casino;
    }

    public function uploadImage(Request $request, $id)
    {

        $casino = Casino::find($id);
        if (!isset($casino)) {
            return response()->json(["message" => "casino with the specified id not found"], 404);
        }

        if ($request->hasFile('casino_image')) {
            $original_filename = $request->file('casino_image')->getClientOriginalName();
            $original_filename_arr = explode('.', $original_filename);
            $file_ext = end($original_filename_arr);
            $destination_path = env('IMAGE_STORAGE_PATH', './images');
            $image = 'U-' . time() . '.' . $file_ext;

            if ($request->file('casino_image')->move($destination_path, $image)) {
                $newImageLink = env('IMAGE_BASE_URL', 'https://bitcoincasinolists.com/images') . '/' . $image;
                $casino->replaceCurrentImage($image);
                $casino->save();
                return response()->json(['image_name' => $newImageLink]);
            } else {
                return response()->json(['message' => 'image upload failed']);
            }
        } else {
            return response()->json(['error' => 'file not found'], 404);
        }
    }

    public function delete($id)
    {
        Casino::destroy($id);
        return response()->json(['message' => 'successfully deleted']);
    }
}
