<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CasinoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('casino', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->integer('rank');
            $table->smallInteger('rating');
            $table->text('bonus');
            $table->string('link');
            $table->string('image_link');
            $table->timestamps();
        });

        Schema::create('key_features', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('casino_id');
            $table->timestamps();
            $table->foreign('casino_id')->references('id')->on('casino')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('casino');
        Schema::drop('key_features');
    }
}
