export class PatientModel {
    public hn: number;
    public name: string;
    public surname: string;
    public age: number;
    public birthday: Date;
    public typeId: number;
    public typeName: string;
    public visit: number;
}
export class PatientModelList {
    public patienttable: PatientModel[];
}
export class DropdownTypeModel {
    public Id: number;
    public name: string;
}
export class DropdownTypeModelList {
    public typelist: DropdownTypeModel[];
}
