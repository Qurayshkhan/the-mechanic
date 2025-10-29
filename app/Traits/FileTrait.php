<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait FileTrait
{
    /**
     * Save any uploaded file (image, PDF, document, etc.)
     *
     * @param UploadedFile $file       The uploaded file instance
     * @param string $directory        Directory path (e.g. 'users/1' or 'invoices')
     * @param string|null $disk        Filesystem disk (default: config('filesystems.default'))
     * @param bool $useOriginalName    Whether to use the original file name or generate unique one
     * @return string|null             The stored file path or null on failure
     */
    public function saveFile(UploadedFile $file, string $directory, bool $useOriginalName = false, ?string $disk = null): ?string
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

    /**
     * Delete a file safely from storage.
     *
     * @param string|null $path
     * @param string|null $disk
     * @return bool
     */
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

    /**
     * Get full public URL for a stored file.
     *
     * @param string|null $path
     * @param string|null $disk
     * @return string|null
     */
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
