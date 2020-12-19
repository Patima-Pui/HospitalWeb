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
