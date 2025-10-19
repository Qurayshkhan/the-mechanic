import React from "react";

const UpcomingAppointments = () => {
    const appointments = [
        {
            id: 1,
            customer: "John Smith",
            service: "Oil Change",
            time: "9:00 AM",
            date: "Today",
            status: "confirmed",
            phone: "+1 (555) 123-4567",
        },
        {
            id: 2,
            customer: "Sarah Johnson",
            service: "Brake Inspection",
            time: "11:30 AM",
            date: "Today",
            status: "pending",
            phone: "+1 (555) 234-5678",
        },
        {
            id: 3,
            customer: "Mike Wilson",
            service: "Tire Rotation",
            time: "2:00 PM",
            date: "Today",
            status: "confirmed",
            phone: "+1 (555) 345-6789",
        },
        {
            id: 4,
            customer: "Emily Davis",
            service: "Engine Diagnostic",
            time: "10:00 AM",
            date: "Tomorrow",
            status: "confirmed",
            phone: "+1 (555) 456-7890",
        },
        {
            id: 5,
            customer: "David Brown",
            service: "AC Repair",
            time: "3:30 PM",
            date: "Tomorrow",
            status: "pending",
            phone: "+1 (555) 567-8901",
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        Upcoming Appointments
                    </h3>
                    <button className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700">
                        View all
                    </button>
                </div>
            </div>
            <div className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs sm:text-sm font-medium text-gray-600">
                                            {appointment.customer
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {appointment.customer}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                                            {appointment.service}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0 ml-2">
                                <p className="text-xs sm:text-sm font-medium text-gray-900">
                                    {appointment.time}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    {appointment.date}
                                </p>
                                <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                                        appointment.status
                                    )}`}
                                >
                                    {appointment.status}
                                </span>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                                {appointment.phone}
                            </p>
                            <div className="flex space-x-2 flex-shrink-0 ml-2">
                                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                    Call
                                </button>
                                <button className="text-xs text-gray-600 hover:text-gray-700 font-medium">
                                    Reschedule
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingAppointments;
