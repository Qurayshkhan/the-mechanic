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

const Create = ({ permissions }) => {
    const { t } = useLang();
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        guard_name: "web",
        permissions: [],
    });

    const [allSelected, setAllSelected] = useState(false);

    const handleCheckboxChange = (permissionId) => {
        setData((prevData) => {
            const current = prevData.permissions || [];
            return {
                ...prevData,
                permissions: current.includes(permissionId)
                    ? current.filter((id) => id !== permissionId)
                    : [...current, permissionId],
            };
        });
    };

    const handleSelectAllToggle = () => {
        if (allSelected) {
            setData("permissions", []);
        } else {
            setData(
                "permissions",
                permissions.map((p) => p.id)
            );
        }
        setAllSelected(!allSelected);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.roles.store"));
    };

    return (
        <MasterLayout pageTitle="Create Role">
            <Head title={t("Create Role")} />

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
                                placeholder={t("Enter role name")}
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Guard Selection */}
                        <div>
                            <InputLabel value="Guard" />
                            <select
                                className="rounded w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                name="guard_name"
                                value={data.guard_name}
                                onChange={(e) =>
                                    setData("guard_name", e.target.value)
                                }
                            >
                                <option value="web">WEB</option>
                                <option value="api">API</option>
                            </select>
                            <InputError message={errors.guard_name} />
                        </div>
                    </div>

                    {/* Select / Deselect All */}
                    {permissions?.length > 0 && (
                        <div className="flex items-center gap-3 mt-4">
                            <Checkbox
                                checked={allSelected}
                                onChange={handleSelectAllToggle}
                            />
                            <InputLabel
                                value={
                                    allSelected
                                        ? t("Deselect All Permissions")
                                        : t("Select All Permissions")
                                }
                                className="text-gray-800 font-medium cursor-pointer"
                            />
                        </div>
                    )}

                    {/* Permission Checkboxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-4">
                        {permissions?.length > 0 ? (
                            permissions.map((permission) => (
                                <div
                                    key={permission.id}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox
                                        name="permissions[]"
                                        checked={data.permissions.includes(
                                            permission.id
                                        )}
                                        onChange={() =>
                                            handleCheckboxChange(permission.id)
                                        }
                                        id={permission.name}
                                    />
                                    <InputLabel
                                        htmlFor={permission.name}
                                        value={permission.name}
                                        className="text-gray-700"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">
                                No permissions found.
                            </div>
                        )}

                        <InputError message={errors.permissions} />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end items-center my-2">
                        <PrimaryButton
                            type="submit"
                            processing={processing}
                            disabled={processing}
                        >
                            {t("Create")}
                        </PrimaryButton>
                    </div>
                </form>
            </Card>
        </MasterLayout>
    );
};

export default Create;
