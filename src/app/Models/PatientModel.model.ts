export class PatientModel {
    public number: number;
    public HN: string;
    public name: string;
    public surname: string;
    public age: number;
    public birthday: Date;
    public typeId: number;
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
