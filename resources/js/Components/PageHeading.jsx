import React from "react";
import PrimaryButton from "./PrimaryButton";
import { can } from "@/helpers";
import useAuth from "@/hooks/useAuth";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import useLang from "@/hooks/useLang";

function PageHeading({
    title,
    description,
    permission,
    btnName,
    routeName,
    isCreateBtn = false,
}) {
    const user = useAuth();
    const { t } = useLang();
    return (
        <>
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {t(title)}
                    </h1>
                    <p className="text-gray-600">{t(description)}</p>
                </div>
                {isCreateBtn && (
                    <div className="flex space-x-3">
                        {can(user, permission) && (
                            <PrimaryButton
                                onClick={() => router.visit(route(routeName))}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                {t(btnName)}
                            </PrimaryButton>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default PageHeading;
