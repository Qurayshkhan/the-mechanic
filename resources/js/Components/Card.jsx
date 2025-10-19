import React from "react";
import PrimaryButton from "./PrimaryButton";

const Card = ({ children, title = "", isCreate, onClick }) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="">
                    <div className="p-2">{children}</div>
                </div>
            </div>
        </>
    );
};

export default Card;
