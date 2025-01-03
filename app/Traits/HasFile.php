<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

Trait HasFile
{
    public function uploadFile(Request $request, string $column, string $folder)
    {
        return $request->hasFile($column) ? $request->file($column)->store($folder) : null;
    }

    public function updateFile(Request $request, Model $model, string $column, string $folder)
    {
        if($request->hasFile($column)){
            if($model->{$column}){
                Storage::delete($model->{$column});
            }

            $thumbnail = $request->file($column)->store($folder);
        }else{
            $thumbnail = $model->$column;
        }

        return $thumbnail;
    }

    public function deleteFile(Model $model, string $column)
    {
        if($model->{$column}){
            Storage::delete($model->{$column});
        }
    }
}