import useAuth from "@/hooks/useAuth";
import useLang from "@/hooks/useLang";
import { Avatar } from "@files-ui/react";
import React, { useState } from "react";
import { router } from "@inertiajs/react";

const UploadAvatarForm = () => {
    const user = useAuth();
    const { t, locale } = useLang();
    const [imageSource, setImageSource] = useState(user?.avatar || null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(null);

    const handleChangeSource = async (selectedFile) => {
        if (!selectedFile) return;

        setImageSource(selectedFile);
        setIsUploading(true);

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        router.post(route("profile.uploadAvatar"), formData, {
            forceFormData: true,
            preserveScroll: true,
            onProgress: (event) => setProgress(event.percentage),
            onSuccess: () => {
                setIsUploading(false);
            },
            onError: (err) => {
                setIsUploading(false);
            },
        });
    };

    const handleRemove = () => {
        if (isUploading) return;
        setIsUploading(true);
        router.delete(route("profile.removeAvatar"), {
            preserveScroll: true,
            onSuccess: () => {
                setImageSource(null);
                setProgress(null);
                setIsUploading(false);
            },
            onError: () => {
                setIsUploading(false);
            },
        });
    };

    return (
        <section>
            <div className="flex flex-wrap gap-2 items-center justify-between">
                <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        {t("Profile Photo")}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {t(
                            "Upload a clear profile picture to personalize your account."
                        )}
                    </p>
                </div>
                {(imageSource || user?.avatar) && (
                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={isUploading}
                        className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50"
                    >
                        {t("Remove avatar")}
                    </button>
                )}
            </div>

            <div className="mt-4 flex items-center gap-6">
                <Avatar
                    src={imageSource}
                    alt="Avatar"
                    onChange={handleChangeSource}
                    accept=".png, .jpg, .jpeg, .webp"
                    smartImgFit={"orientation"}
                    isLoading={isUploading}
                    variant="circle"
                    emptyLabel={t("You can choose an image...")}
                    changeLabel={t("Click to upload.")}
                    style={{
                        width: 150,
                        height: 150,
                        objectFit: "cover",
                    }}
                    loadingLabel={t("Loading...")}
                />
                {progress && isUploading && (
                    <div className="text-sm text-gray-500 mt-2">
                        {t("Uploading...")} {progress}%
                    </div>
                )}
            </div>

            <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>{t("Recommended: square image, at least 300x300px.")}</p>
                <p>{t("Supported formats: PNG, JPG, JPEG, WEBP (max 2MB).")}</p>
            </div>
        </section>
    );
};

export default UploadAvatarForm;
