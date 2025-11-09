import React from "react";
import { Check } from "lucide-react";

const StepIndicator = ({ currentStep, totalSteps, stepLabels }) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="relative">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 hidden sm:block">
                    <div
                        className="h-full bg-gray-600 transition-all duration-500 ease-in-out"
                        style={{
                            width: `${
                                ((currentStep - 1) / (totalSteps - 1)) * 100
                            }%`,
                        }}
                    />
                </div>
                <div className="relative flex justify-between items-start">
                    {steps.map((step, index) => {
                        const isCompleted = step < currentStep;
                        const isActive = step === currentStep;
                        const isUpcoming = step > currentStep;

                        return (
                            <div
                                key={step}
                                className="flex flex-col items-center flex-1 relative z-10"
                            >
                                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 mb-2 sm:mb-3">
                                    <div
                                        className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
                                            isCompleted
                                                ? "bg-gray-600 border-gray-600"
                                                : isActive
                                                ? "bg-gray-600 border-gray-600 ring-4 ring-blue-100"
                                                : "bg-white border-gray-300"
                                        }`}
                                    >
                                        {isCompleted ? (
                                            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        ) : (
                                            <span
                                                className={`text-sm sm:text-base font-semibold ${
                                                    isActive
                                                        ? "text-white"
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                {step}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="hidden sm:block text-center px-2">
                                    <span
                                        className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                                            isCompleted || isActive
                                                ? "text-gray-600"
                                                : "text-black-400"
                                        }`}
                                    >
                                        {stepLabels && stepLabels[index]
                                            ? stepLabels[index]
                                            : `Step ${step}`}
                                    </span>
                                </div>

                                <div className="sm:hidden absolute -top-1 -right-1 w-3 h-3 bg-gray-600 rounded-full opacity-0 transition-opacity duration-300">
                                    {isActive && (
                                        <div className="w-full h-full bg-gray-600 rounded-full animate-pulse" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="sm:hidden mt-4 text-center">
                    <span className="text-sm font-medium text-gray-600">
                        {stepLabels && stepLabels[currentStep - 1]
                            ? stepLabels[currentStep - 1]
                            : `Step ${currentStep} of ${totalSteps}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StepIndicator;
