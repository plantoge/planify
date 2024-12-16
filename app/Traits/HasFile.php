<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

Trait Hasfile
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
}