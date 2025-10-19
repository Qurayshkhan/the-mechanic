import React from "react";
import clsx from "clsx";

/**
 * Badge Component
 *
 * A small UI element used to display status, labels, or categories.
 * Supports variants, sizes, and custom class overrides.
 */

const Badge = ({
    children,
    variant = "default",
    size = "md",
    className = "",
    icon: Icon,
}) => {
    const baseStyles =
        "inline-flex items-center font-medium rounded-full transition-colors duration-200";

    const variantStyles = {
        default: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        danger: "bg-red-100 text-red-800",
        warning: "bg-yellow-100 text-yellow-800",
        info: "bg-blue-100 text-blue-800",
    };

    const sizeStyles = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
    };

    return (
        <span
            className={clsx(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
        >
            {Icon && <Icon className="w-4 h-4 mr-1" />}
            {children}
        </span>
    );
};

export default Badge;
