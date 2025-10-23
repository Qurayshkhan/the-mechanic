import BackButton from "@/Components/BackButton";
import Card from "@/Components/Card";
import NavLink from "@/Components/NavLink";
import useLang from "@/hooks/useLang";
import MasterLayout from "@/Layouts/MasterLayout";
import React from "react";

const Edit = ({ children, user }) => {
    const { t } = useLang();
    return (
        <>
            <MasterLayout pageTitle={"Edit Role"}>
                <BackButton />
                <Card>
                    <div className="space-x-4 gap-2 flex items-center">
                        <NavLink
                            href={route("admin.roles.edit", role.id)}
                            active={route().current("admin.users.edit")}
                        >
                            {t("Basic")}
                        </NavLink>
                    </div>

                    <div className="mt-6">{children}</div>
                </Card>
            </MasterLayout>
        </>
    );
};

export default Edit;
