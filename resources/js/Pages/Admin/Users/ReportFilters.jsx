import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

const ReportFilters = ({ filters }) => {
    const [search, setSearch] = useState(filters?.search || "");

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("admin.users"),
                { search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);
    return (
        <>
            <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="mb-4 md:mb-0">
                        <InputLabel value="Search" />
                        <TextInput
                            placeholder="Enter name email phone"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportFilters;
