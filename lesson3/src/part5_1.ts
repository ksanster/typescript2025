// #### Оптимизация с помощью const enum
{
    const enum UserRole {
        Admin = 'Admin',
        Editor = 'Editor',
        Viewer = 'Viewer'
    }

    const enum AccountStatus {
        Active = 'Active',
        Suspended = 'Suspended',
        Banned = 'Banned'
    }

    function checkPermission(role:UserRole, status:AccountStatus):boolean {
        return (role !== UserRole.Viewer && status !== AccountStatus.Banned);
    }

    checkPermission(UserRole.Admin, AccountStatus.Active);
    checkPermission(UserRole.Viewer, AccountStatus.Active);

    // В результирующем js нет enums, вместо них inline-подстановки нужных констант

    // checkPermission("Admin" /* UserRole.Admin */, "Active" /* AccountStatus.Active */);
    // checkPermission("Viewer" /* UserRole.Viewer */, "Active" /* AccountStatus.Active */);
}
