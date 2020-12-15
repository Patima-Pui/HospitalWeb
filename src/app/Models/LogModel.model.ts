export class LogModel {
    // public Id: number;
    public action: string;
    public targetName: string;
    public createName: string;
    public createDate: Date;
}

export class LogModelList {
    public logtable: LogModel[];
}
