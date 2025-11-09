import React, { useState } from "react";
import { CheckCircle2, Clock, Mail, Timer, UserCheck } from "lucide-react";
import { router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

const Waiting = () => {
    const [processing, setProcessing] = useState(false);
    const handleLogout = () => {
        setProcessing(true);
        router.post(
            route("logout"),
            {},
            {
                onFinish: () => setProcessing(false),
            }
        );
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white p-6">
            <div className="bg-white rounded-full p-6 shadow-2xl animate-bounce">
                <CheckCircle2 className="text-green-500 w-20 h-20" />
            </div>
            <h1 className="mt-8 md:text-4xl font-extrabold text-gray-800 text-center">
                Congratulations!
            </h1>
            <p className="mt-3 text-gray-600 text-center max-w-lg leading-relaxed">
                You’ve successfully completed your onboarding. Your account is
                now under review and will be verified within{" "}
                <span className="font-semibold text-gray-600">24 hours</span>.
            </p>
            {/* <div className="mt-8 flex justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
            </div> */}
            <div className="mt-10 bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full text-center border border-gray-100">
                <h2 className="md:text-2xl font-semibold text-gray-800 mb-5 flex items-center justify-center gap-2">
                    <Clock className="w-6 h-6 text-gray-500" />
                    What Happens Next
                </h2>
                <ul className="text-gray-600 space-y-3 text-left inline-block">
                    <li className="flex flex-wrap items-center gap-2">
                        <Mail className="w-5 h-5 text-green-500" />
                        <span>
                            We’ll notify you via email once your account is
                            verified.
                        </span>
                    </li>
                    <li className="flex flex-wrap items-center gap-2">
                        <UserCheck className="w-5 h-5 text-gray-500" />
                        <span>
                            You can log in and start exploring your dashboard
                            soon after approval.
                        </span>
                    </li>
                    <li className="flex flex-wrap items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>
                            Enjoy access to all features once verification is
                            complete.
                        </span>
                    </li>
                </ul>
            </div>
            <PrimaryButton
                className="mt-10 px-8 py-3 bg-gray-600 text-white font-medium rounded-xl shadow-md hover:bg-gray-700 transition-transform transform hover:-translate-y-0.5"
                onClick={handleLogout}
                processing={processing}
            >
                Logout
            </PrimaryButton>

            <p className="mt-6 text-sm text-gray-500 flex flex-wrap items-center gap-2">
                <Timer /> Approval usually takes less than 24 hours — thank you
                for your patience!
            </p>
        </div>
    );
};

export default Waiting;
