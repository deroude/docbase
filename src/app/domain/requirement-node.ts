import { Requirement } from "./requirement";

export class RequirementNode {
    slug: string;
    children: RequirementNode[] = [];

    constructor(public requirement: Requirement, private parent?: RequirementNode) {
        this.slug = (parent ? parent.slug + "." : "REQ") + requirement.order;
    }

    toArray(): Requirement[] {
        let re: Requirement[] = [this.requirement];
        this.children
            .sort((c1, c2) => (c1.requirement.order || 0) - (c2.requirement.order || 0))
            .forEach(c => re.concat(c.toArray()));
        return re;
    }

    public static parse(raw: Requirement[], parent?: RequirementNode): RequirementNode[] {
        return raw
            .filter(r => parent ? r.parent === parent.requirement.id : r.parent === undefined)
            .map(r => new RequirementNode(r, parent))
            .map(r => {
                r.children = RequirementNode.parse(raw, r);
                return r;
            });
    }
}