export class PatientModel {
    public hn: number;
    public name: string;
    public surname: string;
    public age: number;
    public birthday: Date;
    public typeId: number;
    public typeName: string;
    public visit: number;
    public appointment: Date;
    public doctor: string;
}
export class PatientModelList {
    public patienttable: PatientModel[];
}
export class DropdownTypeModel {
    public id: number;
    public name: string;

    public constructor(init?: Partial<DropdownTypeModel>) {
        Object.assign(this, init);
    }
}
export class DropdownTypeModelList {
    public typeList: DropdownTypeModel[];
}
