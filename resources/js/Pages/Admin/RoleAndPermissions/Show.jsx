import MasterLayout from "@/Layouts/MasterLayout";
import { Head, router } from "@inertiajs/react";
import React from "react";
import {
    ArrowLeft,
    Edit,
    Trash2,
    Users,
    Shield,
    Calendar,
    Key,
} from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";

const Show = ({ role }) => {
    const handleDelete = () => {
        if (
            confirm(
                `Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`
            )
        ) {
            router.delete(route("admin.roles.destroy", role.id));
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>
            <MasterLayout pageTitle={`Role: ${role.name}`}>
                <Head title={`Role: ${role.name}`} />

                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {role.name}
                                </h1>
                                <p className="text-gray-600">
                                    Role details and permissions
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <PrimaryButton
                                onClick={() =>
                                    router.visit(
                                        route("admin.roles.edit", role.id)
                                    )
                                }
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Role
                            </PrimaryButton>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Role
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Role Information */}
                        <div className="lg:col-span-1">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Role Information
                                </h3>

                                <dl className="space-y-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Name
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                                            <Users className="h-4 w-4 text-blue-500 mr-2" />
                                            {role.name}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Guard Name
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                                            <Key className="h-4 w-4 text-green-500 mr-2" />
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {role.guard_name}
                                            </span>
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Created
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                            {formatDate(role.created_at)}
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">
                                            Last Updated
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                            {formatDate(role.updated_at)}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Permissions */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Assigned Permissions
                                    </h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {role.permissions?.length || 0}{" "}
                                        permissions
                                    </span>
                                </div>

                                {role.permissions &&
                                role.permissions.length > 0 ? (
                                    <div className="space-y-4">
                                        {Object.entries(
                                            role.permissions.reduce(
                                                (groups, permission) => {
                                                    const group =
                                                        permission.name.split(
                                                            " "
                                                        )[0];
                                                    if (!groups[group]) {
                                                        groups[group] = [];
                                                    }
                                                    groups[group].push(
                                                        permission
                                                    );
                                                    return groups;
                                                },
                                                {}
                                            )
                                        ).map(([group, groupPermissions]) => (
                                            <div
                                                key={group}
                                                className="border border-gray-200 rounded-lg p-4"
                                            >
                                                <h4 className="text-sm font-medium text-gray-900 mb-3 capitalize">
                                                    {group} Permissions
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {groupPermissions.map(
                                                        (permission) => (
                                                            <div
                                                                key={
                                                                    permission.id
                                                                }
                                                                className="flex items-center p-2 bg-gray-50 border border-gray-200 rounded"
                                                            >
                                                                <Shield className="h-4 w-4 text-green-500 mr-2" />
                                                                <span className="text-sm text-gray-700">
                                                                    {
                                                                        permission.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Shield className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                            No permissions assigned
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            This role doesn't have any
                                            permissions assigned yet.
                                        </p>
                                        <div className="mt-6">
                                            <PrimaryButton
                                                onClick={() =>
                                                    router.visit(
                                                        route(
                                                            "admin.roles.edit",
                                                            role.id
                                                        )
                                                    )
                                                }
                                            >
                                                <Edit className="h-4 w-4 mr-2" />
                                                Assign Permissions
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    );
};

export default Show;
