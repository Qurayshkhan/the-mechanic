import { Home, Shield, Users, Users2 } from "lucide-react";

export const links = [
    {
        name: "Dashboard",
        link: "dashboard",
        icon: <Home />,
        type: "view_dashboard",
    },
    {
        name: "Roles & Permissions",
        link: "admin.roles",
        icon: <Shield />,
        type: "view_role_and_permission",
    },
    {
        name: "User Management",
        link: "admin.users",
        icon: <Users2 />,
        type: "view_users",
    },
];
