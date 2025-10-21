import React from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import { ArrowLeft } from "lucide-react";
import useLang from "@/hooks/useLang";
const BackButton = () => {
    const { t } = useLang();
    const goBack = () => {
        window.history.back();
    };
    return (
        <SecondaryButton className="my-2" onClick={goBack}>
            <div className="flex items-center gap-2">
                <ArrowLeft /> <span>{t("Back")}</span>
            </div>
        </SecondaryButton>
    );
};

export default BackButton;
