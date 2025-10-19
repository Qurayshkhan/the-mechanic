import React from "react";
import { Link } from "@inertiajs/react";

const QuickActions = () => {
    const actions = [
        {
            title: "New Appointment",
            description: "Schedule a new service appointment",
            href: "/appointments/create",
            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
            color: "blue",
        },
        {
            title: "Add Customer",
            description: "Register a new customer",
            href: "/customers/create",
            icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
            color: "green",
        },
        {
            title: "Add Service",
            description: "Create a new service type",
            href: "/services/create",
            icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
            color: "purple",
        },
        {
            title: "Inventory Check",
            description: "Check and update inventory",
            href: "/inventory",
            icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
            color: "yellow",
        },
    ];

    const getColorClasses = (color) => {
        const classes = {
            blue: "bg-blue-50 border-blue-200 hover:bg-blue-100",
            green: "bg-green-50 border-green-200 hover:bg-green-100",
            purple: "bg-purple-50 border-purple-200 hover:bg-purple-100",
            yellow: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
        };
        return classes[color] || classes.blue;
    };

    const getIconColorClasses = (color) => {
        const classes = {
            blue: "text-blue-600",
            green: "text-green-600",
            purple: "text-purple-600",
            yellow: "text-yellow-600",
        };
        return classes[color] || classes.blue;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Quick Actions
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Common tasks and shortcuts
                </p>
            </div>
            <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {actions.map((action, index) => (
                        <Link
                            key={index}
                            href={action.href}
                            className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 ${getColorClasses(
                                action.color
                            )} group`}
                        >
                            <div className="flex items-start space-x-2 sm:space-x-3">
                                <div
                                    className={`p-1.5 sm:p-2 rounded-lg bg-white ${getIconColorClasses(
                                        action.color
                                    )} flex-shrink-0`}
                                >
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={action.icon}
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-gray-700 truncate">
                                        {action.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                        {action.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuickActions;
