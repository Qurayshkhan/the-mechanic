import React from "react";
import InputError from "@/Components/InputError";
import { Dropzone, FileMosaic } from "@files-ui/react";
import { Camera, Info } from "lucide-react";
import InputLabel from "@/Components/InputLabel";

const FileUploadSection = ({
    label,
    helpText,
    files,
    setFiles,
    fieldName,
    required = false,
    icon: Icon = Camera,
    fieldErrors = {}, // ✅ safely default to empty
    pageErrors = {}, // ✅ safely default to empty
    setFieldErrors = () => {}, // ✅ prevent undefined errors
    setSubmitError = () => {}, // ✅ prevent undefined errors
}) => {
    const error = fieldErrors[fieldName] || pageErrors?.[fieldName];

    const handleFileChange = (setter, fieldName) => (incomingFiles) => {
        setter(incomingFiles);
        if (incomingFiles && incomingFiles.length > 0) {
            setFieldErrors((prev) => ({ ...prev, [fieldName]: null }));
            setSubmitError("");
        }
    };

    const handleRemoveFile = (setter, fieldName) => (id) => {
        setter((prev) => prev.filter((x) => x.id !== id));
    };

    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <InputLabel value={label} />
                {required && <span className="text-red-500">*</span>}
            </div>

            {helpText && (
                <p className="text-xs sm:text-sm text-gray-500 mb-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {helpText}
                </p>
            )}

            <Dropzone
                onChange={handleFileChange(setFiles, fieldName)}
                value={files}
                accept="image/*"
                maxFileSize={2 * 1024 * 1024}
                maxFiles={1}
                label="Drop your image here or click to browse"
                className={`${error ? "border-red-300" : "border-gray-300"}`}
            >
                {files.map((file) => (
                    <FileMosaic
                        key={file.id}
                        {...file}
                        onDelete={handleRemoveFile(setFiles, fieldName)}
                        info
                        preview
                    />
                ))}
            </Dropzone>

            {error && <InputError message={error} className="mt-1" />}
        </div>
    );
};

export default FileUploadSection;
