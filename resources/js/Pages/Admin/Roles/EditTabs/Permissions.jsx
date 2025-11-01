import React, { useEffect, useState } from "react";
import Edit from "../Edit";
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import useLang from "@/hooks/useLang";

const Permissions = ({ role, modules }) => {
    const { t } = useLang();

    const initialPermissions = Array.isArray(role?.permissions)
        ? role.permissions.map((p) => p.id)
        : [];

    const { data, setData, put, processing } = useForm({
        permissions: initialPermissions,
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

    const handleModuleSelectToggle = (module) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.roles.updatePermissions", role.id), {
            preserveScroll: true,
        });
    };

    return (
        <Edit role={role}>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <Checkbox
                        checked={allSelected}
                        onChange={handleSelectAllToggle}
                    />
                    <InputLabel
                        value={
                            allSelected ? t("Deselect All") : t("Select All")
                        }
                        className="text-gray-800 font-medium cursor-pointer"
                    />
                </div>

                {modules?.length > 0 ? (
                    modules.map((module) => (
                        <div
                            key={module.id}
                            className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white"
                        >
                            <div className="flex justify-between items-center border-b pb-3 mb-3">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {module.name}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={
                                            moduleSelection[module.id] || false
                                        }
                                        onChange={() =>
                                            handleModuleSelectToggle(module)
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
                                {module.permissions.map((permission) => (
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
                                            htmlFor={permission.name}
                                            value={permission.name}
                                            className="text-gray-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-10">
                        No permissions found.
                    </div>
                )}

                <div className="flex justify-end items-center pt-4">
                    <PrimaryButton
                        type="submit"
                        processing={processing}
                        disabled={processing}
                    >
                        {t("Update")}
                    </PrimaryButton>
                </div>
            </form>
        </Edit>
    );
};

export default Permissions;
