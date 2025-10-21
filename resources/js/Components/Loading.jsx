import MasterLayout from "@/Layouts/MasterLayout";
import { Head } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import React from "react";

const Loading = ({ title }) => {
    return (
        <div
            className="flex justify-center items-center h-64 gap-1
            "
        >
            <p className="text-gray-600">
                <Loader2 className="w-5 h-5 animate-spin" />
            </p>
            <p>Loading {title}....</p>
        </div>
    );
};

export default Loading;
