// #### Создание и объединение перечислений
{
    enum UserRole {
        Admin = 'Admin',
        Editor = 'Editor',
        Viewer = 'Viewer'
    }

    enum AccountStatus {
        Active = 'Active',
        Suspended = 'Suspended',
        Banned = 'Banned'
    }


    const AllRolesAndStatuses = {
        ...UserRole,
        ...AccountStatus
    } as const;

    type RoleOrStatus = keyof typeof AllRolesAndStatuses;

    function getAccessLevel(value: RoleOrStatus): string {
        switch (value) {
            case UserRole.Admin:
            case AccountStatus.Active:
                return 'Full access';
            case UserRole.Editor:
                return 'Limited access';
            default:
                return 'No access';
        }
    }


    getAccessLevel(UserRole.Viewer);

    // @ts-expect-error
    getAccessLevel('Hacker')
}
