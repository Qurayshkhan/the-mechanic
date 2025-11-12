<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OnboardDocumentRequest extends FormRequest
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
            'cnic_front' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'cnic_back' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'workshop_photo_1' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'workshop_photo_2' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'workshop_photo_3' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'workshop_photo_4' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'license_number' => 'nullable|string|max:255',
        ];
    }
}
