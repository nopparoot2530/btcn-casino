<?php

namespace App\Http\Controllers;

use App\Models\Casino;
use App\Models\KeyFeatures;
use Illuminate\Http\Request;

class CasinoController extends Controller
{
    public function getAllCasino()
    {
        $casinos = Casino::all();
        return response()->json([$casinos]);
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
}
