import Node from "src/app/components/viewsort/components/canvas/node/node";
import Algorithm from "src/app/components/viewsort/components/canvas/algorithms/algorithm";

export default class Bubble extends Algorithm {
    static readonly COLOR_PRIMARY = [51, 25, 76];
    static readonly COLOR_SECUNDARY = [178, 153, 204];

    private step1 = false;
    private step2 = false;
    private step3 = false;

    private indexPrimary = 0;
    private isOrdened = false;
    private indexSecundary = 1;

    constructor() {
        super();

        this.init();
    }

    isAnimation(): Boolean {
        return (this.PrimaryNode.Value > this.SecundaryNode.Value && !this.step3);
    }

    SpeedAux(): number {
        return (Math.abs(this.indexPrimary - this.indexSecundary));
    }

    init(): void {
        this.toStart = false;
        this.isOrdened = false;
        this.indexPrimary = 0;
        this.indexSecundary = 1;
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;

        if (this.nodes.length >= 2) {
            this.PrimaryNode.setColor(Bubble.COLOR_PRIMARY)
            this.SecundaryNode.setColor(Bubble.COLOR_SECUNDARY)
        }
    }

    sort(): void {
        if (!this.toStart)
            return;

        if (!this.isOrdened) {
            if (this.PrimaryNode.Value > this.SecundaryNode.Value && !this.step3) {
                this.switchNodes();
                this.isOrdened = false;
            }
            else {
                this.step1 = false;
                this.step2 = false;
                this.step3 = false;

                this.nextIndex(this.indexSecundary + 1);

                this.PrimaryNode.setColor(Bubble.COLOR_PRIMARY);
                this.SecundaryNode.setColor(Bubble.COLOR_SECUNDARY);
            }
        }
        else {
            this.PrimaryNode.setColor(Node.COLOR_DEFAULT);
            this.SecundaryNode.setColor(Node.COLOR_DEFAULT);
        }
    }

    private switchNodes() {
        if (!this.step1) {
            const { Pos, PosOrigin } = this.PrimaryNode;

            this.PrimaryNode.toTop();
            this.SecundaryNode.toBot();

            if (Pos[Node.POS_Y] <= PosOrigin[Node.POS_Y] - Node.WIDTH - Node.GAP) {
                this.step1 = true;
            }

            if (Pos[Node.POS_Y] >= PosOrigin[Node.POS_Y] + Node.WIDTH + Node.GAP) {
                this.step1 = true;
            }
        }
        else if (!this.step2) {
            const { Pos } = this.PrimaryNode;
            const { PosOrigin } = this.SecundaryNode;

            this.PrimaryNode.toRight();
            this.SecundaryNode.toLeft();

            if (Pos[Node.POS_X] >= PosOrigin[Node.POS_X]) {
                this.step2 = true;
            }
        }
        else if (!this.step3) {
            const { Pos, PosOrigin } = this.PrimaryNode;

            this.PrimaryNode.toBot();
            this.SecundaryNode.toTop();

            if (Pos[Node.POS_Y] >= PosOrigin[Node.POS_Y]) {
                this.PrimaryNode.PosOrigin[Node.POS_X] = this.PrimaryNode.Pos[Node.POS_X];
                this.PrimaryNode.PosOrigin[Node.POS_Y] = this.PrimaryNode.Pos[Node.POS_Y];
                this.SecundaryNode.PosOrigin[Node.POS_X] = this.SecundaryNode.Pos[Node.POS_X];
                this.SecundaryNode.PosOrigin[Node.POS_Y] = this.SecundaryNode.Pos[Node.POS_Y];
                var temp = this.PrimaryNode;
                this.Nodes[this.indexPrimary] = this.Nodes[this.indexSecundary];
                this.Nodes[this.indexSecundary] = temp;
                this.step3 = true;
            }
        }
    }

    private nextIndex(newSecundaryIndex: number) {
        this.PrimaryNode.setColor(Node.COLOR_DEFAULT);
        this.SecundaryNode.setColor(Node.COLOR_DEFAULT);

        if (newSecundaryIndex > this.nodes.length - 1) {
            this.indexPrimary += 1;
            if (this.indexPrimary > this.nodes.length - 2) {
                this.isOrdened = true;
                this.indexPrimary = 0;
            }
            this.indexSecundary = this.indexPrimary + 1;
        }
        else
            this.indexSecundary = newSecundaryIndex;
    }

    private get PrimaryNode() {
        return (this.nodes[this.indexPrimary]);
    }

    private get SecundaryNode() {
        return (this.nodes[this.indexSecundary]);
    }
}
