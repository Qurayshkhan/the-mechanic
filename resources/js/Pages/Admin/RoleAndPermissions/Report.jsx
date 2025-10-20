import React, { useEffect } from "react";
import { Link, router, usePage, useRemember } from "@inertiajs/react";
import MasterLayout from "@/Layouts/MasterLayout";
import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import { Edit } from "lucide-react";
import Badge from "@/Components/Badge";
import Pagination from "@/Components/Pagination";
import Delete from "./Delete";
import Loading from "@/Components/Loading";
import PageHeading from "@/Components/PageHeading";
import useAuth from "@/hooks/useAuth";
import { can } from "@/helpers";

const Report = ({ roles }) => {
    const user = useAuth();
    const [data, setData] = useRemember(roles);

    useEffect(() => {
        if (roles) setData(roles);
    }, [roles]);

    if (!data) {
        return <Loading title="Roles & Permissions" />;
    }

    return (
        <MasterLayout pageTitle="Roles & Permissions">
            <PageHeading
                title="Roles & Permissions"
                description="Manage system roles and permissions"
                permission="create_role"
                routeName="admin.roles.create"
                isCreateBtn={true}
                btnName="New Role"
            />
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-center border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="border py-2 px-3 uppercase">
                                    Name
                                </th>
                                <th className="border py-2 px-3 uppercase">
                                    Guard
                                </th>
                                <th className="border py-2 px-3 uppercase">
                                    Permissions
                                </th>
                                <th className="border py-2 px-3 uppercase">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.length > 0 ? (
                                data.data.map((role) => (
                                    <tr key={role?.id}>
                                        <td className="border py-2 px-3">
                                            {role?.name}
                                        </td>
                                        <td className="border py-2 px-3">
                                            {role?.guard_name}
                                        </td>
                                        <td className="border py-2 px-3">
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {role?.permissions?.map(
                                                    (permission) => (
                                                        <Badge
                                                            key={
                                                                permission?.id ||
                                                                permission?.name
                                                            }
                                                        >
                                                            {permission?.name}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </td>
                                        <td className="border py-2 px-3">
                                            <div className="flex justify-center gap-2">
                                                {can(user, "edit_role") && (
                                                    <Link
                                                        href={route(
                                                            "admin.roles.edit",
                                                            {
                                                                role: role?.id,
                                                            }
                                                        )}
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </Link>
                                                )}
                                                {can(user, "delete_role") && (
                                                    <Delete id={role?.id} />
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-gray-500 py-4"
                                    >
                                        No roles found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center md:justify-end">
                    <Pagination links={data?.links} />
                </div>
            </Card>
        </MasterLayout>
    );
};

export default Report;
