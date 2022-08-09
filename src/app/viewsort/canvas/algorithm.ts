import Node from "./node";

export default abstract class Algorithm {
    protected nodes: Array<Node> = [];

    constructor(nodes: Array<Node>) {
        this.nodes = nodes;
    }

    abstract init(): void;
    abstract start(): void;

    // protected isOrdened(): boolean {
    //     for (let indexPrimary = 0; indexPrimary < this.nodes.length - 2; indexPrimary++) {
    //         var nodeP = this.nodes[indexPrimary];
    //         for (let indexSecundary = indexPrimary + 1; indexSecundary < this.nodes.length - 1; indexSecundary++) {
    //             var nodeS = this.nodes[indexSecundary];

    //             if (nodeS.Value < nodeP.Value)
    //                 return (false);
    //         }
    //     }
    //     return (true);
    // }
}
