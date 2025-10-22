<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class UpdateRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()?->can('edit_role');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $roleId = $this->route('role') ?? $this->route('role');
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'name')->ignore($roleId),
            ],
            'guard_name' => 'required|string|max:255',
        ];
    }
}
