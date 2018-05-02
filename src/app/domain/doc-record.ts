export interface DocRecord {
    id: string;
    dateCreated: Date;
    name: string;
    readonly type: string;
    parent?: string;
}