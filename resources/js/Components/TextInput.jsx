import useLang from "@/hooks/useLang";
import { Eye, EyeOff } from "lucide-react";

import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        placeholder = "",
        ...props
    },
    ref
) {
    const localRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useLang();
    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    if (type !== "password") {
        return (
            <input
                {...props}
                type={type}
                className={
                    "rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 " +
                    className
                }
                placeholder={t(placeholder)}
                ref={localRef}
            />
        );
    }
    return (
        <div className="relative">
            <input
                {...props}
                type={showPassword ? "text" : "password"}
                className={
                    "rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 pr-10 " +
                    className
                }
                placeholder={t(placeholder)}
                ref={localRef}
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                tabIndex={-1}
            >
                {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                ) : (
                    <Eye className="w-5 h-5" />
                )}
            </button>
        </div>
    );
});
