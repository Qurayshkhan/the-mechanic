import React, { forwardRef } from "react";
import { Select as HeadlessSelect } from "@headlessui/react";

const Select = forwardRef(({ children, className = "", ...props }, ref) => {
    return (
        <HeadlessSelect
            ref={ref}
            {...props}
            className={`w-full rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm
                focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                dark:bg-gray-900 dark:text-white dark:border-gray-700
                dark:focus:border-white dark:focus:ring-white transition duration-150 ease-in-out
                ${className}`}
        >
            {children}
        </HeadlessSelect>
    );
});

Select.displayName = "Select";

export default Select;
