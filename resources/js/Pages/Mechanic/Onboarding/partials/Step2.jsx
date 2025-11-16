import Card from "@/Components/Card";
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import Select from "@/Components/Select";
import { experience } from "@/Data/Experience";
import useAuth from "@/hooks/useAuth";
import { router } from "@inertiajs/react";
import {
    Bus,
    Car,
    Motorbike,
    Truck,
    Wrench,
    Building,
    Home,
    MapPin,
} from "lucide-react";
import React, { useMemo } from "react";
import { useFormik } from "formik";
import { StepTwoSchema } from "@/Schema/mechanics/OnboardingFormSchema";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import Autocomplete from "@/Components/AutoComplete";
const Step2 = ({ onNext, onPrevious, mechanicTypes, skills, filters }) => {
    const user = useAuth();

    const userSkillIds = Array.isArray(user?.skills)
        ? user.skills.map((s) => (typeof s === "object" ? s.id : s))
        : [];

    const initialValues = {
        mechanic_type_id: Number(
            user?.mechanic_information?.mechanic_type_id ||
                filters?.mechanic_type_id ||
                1
        ),
        years_of_experience:
            user?.mechanic_information?.years_of_experience ?? "",
        skills: userSkillIds,
        work_shop_name: user?.mechanic_information?.work_shop_name ?? "",
        work_shop_address: user?.mechanic_information?.work_shop_address ?? "",
        city: user?.mechanic_information?.city ?? "",
        area: user?.mechanic_information?.area ?? "",
        latitude: user?.mechanic_information?.latitude || "",
        longitude: user?.mechanic_information?.longitude || "",
        step_position: 2,
    };

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        handleBlur,
        errors,
        touched,
    } = useFormik({
        initialValues,
        validationSchema: StepTwoSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            router.put(route("mechanic.updateRegistrationForm"), values);
            if (onNext) onNext();
        },
    });

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
        if (values.mechanic_type_id === mechanicType.id) return;
        setFieldValue("mechanic_type_id", mechanicType.id);
        setFieldValue("skills", []);
    };

    const handleSkillChange = (e) => {
        const skillId = Number(e.target.value);
        const updatedSkills = e.target.checked
            ? [...values.skills, skillId]
            : values.skills.filter((id) => id !== skillId);
        setFieldValue("skills", updatedSkills);
    };

    const filteredSkills = useMemo(() => {
        return skills?.filter(
            (skill) => skill.mechanic_type_id === values.mechanic_type_id
        );
    }, [skills, values.mechanic_type_id]);

    const handleOnPlacesChange = (data) => {
        setFieldValue("work_shop_address", data?.address);
        setFieldValue("latitude", data?.latitude);
        setFieldValue("longitude", data?.longitude);
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
                        experience.
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
                                className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-all duration-200 ${
                                    values.mechanic_type_id === item.id
                                        ? "bg-gray-100 border-gray-500"
                                        : "hover:bg-gray-50 hover:border-gray-400"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="mechanic_type_id"
                                    value={item.id}
                                    checked={
                                        values.mechanic_type_id === item.id
                                    }
                                    onChange={() =>
                                        handleSelectMechanicType(item)
                                    }
                                    className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                                />
                                {getIcons(item.name)}
                                <span className="text-gray-700 font-medium">
                                    {item.name}
                                </span>
                            </label>
                        ))}
                    </div>
                    {touched.mechanic_type_id && errors.mechanic_type_id && (
                        <InputError message={errors.mechanic_type_id} />
                    )}
                </div>

                <div className="mb-8">
                    <InputLabel
                        value="How much experience do you have?"
                        className="mb-3 block text-gray-700 text-sm font-semibold"
                    />
                    <Select
                        name="years_of_experience"
                        value={values.years_of_experience}
                        onChange={handleChange}
                    >
                        <option value="">Select Experience</option>
                        {experience.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </Select>
                    {touched.years_of_experience &&
                        errors.years_of_experience && (
                            <InputError message={errors.years_of_experience} />
                        )}
                </div>
                <div className="mb-5">
                    <InputLabel
                        value="Chose Skills"
                        className="mb-3 block text-gray-700 text-sm font-semibold"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredSkills.map((skill) => {
                            const isChecked = values.skills.includes(skill.id);
                            return (
                                <div
                                    key={skill.id}
                                    className="flex items-center gap-2 border rounded-lg p-3 hover:bg-gray-50 transition-all text-sm"
                                >
                                    <Checkbox
                                        id={`skill-${skill.id}`}
                                        name="skills"
                                        value={skill.id}
                                        checked={isChecked}
                                        onChange={handleSkillChange}
                                    />
                                    <label
                                        htmlFor={`skill-${skill.id}`}
                                        className="text-gray-700 font-medium cursor-pointer"
                                    >
                                        {skill.name}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    {errors.skills && touched.skills && (
                        <InputError message={errors.skills} />
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="mb-4 md:mb-5 md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                            <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <InputLabel
                                htmlFor="workshopName"
                                value="Workshop name"
                            />
                        </div>
                        <TextInput
                            name="work_shop_name"
                            id="workShopName"
                            onChange={handleChange}
                            value={values.work_shop_name}
                            placeholder="Enter your workshop name"
                            onBlur={handleBlur}
                            className="w-full mt-1"
                        />
                        {errors.work_shop_name && touched.work_shop_name && (
                            <InputError message={errors.work_shop_name} />
                        )}
                    </div>
                    <div className="mb-4 md:mb-5 md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <InputLabel
                                htmlFor="workshopAddress"
                                value="Workshop address"
                            />
                        </div>

                        <p className="mb-2 text-gray-600 text-sm sm:text-base">
                            Enter your workshop address. You can select from
                            suggestions while typing, click{" "}
                            <span className="font-semibold text-green-500">
                                "Use Current Location"
                            </span>{" "}
                            if you are at the workshop, or type it manually to
                            ensure the address is correct.
                        </p>

                        <Autocomplete
                            onBlur={handleBlur}
                            value={values.work_shop_address}
                            handleOnPlacesChange={handleOnPlacesChange}
                        />

                        {errors.work_shop_address &&
                            touched.work_shop_address && (
                                <InputError
                                    message={errors.work_shop_address}
                                />
                            )}
                    </div>

                    <div className="mb-4 sm:mb-5">
                        <div className="flex items-center gap-2 mb-2">
                            <Building className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <InputLabel htmlFor="city" value="City" />
                        </div>
                        <TextInput
                            name="city"
                            id="city"
                            onChange={handleChange}
                            value={values.city}
                            placeholder="Enter your city"
                            onBlur={handleBlur}
                            className="w-full mt-1"
                        />
                        {errors.city && touched.city && (
                            <InputError message={errors.city} />
                        )}
                    </div>
                    <div className="mb-4 sm:mb-5">
                        <div className="flex items-center gap-2 mb-2">
                            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <InputLabel htmlFor="area" value="Area" />
                        </div>
                        <TextInput
                            name="area"
                            id="area"
                            onChange={handleChange}
                            value={values.area}
                            placeholder="Enter your area"
                            onBlur={handleBlur}
                            className="w-full mt-1"
                        />
                        {errors.area && touched.area && (
                            <InputError message={errors.area} />
                        )}
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200 flex justify-between">
                    <SecondaryButton
                        type="button"
                        onClick={onPrevious}
                        className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Previous
                    </SecondaryButton>
                    <PrimaryButton
                        type="submit"
                        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
                    >
                        Next
                    </PrimaryButton>
                </div>
            </form>
        </Card>
    );
};

export default Step2;
