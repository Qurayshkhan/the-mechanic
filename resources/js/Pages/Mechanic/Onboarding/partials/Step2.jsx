import Card from "@/Components/Card";
import InputLabel from "@/Components/InputLabel";
import Select from "@/Components/Select";
import { experience } from "@/Data/Experience";
import { router } from "@inertiajs/react";
import { Bike, Bus, Car, Motorbike, Truck, Wrench } from "lucide-react";
import React from "react";

const Step2 = ({ onNext, onPrevious, mechanicTypes, skills }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const getIcons = (name) => {
        switch (name) {
            case "Car":
                return <Car className="w-5 h-5" />;
            case "Bike":
                return <Motorbike className="w-5 h-5" />;
            case "Bus":
                return <Bus className="w-5 h-5" />;
            case "Truck":
                return <Truck className="w-5 h-5" />;
            default:
                return <Wrench className="w-5 h-5" />;
        }
    };

    const handleSelectMechanicType = (mechanicType) => {
        router.get(
            route("mechanic.registrationForm", {
                mechanic_type_id: mechanicType.id,
            })
        );
    };

    return (
        <Card className="w-full">
            <form className="p-4 sm:p-6 lg:p-8" onSubmit={handleSubmit}>
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        Professional Information
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        Please provide your professional details for a better
                        experience
                    </p>
                </div>

                <div className="mb-8">
                    <InputLabel
                        value="Mechanic Type"
                        className="mb-3 block text-gray-700 text-sm font-semibold"
                    />
                    <div className="flex flex-wrap gap-3">
                        {mechanicTypes?.map((item) => (
                            <label
                                key={item.id}
                                className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-400"
                            >
                                <input
                                    type="radio"
                                    name="mechanic_type"
                                    value={item.id}
                                    className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                                    onChange={() =>
                                        handleSelectMechanicType(item)
                                    }
                                />
                                {getIcons(item.name)}
                                <span className="text-gray-700 font-medium">
                                    {item.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <InputLabel
                        value="How much experience do you have?"
                        className="mb-3 block text-gray-700 text-sm font-semibold"
                    />
                    <Select>
                        <option value="">Select Experience</option>
                        {experience.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </Select>
                </div>

                {skills && skills.length > 0 && (
                    <div className="mb-6">
                        <InputLabel
                            value="Skills"
                            className="mb-3 block text-gray-700 text-sm font-semibold"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="flex items-center gap-2 border rounded-lg p-3 hover:bg-gray-50 transition-all"
                                >
                                    <input
                                        type="checkbox"
                                        id={`skill-${skill.id}`}
                                        name="skills[]"
                                        value={skill.id}
                                        className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                                    />
                                    <label
                                        htmlFor={`skill-${skill.id}`}
                                        className="text-gray-700 font-medium cursor-pointer"
                                    >
                                        {skill.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        onClick={onNext}
                        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
                    >
                        Next
                    </button>
                </div> */}
            </form>
        </Card>
    );
};

export default Step2;
