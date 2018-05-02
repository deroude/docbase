import { DocRecord } from './doc-record';

export class Account implements DocRecord {
    id: string;
    dateCreated: Date;
    name: string;
    type: string = 'account';
    parent: string;
}
