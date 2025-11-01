import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import Step1 from "./partials/Step1";
import StepIndicator from "./partials/StepIndicator";
import Step2 from "./partials/Step2";

const MechanicForm = () => {
    const user = useAuth();
    const { mechanic_information } = user;
    const [currentStep, setCurrentStep] = useState(
        mechanic_information ? mechanic_information.step_position : 1
    );

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
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
            <div className="w-full min-h-screen flex flex-col">
                <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
                    <StepIndicator
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        stepLabels={stepLabels}
                    />
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
                        {currentStep === 2 && <Step2 />}
                        {currentStep === 3 && (
                            <div className="transition-opacity duration-300 ease-in-out">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                        Step 3: Service Areas
                                    </h2>
                                    <p className="text-gray-600">
                                        This step will be implemented soon.
                                    </p>
                                </div>
                            </div>
                        )}
                        {currentStep === 4 && (
                            <div className="transition-opacity duration-300 ease-in-out">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                        Step 4: Documents & Verification
                                    </h2>
                                    <p className="text-gray-600">
                                        This step will be implemented soon.
                                    </p>
                                </div>
                            </div>
                        )}

                        {currentStep > 1 && currentStep < 5 && (
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
                                <button
                                    onClick={handlePrevious}
                                    className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 border border-gray-300"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                                >
                                    {currentStep === totalSteps
                                        ? "Submit"
                                        : "Next"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MechanicForm;
