import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Cross, X } from "lucide-react";
import { links } from "@/Data/Links";
import { can } from "@/helpers";
import useLang from "@/hooks/useLang";

const Sidebar = ({ isOpen, onClose }) => {
    const { t, locale } = useLang();
    const { props } = usePage();
    const { user } = props?.auth;
    const currentRouteName = props?.currentRouteName || "";
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                fixed lg:sticky inset-y-0 left-0 z-50 min-w-64 bg-black text-white
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "block" : "hidden"}
                flex flex-col h-full md:h-screen
            `}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <div className="flex items-center gap-1 space-x-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-lg">
                                M
                            </span>
                        </div>
                        <span className="text-xl font-bold">Mechanics</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        <X />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {Array.isArray(links) &&
                        links.map((item) => {
                            const isActive = currentRouteName === item.link;
                            const hasPermission = can(user, item.type);
                            if (!hasPermission) return null;
                            return (
                                <Link
                                    key={item.name}
                                    href={route(item.link)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
                                        isActive
                                            ? "bg-gray-800 text-white"
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                    }`}
                                >
                                    {item.icon}
                                    <span className="font-medium text-sm">
                                        {t(item.name)}
                                    </span>
                                </Link>
                            );
                        })}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="text-xs text-gray-400 text-center">
                        © 2024 Mechanics Pro
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
