import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link {...props} className={active ? "nav-link-active" : "nav-link"}>
            {children}
        </Link>
    );
}
