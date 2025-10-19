import React, { useState } from "react";
import Navbar from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";
import Alert from "@/Components/Alert";
import { usePage } from "@inertiajs/react";

const MasterLayout = ({ children, pageTitle = "Dashboard" }) => {
    const page = usePage();
    console.log("🚀 ~ MasterLayout ~ page:", page);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleMenuToggle = () => {
        console.log(sidebarOpen);
        setSidebarOpen((prev) => !prev);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    const pageProps = page?.props || {};

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

            <div className="w-full">
                <Navbar onMenuToggle={handleMenuToggle} pageTitle={pageTitle} />

                <main className="p-6">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>

            <Alert pageProps={pageProps} />
        </div>
    );
};

export default MasterLayout;
