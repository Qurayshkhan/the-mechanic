import { Home, Settings, Shield, Users, Users2 } from "lucide-react";

export const links = [
    {
        name: "Dashboard",
        link: "dashboard",
        icon: <Home />,
        type: "view_dashboard",
        subLinks: [],
    },
    {
        name: "Roles & Permissions",
        link: "admin.roles",
        icon: <Shield />,
        type: "view_role_and_permission",
        subLinks: [],
    },
    {
        name: "User Management",
        link: "admin.users",
        icon: <Users2 />,
        type: "view_users",
        subLinks: [
            { name: "Users", link: "admin.users", type: "view_users" },
            {
                name: "Mechanics",
                link: "admin.mechanics",
                type: "view_mechanics",
            },
        ],
    },
];
