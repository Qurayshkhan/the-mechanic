import React from "react";
import { CheckCircle } from "lucide-react";

const Waiting = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <div className="bg-white rounded-full p-6 shadow-lg animate-pulse">
                <CheckCircle className="text-green-500 w-16 h-16" />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-800 text-center">
                Congratulations!
            </h1>

            <p className="mt-2 text-gray-600 text-center max-w-md">
                You have successfully completed the onboarding process. Your
                account is being set up and verified. This will only take a few
                moments.
            </p>

            <div className="mt-6 flex justify-center">
                <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-lg text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Next Steps
                </h2>
                <ul className="text-gray-600 space-y-2">
                    <li>✅ Check your email for account verification.</li>
                    <li>✅ Explore your dashboard and update your profile.</li>
                    <li>
                        ✅ Start using the features available to you
                        immediately.
                    </li>
                </ul>
            </div>

            <button className="mt-8 px-6 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition-colors">
                Go to Dashboard
            </button>
        </div>
    );
};

export default Waiting;
