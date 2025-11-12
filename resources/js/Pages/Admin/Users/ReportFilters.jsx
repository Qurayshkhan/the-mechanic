import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

const ReportFilters = ({ filters }) => {
    const [search, setSearch] = useState(filters?.search || "");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        router.get(
            route("admin.users"),
            { search: value },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <InputLabel
                        value="Search"
                        className="text-gray-700 font-medium"
                    />
                    <div className="mt-1 relative">
                        <TextInput
                            placeholder="Enter name, email, or phone"
                            name="search"
                            value={search}
                            onChange={handleSearch}
                            className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportFilters;
