import { Requirement } from "./requirement";

export class RequirementNode {
    slug: string;
    children: RequirementNode[] = [];

    constructor(public requirement: Requirement, private parent?: RequirementNode) {
        this.slug = (parent ? parent.slug + "." : "REQ") + requirement.order;
    }

    public static parse(raw: Requirement[], parent?: RequirementNode): RequirementNode[] {
        return raw
            .filter(r => parent ? r.parent === parent.requirement.id : (r.parent === undefined || r.parent === null))
            .sort((r1,r2)=>r1.order-r2.order)
            .map(r => new RequirementNode(r, parent))
            .map(r => {
                r.children = RequirementNode.parse(raw, r);
                return r;
            });
    }
}