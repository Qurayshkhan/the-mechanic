import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    const { url } = usePage();

    const isLoginPage = url === "/login";
    const isRegisterPage = url === "/register";
    const isForgotPassword = url === "/forgot-password";
    const isResetPasswordScreen = url.startsWith("/reset-password");

    return (
        <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 bg-gray-50 dark:bg-gray-900">
            <div className="hidden lg:flex flex-col justify-center items-center bg-black text-white p-10 sticky top-0 h-screen">
                <div className="flex flex-col items-center text-center px-4">
                    {/* <ApplicationLogo className="h-20 w-20 mb-6" /> */}
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

            <div className="relative flex flex-col justify-center items-center px-4 sm:px-6 py-10 bg-white dark:bg-gray-800 w-full overflow-y-auto">
                {isLoginPage && (
                    <Link
                        href={route("register")}
                        className="absolute top-0 right-4  sm:right-6 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors"
                    >
                        Don’t have an account?
                    </Link>
                )}

                {isRegisterPage && (
                    <Link
                        href={route("login")}
                        className="absolute top-0 right-4  sm:right-6 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors"
                    >
                        Already have an account?
                    </Link>
                )}

                {isForgotPassword && (
                    <Link
                        href={route("login")}
                        className="absolute top-0 right-4  sm:right-6 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors"
                    >
                        Login
                    </Link>
                )}
                {isResetPasswordScreen && (
                    <Link
                        href={route("login")}
                        className="absolute top-0 right-4  sm:right-6 text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors"
                    >
                        Login
                    </Link>
                )}

                <div className="lg:hidden flex flex-col items-center text-center mb-6">
                    <ApplicationLogo className="h-16 w-16 mb-4" />
                    <h1 className="text-2xl font-bold mb-1 text-gray-800 dark:text-white">
                        {isLoginPage ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                        {isLoginPage
                            ? "Sign in to your account and access your dashboard easily."
                            : "Sign up now to get started with your personal dashboard."}
                    </p>
                </div>

                <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                    {children}
                </div>

                <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-6">
                    © {new Date().getFullYear()} Your Company. All rights
                    reserved.
                </p>
            </div>
        </div>
    );
}
