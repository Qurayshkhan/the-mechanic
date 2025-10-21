import { Home, Shield, Users, Users2 } from "lucide-react";

export const links = [
    {
        name: "dashboard",
        link: "dashboard",
        icon: <Home />,
        type: "view_dashboard",
    },
    {
        name: "roles & permissions",
        link: "admin.rolesAndPermissions",
        icon: <Shield />,
        type: "view_role_and_permission",
    },
    {
        name: "user management",
        link: "admin.users",
        icon: <Users2 />,
        type: "view_users",
    },
];
