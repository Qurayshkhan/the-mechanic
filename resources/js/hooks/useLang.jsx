import { usePage } from "@inertiajs/react";

export default function useLang() {
    const { locale, translations } = usePage().props;
    const t = (key) => translations[key] || key;
    return { t, locale };
}
