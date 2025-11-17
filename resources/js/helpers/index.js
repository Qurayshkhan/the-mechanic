export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const hasRole = (user, roleName) => {
    return user?.roles?.some((r) => r.name === roleName);
};

export const can = (user, permissionName) => {
    if (!user || !Array.isArray(user.roles)) return false;

    const userPermissions = user.roles.flatMap(
        (role) => role.permissions?.map((p) => p.name) || []
    );

    return userPermissions.includes(permissionName);
};

export const getVariant = (status) => {
    switch (status) {
        case "Pending":
            return "warning";

        case "Approved":
            return "success";

        case "Completed":
            return "info";

        case "Rejected":
            return "danger";

        case "Active":
            return "success";

        case "Inactive":
            return "warning";

        case "Blocked":
            return "danger";

        default:
            return "default";
    }
};
