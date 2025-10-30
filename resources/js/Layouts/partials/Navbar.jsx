import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import LanguageSwitcher from "@/Components/LanguageSwitcher";
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import useLang from "@/hooks/useLang";
import useAuth from "@/hooks/useAuth";
import { Power, User } from "lucide-react";
import { can } from "@/helpers/index";

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
                        {t("Welcome Back")}, {user.name}
                    </p>
                </div>
            </div>

            <div className="flex gap-2 flex-wrap items-center space-x-4">
                <LanguageSwitcher />
                <div className="relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex gap-2 items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white text-sm font-medium">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
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
                            {can(user, "view_profile") && (
                                <Dropdown.Link
                                    href={route("profile.edit")}
                                    className="flex gap-2 items-center space-x-2"
                                >
                                    <User className="w-4 h-4" />
                                    <span>{t("Profile")}</span>
                                </Dropdown.Link>
                            )}{" "}
                            <div className="border-t border-gray-200"></div>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex gap-2 items-center space-x-2 text-red-600 hover:text-red-700"
                            >
                                <Power className="w-4 h-4 space-x-3" />
                                <span>{t("Logout")}</span>
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
