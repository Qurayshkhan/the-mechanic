import Card from "@/Components/Card";
import Loading from "@/Components/Loading";
import PageHeading from "@/Components/PageHeading";
import { can } from "@/helpers";
import useAuth from "@/hooks/useAuth";
import MasterLayout from "@/Layouts/MasterLayout";
import { Head, Link, router, useRemember } from "@inertiajs/react";
import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import Delete from "./Delete";
import { Deferred } from "@inertiajs/react";
import useLang from "@/hooks/useLang";
import Pagination from "@/Components/Pagination";
import ReportFilters from "./ReportFilters";

const Report = ({ users, filters }) => {
    const { t } = useLang();
    const userAuth = useAuth();

    return (
        <>
            <MasterLayout pageTitle="User Management">
                <PageHeading
                    title="Users"
                    description="Manage and control user accounts, roles, and permissions in the system."
                    permission="view_users"
                    routeName="admin.user.create"
                    isCreateBtn={true}
                    btnName={"New User"}
                />
                <Card>
                    <ReportFilters filters={filters} />
                </Card>
                <Deferred data={["users"]} fallback={<Loading title="users" />}>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="w-full text-center border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border py-2 px-3 uppercase">
                                            {t("Name")}
                                        </th>
                                        <th className="border py-2 px-3 uppercase">
                                            {t("Email")}
                                        </th>
                                        <th className="border py-2 px-3 uppercase">
                                            {t("Phone")}
                                        </th>
                                        <th className="border py-2 px-3 uppercase">
                                            {t("Role")}
                                        </th>
                                        <th className="border py-2 px-3 uppercase">
                                            {t("Action")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.data?.map((user) => (
                                        <tr key={user?.id}>
                                            <td className="border py-2 px-3">
                                                {user?.name ?? "N/A"}
                                            </td>
                                            <td className="border py-2 px-3">
                                                {user?.email ?? "N/A"}
                                            </td>
                                            <td className="border py-2 px-3">
                                                {user?.phone_no ?? "N/A"}
                                            </td>
                                            <td className="border py-2 px-3">
                                                {user.roles
                                                    ?.map((role) => role.name)
                                                    .join(", ") ?? "N/A"}
                                            </td>
                                            <td className="border py-2 px-3">
                                                <div className="flex justify-center gap-2">
                                                    {can(
                                                        userAuth,
                                                        "edit_user"
                                                    ) && (
                                                        <Link
                                                            href={route(
                                                                "admin.users.edit",
                                                                {
                                                                    user: user.id,
                                                                }
                                                            )}
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </Link>
                                                    )}
                                                    {can(
                                                        userAuth,
                                                        "delete_user"
                                                    ) && (
                                                        <Delete id={user.id} />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <Pagination
                                links={users?.links}
                                from={users?.from}
                                to={users?.to}
                                total={users?.total}
                            />
                        </div>
                    </Card>
                </Deferred>
            </MasterLayout>
        </>
    );
};

export default Report;
