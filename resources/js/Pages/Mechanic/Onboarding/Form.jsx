import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import Step1 from "./partials/Step1";
import StepIndicator from "./partials/StepIndicator";
import Step2 from "./partials/Step2";
import PrimaryButton from "@/Components/PrimaryButton";
import { Power } from "lucide-react";
import { Head, router } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import Step3 from "./partials/Step3";
import Step4 from "./partials/Step4";

const MechanicForm = ({ mechanicTypes, skills, services, mechanicServices = [], filters }) => {
    const user = useAuth();
    const { mechanic_information } = user;
    const [currentStep, setCurrentStep] = useState(
        mechanic_information ? mechanic_information.step_position : 1
    );

    const [processing, setProcessing] = useState(false);

    const handleLogout = () => {
        setProcessing(true);
        router.post(
            route("logout"),
            {},
            {
                onFinish: () => setProcessing(false),
            }
        );
    };

    const totalSteps = 4;
    const stepLabels = [
        "Personal Information",
        "Professional Details",
        "Service Areas",
        "Documents & Verification",
    ];

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleStepSubmit = () => {
        handleNext();
    };

    return (
        <>
            <Head title="Mechanic Onboarding Form" />
            <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
                <div className="w-full min-h-screen flex flex-col">
                    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20 flex gap-2 items-center justify-center">
                        <StepIndicator
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            stepLabels={stepLabels}
                        />
                        <PrimaryButton
                            type="button"
                            className="mx-2 flex items-center gap-2"
                            onClick={handleLogout}
                            processing={processing}
                        >
                            <Power className="w-5 h-5" />
                        </PrimaryButton>
                    </div>

                    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                        <div className="w-full">
                            {currentStep === 1 && (
                                <div className="transition-opacity duration-300 ease-in-out">
                                    <Step1
                                        onNext={handleStepSubmit}
                                        onPrevious={handlePrevious}
                                        isFirstStep={true}
                                    />
                                </div>
                            )}
                            {currentStep === 2 && (
                                <Step2
                                    mechanicTypes={mechanicTypes}
                                    skills={skills}
                                    onNext={handleStepSubmit}
                                    onPrevious={handlePrevious}
                                    filters={filters}
                                />
                            )}
                            {currentStep === 3 && (
                                <Step3
                                    services={services}
                                    mechanicServices={mechanicServices}
                                    onNext={handleStepSubmit}
                                    onPrevious={handlePrevious}
                                />
                            )}
                            {currentStep === 4 && (
                                <Step4
                                    onNext={handleStepSubmit}
                                    onPrevious={handlePrevious}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MechanicForm;
