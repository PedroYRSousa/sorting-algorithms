import Node from "./node";
import Algorithm from "./algorithm";

export default class Bubble extends Algorithm {
    private isOrdened = false;
    private countIsOrdened = 0;
    private indexPrimary = 0;
    private indexSecundary = 1;

    constructor(nodes: Array<Node>) {
        super(nodes);
        this.indexPrimary = 0;
        this.indexSecundary = 1;
        this.init();
    }

    init(): void {
        if (this.nodes.length > 2) {
            this.nodes[this.indexPrimary]?.setColor(Node.COLOR_SELECT_1);
            this.nodes[this.indexSecundary]?.setColor(Node.COLOR_SELECT_2);
        }
    }

    start(): void {
        if (!this.isOrdened) {
            if (this.PrimaryNode.Value > this.SecundaryNode.Value) {
                var temp = this.PrimaryNode.Value;
                this.PrimaryNode.Value = this.SecundaryNode.Value;
                this.SecundaryNode.Value = temp;
                this.isOrdened = false;
                this.countIsOrdened = 0;
            }
            else {
                this.nextIndex(this.indexPrimary + 1);

                this.PrimaryNode.setColor(Node.COLOR_SELECT_1);
                this.SecundaryNode.setColor(Node.COLOR_SELECT_2);
                this.countIsOrdened++;
            }
            if (this.countIsOrdened == this.nodes.length)
                this.isOrdened = true;
        }
        else
        {
            this.PrimaryNode.setColor(Node.COLOR_DEFAULT);
            this.SecundaryNode.setColor(Node.COLOR_DEFAULT);
            console.log("Aqui!!!");
        }
    }

    private nextIndex(newPrimaryIndex: number) {
        this.PrimaryNode.setColor(Node.COLOR_DEFAULT);
        this.SecundaryNode.setColor(Node.COLOR_DEFAULT);

        if (this.indexSecundary >= this.nodes.length - 1)
            newPrimaryIndex = 0;

        this.indexPrimary = newPrimaryIndex;
        this.indexSecundary = this.indexPrimary + 1;
    }

    private get PrimaryNode() {
        return (this.nodes[this.indexPrimary]);
    }

    private get SecundaryNode() {
        return (this.nodes[this.indexSecundary]);
    }
}
