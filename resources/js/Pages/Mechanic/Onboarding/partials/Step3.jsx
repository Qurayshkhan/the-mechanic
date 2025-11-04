import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import { router } from "@inertiajs/react";

const Step3 = ({
    services = [],
    mechanicServices = [],
    onPrevious,
    onNext,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        description: "",
        charges: "",
        type: "onsite",
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [stepError, setStepError] = useState("");

    useEffect(() => {
        if (editingService) {
            setFormData({
                id: editingService.id,
                name: editingService.name || "",
                description: editingService.description || "",
                charges: editingService.charges || "",
                type: editingService.type || "onsite",
            });
        } else {
            setFormData({
                id: null,
                name: "",
                description: "",
                charges: "",
                type: "onsite",
            });
        }
    }, [editingService]);

    const handleSelectTemplateService = (service) => {
        setFormData({
            id: null,
            name: service.name || "",
            description: service.description || "",
            charges: service.charges || "",
            type: service.type || "onsite",
        });
        setEditingService(null);
        setShowModal(true);
        setErrors({});
    };

    const handleAddCustomService = () => {
        setFormData({
            id: null,
            name: "",
            description: "",
            charges: "",
            type: "onsite",
        });
        setEditingService(null);
        setShowModal(true);
        setErrors({});
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setShowModal(true);
        setErrors({});
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingService(null);
        setFormData({
            id: null,
            name: "",
            description: "",
            charges: "",
            type: "onsite",
        });
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Service name is required";
        }
        if (!formData.charges || parseFloat(formData.charges) <= 0) {
            newErrors.charges = "Valid charges amount is required";
        }
        if (!formData.type) {
            newErrors.type = "Service type is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveService = () => {
        if (!validateForm()) {
            return;
        }

        setProcessing(true);
        router.post(
            route("mechanic.storeMechanicService"),
            {
                id: formData.id,
                name: formData.name,
                description: formData.description,
                charges: formData.charges,
                type: formData.type,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    handleCloseModal();
                    setProcessing(false);
                    setStepError(""); // Clear step error when service is added
                },
                onError: (errors) => {
                    setErrors(errors);
                    setProcessing(false);
                },
            }
        );
    };

    const handleDeleteService = (id) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            router.delete(route("mechanic.deleteMechanicService", id), {
                preserveScroll: true,
                onSuccess: () => {
                    setStepError(""); // Clear step error after deletion
                },
            });
        }
    };

    const handleSkip = () => {
        handleAddCustomService();
    };

    const handleNextStep = () => {
        if (!mechanicServices || mechanicServices.length === 0) {
            setStepError("Please add at least one service before proceeding.");
            return;
        }

        setStepError("");
        setProcessing(true);
        router.put(
            route("mechanic.updateRegistrationForm"),
            {
                step_position: 3,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (onNext) {
                        onNext();
                    }
                    setProcessing(false);
                },
                onError: (errors) => {
                    if (errors.message) {
                        setStepError(errors.message);
                    }
                    setProcessing(false);
                },
            }
        );
    };

    return (
        <div className="transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        Services
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        Please select default services or create your own.
                    </p>
                </div>

                {/* Template Services Section */}
                {services && services.length > 0 && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Available Services
                            </h3>
                            <SecondaryButton
                                onClick={handleSkip}
                                className="text-sm"
                            >
                                Skip Templates
                            </SecondaryButton>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 cursor-pointer hover:border-blue-500"
                                    onClick={() =>
                                        handleSelectTemplateService(service)
                                    }
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-800">
                                            {service.name}
                                        </h3>
                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                            {service.type || "onsite"}
                                        </span>
                                    </div>
                                    {service.description && (
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                            {service.description}
                                        </p>
                                    )}
                                    <p className="text-gray-600 text-sm">
                                        Charges:{" "}
                                        <span className="font-medium text-gray-800">
                                            Rs. {service.charges}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            My Services
                        </h3>
                        <PrimaryButton
                            onClick={handleAddCustomService}
                            className="flex items-center gap-2"
                        >
                            <Plus size={18} />
                            Add Custom Service
                        </PrimaryButton>
                    </div>

                    {mechanicServices && mechanicServices.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mechanicServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 relative"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-800">
                                            {service.name}
                                        </h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    handleEditService(service)
                                                }
                                                className="text-blue-500 hover:text-blue-600"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteService(
                                                        service.id
                                                    )
                                                }
                                                className="text-red-500 hover:text-red-600"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    {service.description && (
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                            {service.description}
                                        </p>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-600 text-sm">
                                            Charges:{" "}
                                            <span className="font-medium text-gray-800">
                                                Rs. {service.charges}
                                            </span>
                                        </p>
                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                            {service.type || "onsite"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>
                                No services added yet. Add your first service!
                            </p>
                        </div>
                    )}
                </div>

                {stepError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{stepError}</p>
                    </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <SecondaryButton onClick={onPrevious} disabled={processing}>
                        Previous
                    </SecondaryButton>
                    <PrimaryButton
                        onClick={handleNextStep}
                        processing={processing}
                    >
                        {processing ? "Saving..." : "Next"}
                    </PrimaryButton>
                </div>
            </div>

            <Modal show={showModal} onClose={handleCloseModal} maxWidth="2xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            {editingService ? "Edit Service" : "Add Service"}
                        </h2>
                        <button
                            onClick={handleCloseModal}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Service Name *" />
                            <TextInput
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full"
                                placeholder="Enter service name"
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                placeholder="Enter service description (optional)"
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <InputLabel
                                    htmlFor="charges"
                                    value="Charges (Rs.) *"
                                />
                                <TextInput
                                    id="charges"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.charges}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            charges: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full"
                                    placeholder="0.00"
                                />
                                <InputError
                                    message={errors.charges}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="type"
                                    value="Service Type *"
                                />
                                <select
                                    id="type"
                                    value={formData.type}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            type: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                                >
                                    <option value="onsite">Onsite</option>
                                    <option value="home">Home</option>
                                </select>
                                <InputError
                                    message={errors.type}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <SecondaryButton
                            onClick={handleCloseModal}
                            disabled={processing}
                        >
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton
                            onClick={handleSaveService}
                            processing={processing}
                        >
                            {processing
                                ? "Saving..."
                                : editingService
                                ? "Update"
                                : "Save"}
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Step3;
