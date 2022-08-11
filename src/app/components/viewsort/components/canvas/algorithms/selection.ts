import Node from "src/app/components/viewsort/components/canvas/node/node";
import Algorithm from "src/app/components/viewsort/components/canvas/algorithms/algorithm";
import Bubble from "./bubble";

export default class Selection extends Algorithm {
    static readonly COLOR_POINTER = [51, 25, 76];
    static readonly COLOR_ORDENED = [255, 255, 255];
    static readonly COLOR_SMALL = [178, 153, 204];

    private indexSmall = 0;
    private indexPointer = 1;
    private isOrdened = false;
    private hasFoundSmall = false;
    private countSmall = 0;

    private step1 = false;
    private step2 = false;
    private step3 = false;

    constructor() {
        super();

        this.init();
    }

    isAnimation(): Boolean {
        return (this.hasFoundSmall && (this.indexPointer < this.indexSmall) && !this.step3);
    }

    SpeedAux(): number {
        return (Math.abs(this.indexPointer - this.indexSmall));
    }

    init(): void {
        this.toStart = false;
        this.isOrdened = false;
        this.indexSmall = 0;
        this.indexPointer = 0;
        this.hasFoundSmall = false;
        this.countSmall = 0;
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;

        if (this.nodes.length >= 2) {
            this.PointerNode.setColor(Selection.COLOR_POINTER);
            this.SmallNode.setColor(Selection.COLOR_SMALL);
        }
    }

    sort(): void {
        if (!this.toStart)
            return;

        if (!this.isOrdened) {
            if (this.hasFoundSmall && (this.indexPointer < this.indexSmall) && !this.step3) {
                this.animation();
            }
            else {
                this.step1 = false;
                this.step2 = false;
                this.step3 = false;

                this.nextIndex(this.indexPointer + 1);

                this.PointerNode.setColor(Selection.COLOR_POINTER);
                this.SmallNode.setColor(Selection.COLOR_SMALL);
            }
        }
        else {
            this.SmallNode.setColor(Node.COLOR_DEFAULT);
            this.PointerNode.setColor(Node.COLOR_DEFAULT);
        }
    }

    private animation() {
        if (!this.step1) {
            const { Pos, PosOrigin } = this.PointerNode;

            this.PointerNode.toTop();
            this.SmallNode.toBot();

            if (Pos[Node.POS_Y] <= PosOrigin[Node.POS_Y] - Node.WIDTH - Node.GAP) {
                this.step1 = true;
            }
        }
        else if (!this.step2) {
            const { Pos } = this.PointerNode;
            const { PosOrigin } = this.SmallNode;

            this.PointerNode.toRight();
            this.SmallNode.toLeft();

            if (Pos[Node.POS_X] >= PosOrigin[Node.POS_X]) {
                this.step2 = true;
            }
        }
        else if (!this.step3) {
            const { Pos, PosOrigin } = this.PointerNode;

            this.PointerNode.toBot();
            this.SmallNode.toTop();

            if (Pos[Node.POS_Y] >= PosOrigin[Node.POS_Y]) {
                this.PointerNode.PosOrigin[Node.POS_X] = this.PointerNode.Pos[Node.POS_X];
                this.PointerNode.PosOrigin[Node.POS_Y] = this.PointerNode.Pos[Node.POS_Y];
                this.SmallNode.PosOrigin[Node.POS_X] = this.SmallNode.Pos[Node.POS_X];
                this.SmallNode.PosOrigin[Node.POS_Y] = this.SmallNode.Pos[Node.POS_Y];
                var temp = this.PointerNode;
                this.Nodes[this.indexPointer] = this.Nodes[this.indexSmall];
                this.Nodes[this.indexSmall] = temp;
                this.step3 = true;
                this.hasFoundSmall = false;
                this.countSmall++;
                this.indexSmall = this.countSmall;
            }
        }
    }

    private nextIndex(newPointerIndex: number) {
        this.SmallNode.setColor(Node.COLOR_DEFAULT);
        this.PointerNode.setColor(Node.COLOR_DEFAULT);

        if (newPointerIndex > this.Nodes.length - 1) {
            if (this.countSmall === this.Nodes.length - 1) {
                this.isOrdened = true;
                return;
            }
            if (this.countSmall === this.indexSmall) {
                this.countSmall++;
                this.indexPointer = this.countSmall;
                this.indexSmall = this.indexPointer;
            }
            else {
                this.hasFoundSmall = true;
                this.indexPointer = this.countSmall;
            }
        }
        else {
            this.indexPointer = newPointerIndex;
            if (this.Nodes[this.indexPointer].Value < this.Nodes[this.indexSmall].Value)
                this.indexSmall = this.indexPointer;
        }
    }

    private get SmallNode() {
        return (this.nodes[this.indexSmall]);
    }

    private get PointerNode() {
        return (this.nodes[this.indexPointer]);
    }
}
