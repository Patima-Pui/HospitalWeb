export class UserModel {
    public id: number;
    public name: string;
    public surname: string;
    public username: string;
    public date: Date;
}

export class UserModelList {
    public datatable: UserModel[];
}
////////////////////////////////////////////////////////
export class ResponseModel {
    public success: boolean;

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
    public Username: string;
    public Password: string;
    public RePassword: string;
    public Name: string;
    public Surname: string;
    public Telephone: string;
    public Email: string;
    public DepartmentId: number;

    public constructor(init?: Partial<RequestRegister>) {
        Object.assign(this, init);
    }
}
