// resources/js/Components/Pagination.jsx
import React from "react";
import { router } from "@inertiajs/react";
import clsx from "clsx";

const Pagination = ({ links = [], from, to, total }) => {
    if (!links.length) return null;

    const handleClick = (url, e) => {
        e.preventDefault();
        if (!url) return;
        router.visit(url, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <nav className="flex flex-col md:flex-row gap-2 justify-between items-center mt-6 w-full">
            <div className="text-sm text-gray-600 flex items-center gap-1 font-bold">
                <p>{from}</p>
                <p>to</p>
                <p>{to}</p>
                <p>total</p>
                <p>{total}</p>
            </div>
            <ul className="flex flex-wrap items-center gap-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <button
                            onClick={(e) => handleClick(link.url, e)}
                            disabled={!link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={clsx(
                                "px-3 py-1.5 text-sm rounded-md border transition-colors duration-150",
                                link.active
                                    ? "bg-gray-600 text-white border-gray-600 cursor-default"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                                !link.url && "opacity-50 cursor-not-allowed"
                            )}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
