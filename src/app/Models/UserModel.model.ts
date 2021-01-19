export class UserModel {
    public id: number;
    public username: string;
    public name: string;
    public surname: string;
    public createdate: Date;
    public roleName: string;
}

export class UserModelList {
    public usertable: UserModel[];
}

export class ResponseModel {
    public success: boolean;
    public message: string;
    public constructor(init?: Partial<ResponseModel>) {
        Object.assign(this, init);
    }
}

export class ResponseLoginModel {
    public success: boolean;
    public id: number;
    public constructor(init?: Partial<ResponseModel>) {
        Object.assign(this, init);
    }
}

export class RequestLogin {
    public Username: string;
    public Password: string;

    public constructor(init?: Partial<RequestLogin>) {
        Object.assign(this, init);
    }
}

export class RequestRegister {
    public Id: number;
    public Username: string;
    public Password: string;
    public RePassword: string;
    public Name: string;
    public Surname: string;
    public Telephone: string;
    public Email: string;
    public DepartmentId: number;
    public UpSertName: string;

    public constructor(init?: Partial<RequestRegister>) {
        Object.assign(this, init);
    }
}

export class UserProfileModel {
    public username: string;
    public name: string;
    public surname: string;
    public telephone: string;
    public email: string;
    public departmentId: number;

    public constructor(init?: Partial<UserProfileModel>) {
        Object.assign(this, init);
    }
}
export class UserDialogInfoModel {
    public username: string;
    public userId: number;

    public constructor(init?: Partial<UserDialogInfoModel>) {
        Object.assign(this, init);
    }
}
export class DropdownDepartmentModel {
    public id: number;
    public name: string;

    public constructor(init?: Partial<DropdownDepartmentModel>) {
        Object.assign(this, init);
    }
}

export class DropdownDepartmentModelList {
    public departmentList: DropdownDepartmentModel[];

    public constructor(init?: Partial<DropdownDepartmentModelList>){
        Object.assign(this, init);
    }
}

export class TestModel {
    public id: number;
    public name: string;
    public surname: string;
    public username: string;
    public date: Date;
}

export class TestModelList {
    public datatable: TestModel[];
}
