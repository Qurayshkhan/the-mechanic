import React from "react";

const PrimaryButton = ({
    type = "submit",
    className = "",
    disabled = false,
    children,
    onClick,
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
