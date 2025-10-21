import useLang from "@/hooks/useLang";

export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    const { t } = useLang();
    return (
        <label
            {...props}
            className={`block text-sm font-medium text-gray-700 ` + className}
        >
            {value ? t(value) : children}
        </label>
    );
}
