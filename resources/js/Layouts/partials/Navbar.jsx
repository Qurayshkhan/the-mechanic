import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import LanguageSwitcher from "@/Components/LanguageSwitcher";
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import useLang from "@/hooks/useLang";
import useAuth from "@/hooks/useAuth";

const Navbar = ({ onMenuToggle, pageTitle = "Dashboard" }) => {
    const user = useAuth();
    const [showingUserDropdown, setShowingUserDropdown] = useState(false);
    const { t } = useLang();
    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
            <div className="flex items-center space-x-4">
                <button
                    onClick={onMenuToggle}
                    className=" p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <div>
                    <h1 className="md:text-xl font-semibold text-gray-900 truncate w-40 md:w-full hidden md:block">
                        {pageTitle}
                    </h1>
                    <p className="text-sm text-gray-500 hidden sm:block">
                        {t("Welcome back")}, {user.name}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center space-x-4">
                <LanguageSwitcher />
                <div className="relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-medium text-gray-900">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {user.roles[0].name}
                                    </p>
                                </div>
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link
                                href={route("profile.edit")}
                                className="flex items-center space-x-2"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                <span>Profile</span>
                            </Dropdown.Link>
                            <Dropdown.Link
                                href="/settings"
                                className="flex items-center space-x-2"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>Settings</span>
                            </Dropdown.Link>
                            <div className="border-t border-gray-200"></div>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Log Out</span>
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
