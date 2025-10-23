import useLang from "@/hooks/useLang";

export default function InputError({ message, className = "", ...props }) {
    const { t } = useLang();
    return message ? (
        <p {...props} className={"text-sm text-red-600 " + className}>
            {t(message)}
        </p>
    ) : null;
}
