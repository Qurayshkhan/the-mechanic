import React from "react";

const StatCard = ({
    title,
    value,
    change,
    changeType,
    icon,
    color = "blue",
}) => {
    const colorClasses = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        red: "bg-red-500",
        purple: "bg-purple-500",
        indigo: "bg-indigo-500",
    };

    const iconBgClasses = {
        blue: "bg-blue-100",
        green: "bg-green-100",
        yellow: "bg-yellow-100",
        red: "bg-red-100",
        purple: "bg-purple-100",
        indigo: "bg-indigo-100",
    };

    const iconColorClasses = {
        blue: "text-blue-600",
        green: "text-green-600",
        yellow: "text-yellow-600",
        red: "text-red-600",
        purple: "text-purple-600",
        indigo: "text-indigo-600",
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                        {title}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                        {value}
                    </p>
                    {change && (
                        <div className="flex items-center mt-1 sm:mt-2">
                            <span
                                className={`text-xs sm:text-sm font-medium ${
                                    changeType === "increase"
                                        ? "text-green-600"
                                        : changeType === "decrease"
                                        ? "text-red-600"
                                        : "text-gray-600"
                                }`}
                            >
                                {changeType === "increase"
                                    ? "+"
                                    : changeType === "decrease"
                                    ? "-"
                                    : ""}
                                {change}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 ml-1 hidden sm:inline">
                                vs last month
                            </span>
                        </div>
                    )}
                </div>
                <div
                    className={`p-2 sm:p-3 rounded-lg ${iconBgClasses[color]} flex-shrink-0 ml-2`}
                >
                    <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColorClasses[color]}`}
                    >
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
