import React, { useEffect, useState } from "react";
import BackButton from "@/Components/BackButton";
import Card from "@/Components/Card";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import MasterLayout from "@/Layouts/MasterLayout";
import { Head, useForm } from "@inertiajs/react";
import useLang from "@/hooks/useLang";

const Create = ({ modules }) => {
    const { t } = useLang();
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        guard_name: "web",
        permissions: [],
    });

    const [allSelected, setAllSelected] = useState(false);
    const [moduleSelection, setModuleSelection] = useState({});

    useEffect(() => {
        if (modules?.length > 0) {
            const allPermissionIds = modules.flatMap((m) =>
                m.permissions.map((p) => p.id)
            );
            setAllSelected(data.permissions.length === allPermissionIds.length);

            const moduleStates = {};
            modules.forEach((module) => {
                const modulePermissionIds = module.permissions.map((p) => p.id);
                const selectedCount = modulePermissionIds.filter((id) =>
                    data.permissions.includes(id)
                ).length;
                moduleStates[module.id] =
                    selectedCount === modulePermissionIds.length;
            });
            setModuleSelection(moduleStates);
        }
    }, [data.permissions, modules]);

    const handlePermissionToggle = (permissionId) => {
        setData((prev) => {
            const updated = prev.permissions.includes(permissionId)
                ? prev.permissions.filter((id) => id !== permissionId)
                : [...prev.permissions, permissionId];
            return { ...prev, permissions: updated };
        });
    };

    const handleModuleToggle = (module) => {
        const modulePermissionIds = module.permissions.map((p) => p.id);
        const allSelectedInModule = moduleSelection[module.id];

        setData((prev) => {
            let updatedPermissions;
            if (allSelectedInModule) {
                updatedPermissions = prev.permissions.filter(
                    (id) => !modulePermissionIds.includes(id)
                );
            } else {
                updatedPermissions = Array.from(
                    new Set([...prev.permissions, ...modulePermissionIds])
                );
            }
            return { ...prev, permissions: updatedPermissions };
        });
    };

    const handleSelectAllToggle = () => {
        if (allSelected) {
            setData("permissions", []);
        } else {
            const allIds = modules.flatMap((m) =>
                m.permissions.map((p) => p.id)
            );
            setData("permissions", allIds);
        }
        setAllSelected(!allSelected);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.roles.store"));
    };

    return (
        <MasterLayout pageTitle={t("Create Role")}>
            <Head title={t("Create Role")} />
            <BackButton />

            <Card>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <InputLabel value={t("Name")} />
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

                        <div>
                            <InputLabel value={t("Guard")} />
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
                    {modules?.length > 0 && (
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

                    <div className="space-y-6 mt-6">
                        {modules?.length > 0 ? (
                            modules.map((module) => (
                                <div
                                    key={module.id}
                                    className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
                                >
                                    <div className="flex justify-between items-center border-b pb-3 mb-3">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {module.name}
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={
                                                    moduleSelection[
                                                        module.id
                                                    ] || false
                                                }
                                                onChange={() =>
                                                    handleModuleToggle(module)
                                                }
                                                id={`module-${module.id}`}
                                            />
                                            <InputLabel
                                                htmlFor={`module-${module.id}`}
                                                value={
                                                    moduleSelection[module.id]
                                                        ? t("Deselect Module")
                                                        : t("Select Module")
                                                }
                                                className="text-sm text-gray-700 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                        {module.permissions.map(
                                            (permission) => (
                                                <div
                                                    key={permission.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Checkbox
                                                        id={permission.name}
                                                        checked={data.permissions.includes(
                                                            permission.id
                                                        )}
                                                        onChange={() =>
                                                            handlePermissionToggle(
                                                                permission.id
                                                            )
                                                        }
                                                    />
                                                    <InputLabel
                                                        htmlFor={
                                                            permission.name
                                                        }
                                                        value={permission.name}
                                                        className="text-gray-700"
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-10">
                                {t("No permissions found.")}
                            </div>
                        )}
                        <InputError message={errors.permissions} />
                    </div>

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
