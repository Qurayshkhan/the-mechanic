import Card from "@/Components/Card";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import useAuth from "@/hooks/useAuth";
import { StepOneSchema } from "@/Schema/mechanics/OnboardingFormSchema";
import { router } from "@inertiajs/react";
import { useFormik } from "formik";
import { Calendar, Mail, Phone, User, ArrowRight, IdCard } from "lucide-react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Step1 = ({ onNext, onPrevious, isFirstStep }) => {
    const user = useAuth();

    const initialValues = {
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone_no: user?.phone_no ?? "",
        date_of_birth: user?.date_of_birth
            ? new Date(user.date_of_birth)
            : null,
        cnic: user?.cnic ?? "",
        // address: user?.address ?? "",
        // city: user?.city ?? "",
        // area: user?.area ?? "",
        // latitude: user?.latitude ?? "",
        // longitude: user?.longitude ?? "",
        step_position: 1,
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
    } = useFormik({
        initialValues,
        validationSchema: StepOneSchema,
        enableReinitialize: true,
        onSubmit: (value) => {
            const formattedValue = {
                ...value,
                date_of_birth: value.date_of_birth
                    ? value.date_of_birth.toISOString().split("T")[0]
                    : "",
            };
            router.put(
                route("mechanic.updateRegistrationForm"),
                formattedValue
            );
            if (onNext) {
                onNext();
            }
        },
    });

    return (
        <Card className="w-full">
            <form className="p-4 sm:p-6 lg:p-8" onSubmit={handleSubmit}>
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        Personal Information
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        Please provide your personal details to continue
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                    <div className="mb-4 sm:mb-5">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <InputLabel htmlFor="name" value="Name" />
                        </div>
                        <TextInput
                            name="name"
                            id="name"
                            onChange={handleChange}
                            value={values.name}
                            placeholder="Enter your name"
                            onBlur={handleBlur}
                            className="w-full mt-1"
                        />
                        {errors.name && touched.name && (
                            <InputError message={errors.name} />
                        )}
                    </div>

                    <div className="mb-4 sm:mb-5">
                        <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <InputLabel htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            name="email"
                            id="email"
                            type="email"
                            defaultValue={values.email}
                            placeholder="Enter your email address"
                            onBlur={handleBlur}
                            className="w-full mt-1 bg-gray-100"
                            readOnly
                        />
                        {errors.email && touched.email && (
                            <InputError message={errors.email} />
                        )}
                    </div>

                    <div className="mb-4 sm:mb-5">
                        <div className="flex items-center gap-2 mb-2">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <InputLabel htmlFor="phone_no" value="Phone" />
                        </div>
                        <TextInput
                            name="phone_no"
                            id="phone_no"
                            type="tel"
                            onChange={handleChange}
                            value={values.phone_no}
                            placeholder="Enter your phone number"
                            onBlur={handleBlur}
                            className="w-full mt-1"
                        />
                        {errors.phone_no && touched.phone_no && (
                            <InputError message={errors.phone_no} />
                        )}
                    </div>

                    <div className="mb-4 sm:mb-5">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <InputLabel
                                htmlFor="date_of_birth"
                                value="Date of Birth"
                            />
                        </div>
                        <div className="w-full mt-1">
                            <DatePicker
                                id="date_of_birth"
                                name="date_of_birth"
                                selected={
                                    values.date_of_birth
                                        ? new Date(values.date_of_birth)
                                        : null
                                }
                                onChange={(date) =>
                                    setFieldValue("date_of_birth", date)
                                }
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select your date of birth"
                                className="w-full border border-gray-300 rounded-md p-2 sm:p-2.5 focus:border-gray-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                popperPlacement="bottom-start"
                                calendarClassName="shadow-lg"
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={new Date()}
                            />
                            {errors.date_of_birth && touched.date_of_birth && (
                                <InputError message={errors.date_of_birth} />
                            )}
                        </div>
                    </div>

                    <div className="mb-4 sm:mb-5 md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                            <IdCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            <InputLabel htmlFor="cnic" value="Cnic" />
                        </div>
                        <TextInput
                            name="cnic"
                            id="cnic"
                            onChange={handleChange}
                            value={values.cnic}
                            placeholder="Enter your cnic"
                            onBlur={handleBlur}
                            className="w-full mt-1"
                        />
                        {errors.cnic && touched.cnic && (
                            <InputError message={errors.cnic} />
                        )}
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
                    <PrimaryButton
                        type="submit"
                        processing={isSubmitting}
                        className="w-full sm:w-auto px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            "Processing..."
                        ) : (
                            <>
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </PrimaryButton>
                </div>
            </form>
        </Card>
    );
};

export default Step1;
