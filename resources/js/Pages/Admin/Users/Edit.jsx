import React from "react";
import BackButton from "@/Components/BackButton";
import Card from "@/Components/Card";
import MasterLayout from "@/Layouts/MasterLayout";
import useLang from "@/hooks/useLang";
import NavLink from "@/Components/NavLink";

const Edit = ({ children, user }) => {
    const { t } = useLang();

    return (
        <MasterLayout pageTitle={"Edit User"}>
            <BackButton />
            <Card>
                <div className="space-x-4 gap-2 flex items-center">
                    <NavLink
                        href={route("admin.users.edit", { user: user.id })}
                        active={route().current("admin.users.edit")}
                    >
                        {t("Basic")}
                    </NavLink>
                </div>

                <div className="mt-6">{children}</div>
            </Card>
        </MasterLayout>
    );
};

export default Edit;
