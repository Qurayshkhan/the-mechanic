import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import {
    FileText,
    IdCard,
    Building2,
    AlertCircle,
    CheckCircle2,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import FileUploadSection from "@/Components/FileUploadSection";

const Step4 = ({ onNext, onPrevious }) => {
    const user = useAuth();
    const { errors: pageErrors, flash } = usePage().props;

    const [licenseNumber, setLicenseNumber] = useState(
        user?.mechanic_document?.license_number || ""
    );
    const [cnicFront, setCnicFront] = useState([]);
    const [cnicBack, setCnicBack] = useState([]);
    const [workshopPhoto1, setWorkshopPhoto1] = useState([]);
    const [workshopPhoto2, setWorkshopPhoto2] = useState([]);
    const [workshopPhoto3, setWorkshopPhoto3] = useState([]);
    const [workshopPhoto4, setWorkshopPhoto4] = useState([]);

    const [fieldErrors, setFieldErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if (user?.mechanic_document) {
            const doc = user.mechanic_document;
        }
    }, [user]);

    const validateForm = () => {
        const errors = {};

        if (!cnicFront || cnicFront.length === 0) {
            errors.cnic_front = "CNIC front photo is required";
        }

        if (!cnicBack || cnicBack.length === 0) {
            errors.cnic_back = "CNIC back photo is required";
        }

        if (!workshopPhoto1 || workshopPhoto1.length === 0) {
            errors.workshop_photo_1 =
                "Workshop photo 1 (Inside the shop) is required";
        }

        if (!workshopPhoto2 || workshopPhoto2.length === 0) {
            errors.workshop_photo_2 =
                "Workshop photo 2 (Outside - front view) is required";
        }

        if (!workshopPhoto3 || workshopPhoto3.length === 0) {
            errors.workshop_photo_3 =
                "Workshop photo 3 (Road - right side) is required";
        }

        if (!workshopPhoto4 || workshopPhoto4.length === 0) {
            errors.workshop_photo_4 =
                "Workshop photo 4 (Road - left side) is required";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getFileFromFileList = (fileList) => {
        if (!fileList || fileList.length === 0) return null;
        const file = fileList[0];

        return file.file || file;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitError("");

        if (!validateForm()) {
            setSubmitError(
                "Please upload all required documents before submitting."
            );
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setProcessing(true);

        const formData = new FormData();

        if (licenseNumber) {
            formData.append("license_number", licenseNumber);
        }

        const cnicFrontFile = getFileFromFileList(cnicFront);
        const cnicBackFile = getFileFromFileList(cnicBack);
        const workshop1File = getFileFromFileList(workshopPhoto1);
        const workshop2File = getFileFromFileList(workshopPhoto2);
        const workshop3File = getFileFromFileList(workshopPhoto3);
        const workshop4File = getFileFromFileList(workshopPhoto4);

        if (cnicFrontFile) formData.append("cnic_front", cnicFrontFile);
        if (cnicBackFile) formData.append("cnic_back", cnicBackFile);
        if (workshop1File) formData.append("workshop_photo_1", workshop1File);
        if (workshop2File) formData.append("workshop_photo_2", workshop2File);
        if (workshop3File) formData.append("workshop_photo_3", workshop3File);
        if (workshop4File) formData.append("workshop_photo_4", workshop4File);

        router.post(route("mechanic.storeDocuments"), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setProcessing(false);
                if (onNext) {
                    onNext();
                }
            },
            onError: (errors) => {
                setProcessing(false);
                if (errors.message) {
                    setSubmitError(errors.message);
                }

                const mappedErrors = {};
                Object.keys(errors).forEach((key) => {
                    if (key.includes("cnic_front"))
                        mappedErrors.cnic_front = errors[key];
                    if (key.includes("cnic_back"))
                        mappedErrors.cnic_back = errors[key];
                    if (key.includes("workshop_photo_1"))
                        mappedErrors.workshop_photo_1 = errors[key];
                    if (key.includes("workshop_photo_2"))
                        mappedErrors.workshop_photo_2 = errors[key];
                    if (key.includes("workshop_photo_3"))
                        mappedErrors.workshop_photo_3 = errors[key];
                    if (key.includes("workshop_photo_4"))
                        mappedErrors.workshop_photo_4 = errors[key];
                });
                setFieldErrors(mappedErrors);
                window.scrollTo({ top: 0, behavior: "smooth" });
            },
        });
    };

    return (
        <div className="transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <p className="text-sm text-green-800">
                            {flash.success}
                        </p>
                    </div>
                )}

                {(submitError || pageErrors?.message) && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-sm text-red-800">
                            {submitError || pageErrors?.message}
                        </p>
                    </div>
                )}

                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
                        <h2 className="md:text-3xl font-bold text-gray-800">
                            Documents & Verification
                        </h2>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Upload your identification and required documents to
                        verify your profile and enable shop activation. All
                        marked fields are required.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <InputLabel value="License Number (Optional)" />
                        </div>
                        <TextInput
                            type="text"
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                            placeholder="Enter shop license number (optional)"
                            className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            If you have a business license, please enter it here
                        </p>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <IdCard className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-800">
                                Identity Documents
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <FileUploadSection
                                label="CNIC Front Photo"
                                helpText="Upload the front side of your CNIC"
                                files={cnicFront}
                                setFiles={setCnicFront}
                                fieldName="cnic_front"
                                required={true}
                                icon={IdCard}
                            />
                            <FileUploadSection
                                label="CNIC Back Photo"
                                helpText="Upload the back side of your CNIC"
                                files={cnicBack}
                                setFiles={setCnicBack}
                                fieldName="cnic_back"
                                required={true}
                                icon={IdCard}
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-800">
                                Workshop Photos
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <FileUploadSection
                                label="Workshop Photo 1"
                                helpText="Inside the shop"
                                files={workshopPhoto1}
                                setFiles={setWorkshopPhoto1}
                                fieldName="workshop_photo_1"
                                required={true}
                                icon={Building2}
                            />
                            <FileUploadSection
                                label="Workshop Photo 2"
                                helpText="Outside the shop (front view)"
                                files={workshopPhoto2}
                                setFiles={setWorkshopPhoto2}
                                fieldName="workshop_photo_2"
                                required={true}
                                icon={Building2}
                            />
                            <FileUploadSection
                                label="Workshop Photo 3"
                                helpText="Road (right side)"
                                files={workshopPhoto3}
                                setFiles={setWorkshopPhoto3}
                                fieldName="workshop_photo_3"
                                required={true}
                                icon={Building2}
                            />
                            <FileUploadSection
                                label="Workshop Photo 4"
                                helpText="Road (left side)"
                                files={workshopPhoto4}
                                setFiles={setWorkshopPhoto4}
                                fieldName="workshop_photo_4"
                                required={true}
                                icon={Building2}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center pt-6 border-t border-gray-200">
                        <div className="w-full sm:w-auto">
                            {onPrevious && (
                                <SecondaryButton
                                    type="button"
                                    onClick={onPrevious}
                                    disabled={processing}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous
                                </SecondaryButton>
                            )}
                        </div>
                        <div className="w-full sm:w-auto">
                            <PrimaryButton
                                type="submit"
                                processing={processing}
                                className="w-full sm:w-auto flex items-center justify-center gap-2"
                            >
                                Submit Documents
                                <ArrowRight className="w-4 h-4" />
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Step4;
