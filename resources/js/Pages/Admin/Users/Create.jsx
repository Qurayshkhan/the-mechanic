import React, { useState } from "react";
import BackButton from "@/Components/BackButton";
import Card from "@/Components/Card";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import TextInput from "@/Components/TextInput";
import MasterLayout from "@/Layouts/MasterLayout";
import { Head, useForm } from "@inertiajs/react";
import useLang from "@/hooks/useLang";

const Create = ({ roles }) => {
    const { t } = useLang();
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        phone_no: "",
        role: "",
    });

    const [allSelected, setAllSelected] = useState(false);

    // const handleCheckboxChange = (permissionId) => {
    //     setData((prevData) => {
    //         const current = prevData.permissions || [];
    //         return {
    //             ...prevData,
    //             permissions: current.includes(permissionId)
    //                 ? current.filter((id) => id !== permissionId)
    //                 : [...current, permissionId],
    //         };
    //     });
    // };

    // const handleSelectAllToggle = () => {
    //     if (allSelected) {
    //         setData("permissions", []);
    //     } else {
    //         setData(
    //             "permissions",
    //             permissions.map((p) => p.id)
    //         );
    //     }
    //     setAllSelected(!allSelected);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.user.store"));
    };

    return (
        <MasterLayout pageTitle="Create User">
            <Head title={t("Create User")} />

            <BackButton />

            <Card>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Role Name */}
                        <div className="w-full">
                            <InputLabel value="Name" />
                            <TextInput
                                className="w-full"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder={t("Enter your name")}
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Guard Selection */}
                        <div>
                            <InputLabel value="Email" />
                            <input
                                type="email"
                                className="rounded w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                name="email"
                                placeholder={t("Enter your email")}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError message={errors.email} />
                        </div>
                        <div>
                            <InputLabel value="Password" />
                            <input
                                type="password"
                                className="rounded w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                name="password"
                                placeholder={t("Enter your password")}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError message={errors.password} />
                        </div>
                        <div>
                            <InputLabel value="Phone no" />
                            <TextInput
                                className="w-full"
                                name="phone_no"
                                value={data.phone_no}
                                onChange={(e) =>
                                    setData("phone_no", e.target.value)
                                }
                                placeholder={t("Enter your phone no")}
                            />

                            <InputError message={errors.password} />
                        </div>
                        <div>
                            <InputLabel value="Roles" />
                            <select
                                className="rounded w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                name="role"
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                            >
                                <option value="">{t("Select a role")}</option>
                                {roles &&
                                    roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                            </select>
                            <InputError message={errors.role} />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end items-center my-2">
                        <PrimaryButton type="submit" disabled={processing}>
                            {processing && <Spinner className="mr-2" />}
                            {t("Create")}
                        </PrimaryButton>
                    </div>
                </form>
            </Card>
        </MasterLayout>
    );
};

export default Create;
