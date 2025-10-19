import React from "react";

const RecentActivity = () => {
    const activities = [
        {
            id: 1,
            type: "appointment",
            title: "New appointment scheduled",
            description: "John Doe - Oil Change Service",
            time: "2 hours ago",
            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
            color: "blue",
        },
        {
            id: 2,
            type: "customer",
            title: "New customer registered",
            description: "Sarah Wilson joined the system",
            time: "4 hours ago",
            icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
            color: "green",
        },
        {
            id: 3,
            type: "service",
            title: "Service completed",
            description: "Brake repair for Mike Johnson",
            time: "6 hours ago",
            icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
            color: "purple",
        },
        {
            id: 4,
            type: "inventory",
            title: "Low stock alert",
            description: "Engine oil running low",
            time: "1 day ago",
            icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
            color: "yellow",
        },
        {
            id: 5,
            type: "payment",
            title: "Payment received",
            description: "$150 from Emily Davis",
            time: "2 days ago",
            icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
            color: "green",
        },
    ];

    const getColorClasses = (color) => {
        const classes = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            yellow: "bg-yellow-100 text-yellow-600",
            purple: "bg-purple-100 text-purple-600",
            red: "bg-red-100 text-red-600",
        };
        return classes[color] || classes.blue;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Recent Activity
                </h3>
            </div>
            <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start space-x-3"
                        >
                            <div
                                className={`p-1.5 sm:p-2 rounded-lg ${getColorClasses(
                                    activity.color
                                )} flex-shrink-0`}
                            >
                                <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={activity.icon}
                                    />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                    {activity.title}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 truncate">
                                    {activity.description}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 sm:mt-6">
                    <button className="w-full text-center text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        View all activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;
