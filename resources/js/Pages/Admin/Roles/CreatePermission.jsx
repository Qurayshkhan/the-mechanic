import MasterLayout from "@/Layouts/MasterLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { ArrowLeft, Key, Shield } from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";

const CreatePermission = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        guard_name: "web",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.permissions.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <MasterLayout pageTitle="Create Permission">
                <Head title="Create Permission" />

                <div className="space-y-6">
                    {/* Header */}
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
                                Create New Permission
                            </h1>
                            <p className="text-gray-600">
                                Define a new permission for the system
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="max-w-2xl">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Permission Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                            errors.name ? "border-red-300" : ""
                                        }`}
                                        placeholder="e.g., create users, edit posts, delete comments"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="guard_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Guard Name *
                                    </label>
                                    <select
                                        id="guard_name"
                                        value={data.guard_name}
                                        onChange={(e) =>
                                            setData(
                                                "guard_name",
                                                e.target.value
                                            )
                                        }
                                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                            errors.guard_name
                                                ? "border-red-300"
                                                : ""
                                        }`}
                                    >
                                        <option value="web">Web</option>
                                        <option value="api">API</option>
                                    </select>
                                    {errors.guard_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.guard_name}
                                        </p>
                                    )}
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <Shield className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800">
                                                Permission Guidelines
                                            </h3>
                                            <div className="mt-2 text-sm text-blue-700">
                                                <ul className="list-disc list-inside space-y-1">
                                                    <li>
                                                        Use descriptive action
                                                        words (create, read,
                                                        update, delete)
                                                    </li>
                                                    <li>
                                                        Follow the pattern:
                                                        action resource (e.g.,
                                                        "create users")
                                                    </li>
                                                    <li>
                                                        Use lowercase letters
                                                        and spaces
                                                    </li>
                                                    <li>
                                                        Examples: create posts,
                                                        edit users, delete
                                                        comments, view reports
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <Key className="h-5 w-5 text-yellow-400" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-yellow-800">
                                                Important Note
                                            </h3>
                                            <div className="mt-2 text-sm text-yellow-700">
                                                <p>
                                                    After creating a permission,
                                                    you'll need to assign it to
                                                    roles to make it effective.
                                                    You can do this from the
                                                    roles management page.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <PrimaryButton
                                type="submit"
                                processing={processing}
                                disabled={processing}
                            >
                                {processing
                                    ? "Creating..."
                                    : "Create Permission"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </MasterLayout>
        </>
    );
};

export default CreatePermission;
