import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

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
        <>
            <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="mb-4 md:mb-0">
                        <InputLabel value="Search" />
                        <TextInput
                            placeholder="Enter name email phone"
                            name="search"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportFilters;
