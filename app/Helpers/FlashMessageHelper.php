<?php

// use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\Session;

if(!function_exists('flashMessage')) {
    function flashMessage($type = 'success', $message): void 
    {
        Session::flash('message', $message);
        Session::flash('type', $type);
    }
}