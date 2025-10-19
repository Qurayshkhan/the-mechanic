import { Home, Shield, Users } from "lucide-react";

export const links = [
    {
        name: "Dashboard",
        link: "dashboard",
        icon: <Home />,
        type: "view_dashboard",
    },
    {
        name: "Roles & Permissions",
        link: "admin.rolesAndPermissions",
        icon: <Shield />,
        type: "view_role_and_permission",
    },
];
