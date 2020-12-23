export class RoleModel {
    public id: number;
    public role: string;
}

export class RoleModelList {
    public roletable: RoleModel[];
}
export class PermissionModel {
    public permissionId: number;
    public permissionName: string;
    public permissionCheck: boolean;
}

export class PermissionModelList {
    public permissiontable: PermissionModel[];
}

export class PermissionByIdModelList {
    public permissionIdList: PermissionModel[];
}

export class UpsertRoleModel {
    public roleName: string;
    public username: string;
    public permissionList: PermissionModel[];

    public constructor(init?: Partial<UpsertRoleModel>) {
        Object.assign(this, init);
    }
}
