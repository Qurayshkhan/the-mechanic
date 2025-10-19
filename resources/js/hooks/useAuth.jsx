import { usePage } from "@inertiajs/react";
import React from "react";

function useAuth() {
    const { auth } = usePage().props;
    return auth?.user || null;
}

export default useAuth;
