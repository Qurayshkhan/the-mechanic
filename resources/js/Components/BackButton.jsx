import React from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import { ArrowLeft } from "lucide-react";
const BackButton = () => {
    const goBack = () => {
        window.history.back();
    };
    return (
        <SecondaryButton className="my-2" onClick={goBack}>
            <div className="flex items-center gap-2">
                <ArrowLeft /> <span>Back</span>
            </div>
        </SecondaryButton>
    );
};

export default BackButton;
