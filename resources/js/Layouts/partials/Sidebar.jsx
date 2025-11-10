import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { X, ChevronRight } from "lucide-react";
import { links } from "@/Data/Links";
import { can } from "@/helpers";
import useLang from "@/hooks/useLang";

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
    const { t } = useLang();
    const { props } = usePage();
    const { user } = props?.auth;
    const currentRouteName = props?.currentRouteName || "";

    const [expandedMenus, setExpandedMenus] = useState(new Set());

    const handleClose = () => {
        if (window.innerWidth < 1024 && typeof onClose === "function") {
            onClose();
        }
    };
    const isSubmenuActive = (item) => {
        if (!item.subLinks || item.subLinks.length === 0) return false;
        return item.subLinks.some(
            (subLink) => currentRouteName === subLink.link
        );
    };
    const isParentActive = (item) => {
        return currentRouteName === item.link || isSubmenuActive(item);
    };
    useEffect(() => {
        const initiallyExpanded = new Set();
        links.forEach((item) => {
            if (item.subLinks && item.subLinks.length > 0) {
                const hasActiveSubmenu = item.subLinks.some(
                    (subLink) => currentRouteName === subLink.link
                );
                if (hasActiveSubmenu) {
                    initiallyExpanded.add(item.name);
                }
            }
        });
        setExpandedMenus(initiallyExpanded);
    }, [currentRouteName]);

    const toggleSubmenu = (itemName, event) => {
        event.preventDefault();
        event.stopPropagation();
        setExpandedMenus((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemName)) {
                newSet.delete(itemName);
            } else {
                newSet.add(itemName);
            }
            return newSet;
        });
    };
    const renderMenuItem = (item) => {
        const hasPermission = can(user, item.type);
        if (!hasPermission) return null;
        const hasSubLinks = item.subLinks && item.subLinks.length > 0;
        const isExpanded = expandedMenus.has(item.name);
        const isActive = isParentActive(item);
        const visibleSubLinks = hasSubLinks
            ? item.subLinks.filter((subLink) => can(user, subLink.type))
            : [];
        if (hasSubLinks && visibleSubLinks.length > 0) {
            return (
                <div key={item.name} className="space-y-1">
                    <button
                        type="button"
                        onClick={(e) => toggleSubmenu(item.name, e)}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
                            isActive
                                ? "bg-gray-800 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            {item.icon}
                            <span className="font-medium text-sm">
                                {t(item.name)}
                            </span>
                        </div>
                        <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-90" : ""
                            }`}
                        />
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isExpanded
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
                        }`}
                    >
                        <div className="pl-4 space-y-1 border-l-2 border-gray-700 ml-6">
                            {visibleSubLinks.map((subLink) => {
                                const isSubActive =
                                    currentRouteName === subLink.link;
                                return (
                                    <Link
                                        key={subLink.link}
                                        href={route(subLink.link)}
                                        onClick={handleClose}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-sm ${
                                            isSubActive
                                                ? "bg-gray-800 text-white border-l-2 border-white ml-[-2px]"
                                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                        }`}
                                    >
                                        <span className="font-medium">
                                            {t(subLink.name)}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Link
                key={item.name}
                href={route(item.link)}
                onClick={handleClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
                    isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
                {item.icon}
                <span className="font-medium text-sm">{t(item.name)}</span>
            </Link>
        );
    };
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={handleClose}
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
                        type="button"
                        onClick={handleClose}
                        className="lg:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        <X />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {Array.isArray(links) &&
                        links.map((item) => renderMenuItem(item))}
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
