import useLang from "@/hooks/useLang";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

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
    const { t } = useLang();

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

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
});
