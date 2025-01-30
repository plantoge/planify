<?php

namespace App\Http\Requests;

use App\Enums\CardPriority;
use App\Enums\CardStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'deadline' => ['required', 'date'],
            'status' => ['required', New Enum(CardStatus::class)],
            'priority' => ['required', New Enum(CardPriority::class)],
        ];
    }

    public function attributes()
    {
        // return [
        //     'title' => 'title',
        //     'description' => 'description',
        //     'deadline' => 'deadline',
        //     'status' => 'status',
        //     'priority' => 'priority',
        // ];
    }
}
