import BackButton from "@/Components/BackButton";
import Card from "@/Components/Card";
import NavLink from "@/Components/NavLink";
import MasterLayout from "@/Layouts/MasterLayout";
import React from "react";

const Edit = ({ children, mechanic }) => {
    console.log("🚀 ~ Edit ~ mechanic:", mechanic);
    return (
        <>
            <MasterLayout pageTitle="Edit Mechanics">
                <BackButton />
                <Card>
                    <div>
                        <NavLink
                            href={route("admin.mechanics.edit", {
                                mechanicInformation: mechanic?.id,
                            })}
                            active={route().current("admin.mechanics.edit")}
                        >
                            Info
                        </NavLink>
                    </div>
                    <div className="mt-6">{children}</div>
                </Card>
            </MasterLayout>
        </>
    );
};

export default Edit;
