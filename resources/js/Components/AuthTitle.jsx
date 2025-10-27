import React from "react";
import useLang from "@/hooks/useLang";

const AuthTitle = ({ title, subTitle }) => {
    const { t } = useLang();
    return (
        <>
            <h1 className="text-2xl text-center font-bold">{t(title)}</h1>
            <p className="text-sm text-gray-500 text-center mt-2">
                {t(subTitle)}
            </p>
        </>
    );
};

export default AuthTitle;
