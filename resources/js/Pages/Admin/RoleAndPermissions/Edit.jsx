import BackButton from "@/Components/BackButton";
import Card from "@/Components/Card";
import NavLink from "@/Components/NavLink";
import SecondaryButton from "@/Components/SecondaryButton";
import useLang from "@/hooks/useLang";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MasterLayout from "@/Layouts/MasterLayout";
import { ArrowLeft } from "lucide-react";
import React from "react";

const Edit = ({ children, role }) => {
    const { t } = useLang();
    return (
        <>
            <MasterLayout pageTitle={"Edit Role"}>
                <BackButton />
                <Card>
                    <div className="space-x-4 gap-2 flex items-center">
                        <NavLink
                            href={route("admin.roles.edit", role.id)}
                            active={route().current("admin.roles.edit")}
                        >
                            {t("Basic")}
                        </NavLink>
                        <NavLink
                            href={route("admin.roles.editPermissions", role.id)}
                            active={route().current(
                                "admin.roles.editPermissions"
                            )}
                        >
                            {t("Permissions")}
                        </NavLink>
                    </div>

                    <div className="mt-6">{children}</div>
                </Card>
            </MasterLayout>
        </>
    );
};

export default Edit;
