import { usePage } from "@inertiajs/react";
import { useState } from "react";
import { Globe2, Check } from "lucide-react";

export default function LanguageSwitcher() {
    const { locale } = usePage().props;
    const [open, setOpen] = useState(false);

    const languages = [
        { code: "en", name: "English", flag: "gb" },
        { code: "ur", name: "اردو", flag: "pk" },
    ];

    return (
        <div className="relative">
            {/* Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
            >
                <span
                    className={`fi fi-${
                        locale === "en" ? "gb" : "pk"
                    } rounded-sm`}
                ></span>
                <span className="hidden sm:inline">
                    {locale === "en" ? "English" : "اردو"}
                </span>
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    onMouseLeave={() => setOpen(false)}
                    className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
                >
                    {languages.map((lang) => (
                        <a
                            key={lang.code}
                            href={route("language.switch", lang.code)}
                            className={`flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md ${
                                locale === lang.code
                                    ? "font-semibold text-indigo-600"
                                    : ""
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className={`fi fi-${lang.flag} rounded-sm`}
                                ></span>
                                <span>{lang.name}</span>
                            </div>
                            {locale === lang.code && (
                                <Check className="w-4 h-4 text-indigo-500" />
                            )}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
