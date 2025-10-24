import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    const { url } = usePage();

    const isLoginPage = url === "/login";
    const isRegisterPage = url === "/register";

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 dark:bg-gray-900 relative">
            <div className="hidden lg:flex flex-col justify-center items-center bg-[#26247b] text-white p-10">
                <div className="flex flex-col items-center text-center">
                    <ApplicationLogo className="h-20 w-20 mb-6" />
                    <h1 className="text-3xl font-bold mb-2">
                        {isLoginPage ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-base text-white/90 max-w-sm">
                        {isLoginPage
                            ? "Sign in to continue to your dashboard and manage your account with ease."
                            : "Join us today and get access to your personalized dashboard and tools."}
                    </p>
                </div>
            </div>

            <div className="relative flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                {isLoginPage && (
                    <Link
                        href={route("register")}
                        className="absolute top-6 right-6 text-sm text-gray-600  font-medium transition-colors"
                    >
                        Don’t have an account?
                    </Link>
                )}

                {isRegisterPage && (
                    <Link
                        href={route("login")}
                        className="absolute top-6 right-6 text-sm text-gray-600  font-medium transition-colors"
                    >
                        Already have an account?
                    </Link>
                )}

                <div className="w-full max-w-md space-y-6 px-6">
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                        {children}
                    </div>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Your Company. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
