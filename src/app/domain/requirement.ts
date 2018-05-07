export class Requirement {
    id?: string;
    description: string;
    lastUpdated: Date;
    order?: number;
    status: string;
    title: string;
    parent?: string;
    author?: string;
    level?:number;
}