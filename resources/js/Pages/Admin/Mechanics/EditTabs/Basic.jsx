import React from "react";
import EditLayout from "../Edit";
import { Deferred, Head } from "@inertiajs/react";
import Loading from "@/Components/Loading";
import {
    Mail,
    Phone,
    User,
    MapPin,
    Wrench,
    Building2,
    ShieldCheck,
} from "lucide-react";
import Badge from "@/Components/Badge";
import { getVariant } from "@/helpers";

const Basic = ({ mechanic }) => {
    const data = mechanic;

    return (
        <Deferred data={["mechanic"]} fallback={<Loading />}>
            <EditLayout mechanic={data}>
                <Head title="Mechanic Details" />

                <div className="p-4  mx-auto">
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <div className="flex flex-col items-center text-center">
                            <img
                                src={data?.mechanic?.avatar}
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
                            />

                            <h2 className="text-2xl font-bold mt-4">
                                {data?.mechanic?.name}
                            </h2>

                            <div className="mt-2">
                                <Badge variant={getVariant(data?.status)}>
                                    {data?.status}
                                </Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 text-gray-700">
                            <div className="flex flex-col items-center md:items-start gap-2">
                                <Mail size={20} />
                                <span className="font-medium">
                                    {data?.mechanic?.email}
                                </span>
                            </div>

                            <div className="flex flex-col items-center md:items-start gap-2">
                                <Phone size={20} />
                                <span className="font-medium">
                                    {data?.mechanic?.phone_no ?? "N/A"}
                                </span>
                            </div>

                            <div className="flex flex-col items-center md:items-start gap-2">
                                <User size={20} />
                                <span className="font-medium">
                                    CNIC: {data?.mechanic?.cnic ?? "N/A"}
                                </span>
                            </div>
                            <div className="flex flex-col items-center md:items-start gap-2">
                                <ShieldCheck size={20} />
                                <span className="font-medium">
                                    Verified:{" "}
                                    {data?.is_verified ? (
                                        <span className="text-green-600 font-bold">
                                            Yes
                                        </span>
                                    ) : (
                                        <span className="text-red-600 font-bold">
                                            No
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
                        <h3 className="text-xl font-semibold mb-4">
                            Mechanic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                            <div className="flex items-center gap-3">
                                <Wrench size={20} />
                                <span>
                                    Type:{" "}
                                    <strong>
                                        {data?.mechanic_type?.name ?? "N/A"}
                                    </strong>
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Building2 size={20} />
                                <span>
                                    Workshop:{" "}
                                    <strong>
                                        {data?.work_shop_name ?? "N/A"}
                                    </strong>
                                </span>
                            </div>

                            <div className="flex items-center gap-3 md:col-span-2">
                                <MapPin size={20} />
                                <span>
                                    Address:{" "}
                                    <strong>
                                        {data?.work_shop_address ?? "N/A"}
                                    </strong>
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin size={20} />
                                <span>
                                    <strong>City:</strong> {data?.city ?? "N/A"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin size={20} />
                                <span>
                                    <strong>Area:</strong> {data?.area ?? "N/A"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 md:col-span-2">
                                <User size={20} />
                                <span>
                                    <strong>Experience:</strong>{" "}
                                    {data?.years_of_experience ?? "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </EditLayout>
        </Deferred>
    );
};

export default Basic;
