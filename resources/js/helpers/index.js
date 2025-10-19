export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const can = (user, permission) => {
    return user?.permissions?.includes(permission);
}


export const hasRole = (user, role) => {
    return user?.roles?.includes(role);
};
