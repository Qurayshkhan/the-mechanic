<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait FileTrait
{

    public function saveFile(UploadedFile $file, string $directory, bool $useOriginalName = false, ?string $disk = 'public'): ?string
    {
        try {
            $disk = $disk ?? config('filesystems.default');


            $directory = trim($directory, '/');

            $fileName = $useOriginalName
                ? $file->getClientOriginalName()
                : Str::uuid() . '.' . $file->getClientOriginalExtension();

            $path = $file->storeAs($directory, $fileName, $disk);

            return $path;
        } catch (\Exception $e) {
            \Log::error('File upload failed: ' . $e->getMessage());
            return null;
        }
    }


    public function deleteFile(?string $path, ?string $disk = null): bool
    {
        if (!$path)
            return false;

        $disk = $disk ?? config('filesystems.default');

        try {
            if (Storage::disk($disk)->exists($path)) {
                return Storage::disk($disk)->delete($path);
            }
        } catch (\Exception $e) {
            \Log::error('File deletion failed: ' . $e->getMessage());
        }

        return false;
    }

    public function getFileUrl(?string $path, ?string $disk = null): ?string
    {
        if (!$path)
            return null;

        $disk = $disk ?? config('filesystems.default');

        try {
            return Storage::disk($disk)->url($path);
        } catch (\Exception $e) {
            \Log::error('Error generating file URL: ' . $e->getMessage());
            return null;
        }
    }
}
