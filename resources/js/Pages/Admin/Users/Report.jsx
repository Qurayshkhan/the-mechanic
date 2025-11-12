import Card from "@/Components/Card";
import Loading from "@/Components/Loading";
import PageHeading from "@/Components/PageHeading";
import { can } from "@/helpers";
import useAuth from "@/hooks/useAuth";
import MasterLayout from "@/Layouts/MasterLayout";
import { Head, Link, router, useRemember, Deferred } from "@inertiajs/react";
import { Edit } from "lucide-react";
import React from "react";
import Delete from "./Delete";
import useLang from "@/hooks/useLang";
import Pagination from "@/Components/Pagination";
import ReportFilters from "./ReportFilters";

const Report = ({ users, filters }) => {
    const { t } = useLang();
    const userAuth = useAuth();

    return (
        <MasterLayout pageTitle="User Management">
            <PageHeading
                title="Users"
                description="Manage and control user accounts, roles, and permissions in the system."
                permission="view_users"
                routeName="admin.user.create"
                isCreateBtn={true}
                btnName={"New User"}
            />
            <ReportFilters filters={filters} />
            <Deferred data={["users"]} fallback={<Loading title="users" />}>
                <div className="overflow-x-auto rounded-lg shadow-sm">
                    <table className="w-full border-collapse text-sm text-gray-700">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs">
                                    {t("Name")}
                                </th>
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs">
                                    {t("Email")}
                                </th>
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs">
                                    {t("Phone")}
                                </th>
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs">
                                    {t("Role")}
                                </th>
                                <th className="py-3 px-4 text-center font-semibold uppercase text-xs">
                                    {t("Action")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.data?.length > 0 ? (
                                users.data.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="py-3 px-4 font-medium">
                                            {user?.name ?? "N/A"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user?.email ?? "N/A"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user?.phone_no ?? "N/A"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {user.roles
                                                ?.map((role) => role.name)
                                                .join(", ") ?? "N/A"}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <div className="flex justify-center gap-3">
                                                {can(userAuth, "edit_user") && (
                                                    <Link
                                                        href={route(
                                                            "admin.users.edit",
                                                            {
                                                                user: user.id,
                                                            }
                                                        )}
                                                        className="text-blue-600 hover:text-blue-800 transition"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </Link>
                                                )}
                                                {can(
                                                    userAuth,
                                                    "delete_user"
                                                ) && <Delete id={user.id} />}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-6 text-center text-gray-500"
                                    >
                                        {t("No users found")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center md:justify-end mt-4">
                    <Pagination
                        links={users?.links}
                        from={users?.from}
                        to={users?.to}
                        total={users?.total}
                    />
                </div>
            </Deferred>
        </MasterLayout>
    );
};

export default Report;
