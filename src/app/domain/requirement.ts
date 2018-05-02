import { DocRecord } from "./doc-record";

export class Requirement implements DocRecord {
    id: string;
    dateCreated: Date;
    name: string;
    type: string = 'requirement';
    parent: string;
}