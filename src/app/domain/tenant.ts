import { DocRecord } from "./doc-record";

export class Tenant implements DocRecord {
    id: string;
    dateCreated: Date;
    name: string;
    type: string = 'tenant';
}