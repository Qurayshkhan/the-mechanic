import React, { useEffect, useState } from "react";
import Edit from "../Edit";
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
import { useForm } from "@inertiajs/react";
import useLang from "@/hooks/useLang";

const Permissions = ({ role, permissions }) => {
    const { t } = useLang();
    const initialPermissions = Array.isArray(role?.permissions)
        ? role.permissions.map((p) => p.id)
        : [];

    const { data, setData, put, processing } = useForm({
        permissions: initialPermissions,
    });

    const [allSelected, setAllSelected] = useState(false);

    useEffect(() => {
        if (permissions?.length > 0) {
            setAllSelected(data.permissions.length === permissions.length);
        }
    }, [data.permissions, permissions]);

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
        put(route("admin.roles.updatePermissions", role.id), {
            preserveScroll: true,
        });
    };

    return (
        <Edit role={role}>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3 mb-4">
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
                </div>

                <div className="flex justify-end items-center pt-4">
                    <PrimaryButton
                        type="submit"
                        processing={processing}
                        disabled={processing}
                    >
                        Update
                    </PrimaryButton>
                </div>
            </form>
        </Edit>
    );
};

export default Permissions;
