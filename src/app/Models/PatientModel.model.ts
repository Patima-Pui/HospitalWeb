export class PatientModel {
    public HN: number;
    public name: string;
    public surname: string;
    public age: number;
    public birthday: Date;
    public type: string;
    public visit: number;
}
export class PatientModelList {
    public datatable: PatientModel[];
}
export class DropdownTypeModel {
    public Id: number;
    public name: string;
}
export class DropdownTypeModelList {
    public typelist: DropdownTypeModel[];
}
