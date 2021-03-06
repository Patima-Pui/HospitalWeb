export class RoleModel {
    public id: number;
    public role: string;

    public constructor(init?: Partial<RoleModel>) {
        Object.assign(this, init);
    }
}

export class RoleModelList {
    public roleList: RoleModel[];
    public constructor(init?: Partial<RoleModel>) {
        Object.assign(this, init);
    }
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

export class RequestRoleModel {
    public username: string;
    public permissionList: PermissionModel[];

    public constructor(init?: Partial<RequestRoleModel>) {
        Object.assign(this, init);
    }
}
export class InsertRoleModel extends RequestRoleModel
{
    public roleName: string;

    public constructor(init?: Partial<InsertRoleModel>) {
        super(init);
    }
}

export class UpdateRoleModel extends RequestRoleModel
{
    public roleId: number;

    public constructor(init?: Partial<UpdateRoleModel>) {
        super(init);
    }
}

export class PermissionByUserIdModelList
{
    public role: string;
    public permissions: PermissionModel[];

    public constructor(init?: Partial<PermissionByUserIdModelList>) {
        Object.assign(this, init);
    }
}
