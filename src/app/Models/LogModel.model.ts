export class LogModel {
    // public Id: number;
    public action: string;
    public target: string;
    public createName: string;
    public createDate: Date;
}

export class LogModelList {
    public logtable: LogModel[];
}
