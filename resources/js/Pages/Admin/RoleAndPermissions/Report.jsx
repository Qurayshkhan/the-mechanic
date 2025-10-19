import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import MasterLayout from "@/Layouts/MasterLayout";
import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import { Plus, Key, Edit, Trash } from "lucide-react";
import Badge from "@/Components/Badge";
import Pagination from "@/Components/Pagination";
import Delete from "./Delete";

const Report = ({ roles }) => {
    console.log("🚀 ~ Report ~ roles:", roles);
    return (
        <MasterLayout pageTitle="Roles & Permissions">
            <Head title="Roles & Permissions" />

            <div className="space-y-6">
                <div className="flex flex-wrap gap-2 justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Roles & Permissions
                        </h1>
                        <p className="text-gray-600">
                            Manage system roles and permissions
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <PrimaryButton
                            onClick={() =>
                                router.visit(route("admin.roles.create"))
                            }
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            New Role
                        </PrimaryButton>
                    </div>
                </div>

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
                                {roles?.data?.length > 0 ? (
                                    roles.data.map((role) => (
                                        <tr key={role.id}>
                                            <td className="border py-2 px-3">
                                                {role.name}
                                            </td>
                                            <td className="border py-2 px-3">
                                                {role.guard_name}
                                            </td>
                                            <td className="border py-2 px-3">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {role.permissions &&
                                                        role.permissions
                                                            .length > 0 &&
                                                        role.permissions.map(
                                                            (permission) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            permission
                                                                        }
                                                                    >
                                                                        <Badge>
                                                                            {
                                                                                permission?.name
                                                                            }
                                                                        </Badge>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </td>
                                            <td className="border py-2 px-3  cursor-pointer hover:underline">
                                                <div className="flex flex-wrap items-center gap-2 justify-center">
                                                    <Link
                                                        href={route(
                                                            "admin.roles.edit",
                                                            { role: role.id }
                                                        )}
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </Link>
                                                    <Delete id={role.id} />
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
                        <Pagination links={roles.links} />
                    </div>
                </Card>
            </div>
        </MasterLayout>
    );
};

export default Report;
