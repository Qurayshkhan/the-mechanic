import Card from "@/Components/Card";
import Loading from "@/Components/Loading";
import PageHeading from "@/Components/PageHeading";
import { can, getVariant } from "@/helpers";
import useAuth from "@/hooks/useAuth";
import MasterLayout from "@/Layouts/MasterLayout";
import { Head, Link, router, useRemember, Deferred } from "@inertiajs/react";
import { Edit, Eye } from "lucide-react";
import React, { useState } from "react";
import useLang from "@/hooks/useLang";
import Pagination from "@/Components/Pagination";
import Badge from "@/Components/Badge";
import SuccessButton from "@/Components/SuccessButton";
import WarningButton from "@/Components/WarningButton";

const Report = ({ mechanics, filters }) => {
    const { t } = useLang();
    const userAuth = useAuth();
    const [isVerifying, setIsVerifying] = useState(false);
    const handleVerifiedAndUnverifiedStatus = (mechanicId, status) => {
        setIsVerifying(true);
        router.put(
            route("admin.mechanics.updateStatus", mechanicId),
            {
                is_verified: status,
            },
            {
                onSuccess: () => {
                    setIsVerifying(false);
                },
            }
        );
    };
    return (
        <MasterLayout pageTitle="Mechanics">
            <PageHeading
                title="Mechanics"
                description="Manage and control mechanics accounts in the system."
                permission="view_mechanics"
                // routeName="admin.user.create"
                // isCreateBtn={true}
                btnName={"New User"}
            />
            <Deferred
                data={["mechanics"]}
                fallback={<Loading title="mechanics" />}
            >
                <div className="overflow-x-auto rounded-lg shadow-sm">
                    <table className="w-full border-collapse text-sm text-gray-700">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs">
                                    {t("Name")}
                                </th>
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs">
                                    {t("Email")}
                                </th>
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs">
                                    {t("Phone")}
                                </th>
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs">
                                    {t("Status")}
                                </th>
                                {/* <th className="py-3 px-4 text-left font-semibold uppercase text-xs">
                                    {t("Verified")}
                                </th> */}
                                <th className="py-3 px-4 text-left font-semibold uppercase text-xs">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {mechanics?.data?.length > 0 ? (
                                mechanics?.data?.map((mechanic, index) => (
                                    <tr
                                        key={mechanic.id}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="py-3 px-4 font-medium">
                                            {mechanic?.mechanic?.name ?? "N/A"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {mechanic?.mechanic?.email ?? "N/A"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {mechanic?.mechanic?.phone_no ??
                                                "N/A"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {mechanic?.status ? (
                                                <Badge
                                                    variant={getVariant(
                                                        mechanic.status
                                                    )}
                                                >
                                                    {mechanic.status}
                                                </Badge>
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>

                                        <td className="py-3 px-4">
                                            <div className="flex  items-center gap-3">
                                                {mechanic?.is_verified ? (
                                                    <SuccessButton
                                                        disabled={isVerifying}
                                                        onClick={() =>
                                                            handleVerifiedAndUnverifiedStatus(
                                                                mechanic.mechanic_id,
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Verified
                                                    </SuccessButton>
                                                ) : (
                                                    <WarningButton
                                                        disabled={isVerifying}
                                                        onClick={() =>
                                                            handleVerifiedAndUnverifiedStatus(
                                                                mechanic.mechanic_id,
                                                                true
                                                            )
                                                        }
                                                    >
                                                        Unverified
                                                    </WarningButton>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-6 text-center text-gray-500"
                                    >
                                        {t("No users found")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center md:justify-end mt-4">
                    <Pagination
                        links={mechanics?.links}
                        from={mechanics?.from}
                        to={mechanics?.to}
                        total={mechanics?.total}
                    />
                </div>
            </Deferred>
        </MasterLayout>
    );
};

export default Report;
