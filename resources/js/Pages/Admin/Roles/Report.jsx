import React from "react";
import { Link, Deferred } from "@inertiajs/react";
import MasterLayout from "@/Layouts/MasterLayout";
import Card from "@/Components/Card";
import PageHeading from "@/Components/PageHeading";
import useAuth from "@/hooks/useAuth";
import { can } from "@/helpers";
import { Edit } from "lucide-react";
import Badge from "@/Components/Badge";
import Pagination from "@/Components/Pagination";
import Delete from "./Delete";
import Loading from "@/Components/Loading";
import useLang from "@/hooks/useLang";

const Report = ({ roles }) => {
    const user = useAuth();
    const { t } = useLang();

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

            <Deferred
                data={["roles"]}
                fallback={<Loading title="Roles & Permissions" />}
            >
                <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                    <table className="w-full text-sm text-gray-700 border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs border-b border-gray-200">
                                    {t("Name")}
                                </th>
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs border-b border-gray-200">
                                    {t("Guard")}
                                </th>
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs border-b border-gray-200">
                                    {t("Permissions")}
                                </th>
                                <th className="py-3 px-4 text-center font-semibold uppercase text-xs border-b border-gray-200">
                                    {t("Action")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles?.data?.length > 0 ? (
                                roles.data.map((role, index) => (
                                    <tr
                                        key={role?.id}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="py-3 px-4 font-medium">
                                            {role?.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            {role?.guard_name}
                                        </td>
                                        <td className="py-3 px-4">
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
                                        <td className="py-3 px-4 text-center">
                                            <div className="flex justify-center gap-3">
                                                {can(user, "edit_role") && (
                                                    <Link
                                                        href={route(
                                                            "admin.roles.edit",
                                                            {
                                                                role: role?.id,
                                                            }
                                                        )}
                                                        className="text-blue-600 hover:text-blue-800 transition"
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
                                        className="text-gray-500 py-6 text-center"
                                    >
                                        No roles found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center md:justify-end mt-4">
                    <Pagination
                        links={roles?.links}
                        from={roles?.from}
                        to={roles?.to}
                        total={roles?.total}
                    />
                </div>
            </Deferred>
        </MasterLayout>
    );
};

export default Report;
