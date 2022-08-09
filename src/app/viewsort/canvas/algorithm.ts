import Node from "./node";

export default abstract class Algorithm {
    protected toStart = false;
    protected nodes: Array<Node> = [];

    constructor() {

    }

    abstract init(): void;
    abstract sort(): void;
    abstract isAnimation(): Boolean;

    get Nodes(): Array<Node> {
        return this.nodes;
    }

    start(): void {
        this.toStart = true;
    }

    pause(): void {
        this.toStart = false;
    }

    reset(amount: number, s: any): void {
        this.toStart = false;
        this.createNodes(amount, s);
        console.clear();
    }

    createNodes(amount: number, s: any) {
        this.nodes = Node.createNodes(amount, s);
        this.init();
    }
}
