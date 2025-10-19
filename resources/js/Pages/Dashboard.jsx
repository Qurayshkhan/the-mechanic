import { Head } from "@inertiajs/react";
import MasterLayout from "@/Layouts/MasterLayout";
import StatCard from "@/Components/Dashboard/StatCard";
import RecentActivity from "@/Components/Dashboard/RecentActivity";
import UpcomingAppointments from "@/Components/Dashboard/UpcomingAppointments";
import QuickActions from "@/Components/Dashboard/QuickActions";

export default function Dashboard() {
    const stats = [
        {
            title: "Total Customers",
            value: "1,247",
            change: "12%",
            changeType: "increase",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                </svg>
            ),
            color: "blue",
        },
        {
            title: "Active Appointments",
            value: "23",
            change: "8%",
            changeType: "increase",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            ),
            color: "green",
        },
        {
            title: "Services Completed",
            value: "156",
            change: "5%",
            changeType: "increase",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                </svg>
            ),
            color: "purple",
        },
        {
            title: "Monthly Revenue",
            value: "$24,580",
            change: "15%",
            changeType: "increase",
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                </svg>
            ),
            color: "green",
        },
    ];

    return (
        <MasterLayout pageTitle="Dashboard">
            <Head title="Dashboard" />

            <div className="md:hidden">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {stats.slice(0, 4).map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                            >
                                <p className="text-xs font-medium text-gray-600 mb-1">
                                    {stat.title}
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    +{stat.change}
                                </p>
                            </div>
                        ))}
                    </div>

                    <QuickActions />

                    <RecentActivity />
                </div>
            </div>

            {/* Medium Screen Layout - Tablets and Small Laptops (md to lg) */}
            <div className="hidden md:block lg:hidden">
                {/* Welcome Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back!
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Here's what's happening with your mechanics business
                        today.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                <div className="space-y-6">
                    <UpcomingAppointments />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <QuickActions />
                        <RecentActivity />
                    </div>
                </div>
            </div>

            <div className="hidden lg:block">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back!
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Here's what's happening with your mechanics business
                        today.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
                    <div className="lg:col-span-2 space-y-6 xl:space-y-8">
                        <UpcomingAppointments />

                        <QuickActions />
                    </div>

                    <div className="lg:col-span-1">
                        <RecentActivity />
                    </div>
                </div>

                <div className="mt-6 xl:mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Average Service Time
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    2.4 hrs
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Per service
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-100">
                                <svg
                                    className="w-6 h-6 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Customer Satisfaction
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    4.8/5
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Based on 127 reviews
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-green-100">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Inventory Items
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    342
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    In stock
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-yellow-100">
                                <svg
                                    className="w-6 h-6 text-yellow-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}
