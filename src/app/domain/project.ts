import { DocRecord } from "./doc-record";

export class Project implements DocRecord {
    id:string;
    dateCreated: Date;
    name: string;
    type: string="project";
    parent: string;
}