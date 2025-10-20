import Card from "@/Components/Card";
import Loading from "@/Components/Loading";
import PageHeading from "@/Components/PageHeading";
import { can } from "@/helpers";
import useAuth from "@/hooks/useAuth";
import MasterLayout from "@/Layouts/MasterLayout";
import { Head, Link, useRemember } from "@inertiajs/react";
import { Edit } from "lucide-react";
import React, { useEffect } from "react";
import Delete from "./Delete";

const Report = ({ users }) => {
    const userAuth = useAuth();
    const [data, setData] = useRemember(users);
    useEffect(() => {
        if (users) {
            setData(users);
        }
    }, [users]);
    if (!data) {
        return <Loading title="User Management" />;
    }

    return (
        <>
            <MasterLayout title={"User Management"}>
                <PageHeading
                    title="Users"
                    description="Manage system users"
                    permission="view_users"
                    isCreateBtn={true}
                    btnName={"New User"}
                />
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-center border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border py-2 px-3 uppercase">
                                        Name
                                    </th>
                                    <th className="border py-2 px-3 uppercase">
                                        Email
                                    </th>
                                    <th className="border py-2 px-3 uppercase">
                                        Role
                                    </th>
                                    <th className="border py-2 px-3 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data?.map((user) => {
                                    return (
                                        <>
                                            <tr>
                                                <td className="border py-2 px-3">
                                                    {user?.name ?? "N/A"}
                                                </td>
                                                <td className="border py-2 px-3">
                                                    {user?.email ?? "N/A"}
                                                </td>
                                                <td className="border py-2 px-3">
                                                    {user?.roles?.map(
                                                        (role) => role?.name
                                                    )}
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
                                                                        user: user?.id,
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
                                                            <Delete
                                                                id={user?.id}
                                                            />
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </MasterLayout>
        </>
    );
};

export default Report;
