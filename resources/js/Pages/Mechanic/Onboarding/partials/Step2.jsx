import Card from "@/Components/Card";
import React from "react";

const Step2 = ({ onNext, onPrevious }) => {
    const handleSubmit = () => {};

    return (
        <>
            <Card className="w-full">
                <form className="p-4 sm:p-6 lg:p-8" onSubmit={handleSubmit}>
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                            Professional Information
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            Please provide your professional details for better
                            experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                        <div className="mb-4 sm:mb-5">
                            <div></div>
                        </div>
                    </div>
                </form>
            </Card>
        </>
    );
};

export default Step2;
