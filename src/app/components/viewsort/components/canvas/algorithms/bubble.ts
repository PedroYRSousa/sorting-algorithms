import Node from "src/app/components/viewsort/components/canvas/node/node";
import Algorithm from "src/app/components/viewsort/components/canvas/algorithms/algorithm";

export default class Bubble extends Algorithm {
    static readonly COLOR_PRIMARY = [51, 25, 76];
    static readonly COLOR_SECUNDARY = [178, 153, 204];

    private absorber = 0;
    private indexPrimary = 0;
    private isOrdened = false;
    private indexSecundary = 1;

    private step1 = false;
    private step2 = false;
    private step3 = false;

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
        this.absorber = 0;
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;

        if (this.nodes.length >= 2) {
            this.PrimaryNode.setColor(Bubble.COLOR_PRIMARY)
            this.SecundaryNode.setColor(Bubble.COLOR_SECUNDARY)
        }
    }

    sort(deltaTime: number, speed: number): void {
        if (!this.toStart)
            return;

        if (!this.isOrdened) {
            if (this.absorber <= (deltaTime * 1000) / speed) {
                this.absorber += deltaTime;
            }
            else if (this.PrimaryNode.Value > this.SecundaryNode.Value && !this.step3) {
                this.animation(deltaTime, speed);
                this.isOrdened = false;
            }
            else {
                this.absorber = 0;
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

    private animation(deltaTime: number, speed: number) {
        if (!this.step1) {
            const { Pos: pPos, PosOrigin: pPosOrigin } = this.PrimaryNode;
            const { Pos: sPos, PosOrigin: sPosOrigin } = this.SecundaryNode;

            this.PrimaryNode.toTop(deltaTime, speed * this.SpeedAux());
            this.SecundaryNode.toBot(deltaTime, speed * this.SpeedAux());

            if (pPos[Node.POS_Y] <= pPosOrigin[Node.POS_Y] - Node.WIDTH - Node.GAP) {
                this.step1 = true;
                if (pPos[Node.POS_Y] < pPosOrigin[Node.POS_Y] - Node.WIDTH - Node.GAP)
                    pPos[Node.POS_Y] = pPosOrigin[Node.POS_Y] - Node.WIDTH - Node.GAP
                if (sPos[Node.POS_Y] > sPosOrigin[Node.POS_Y] + Node.WIDTH + Node.GAP)
                    sPos[Node.POS_Y] = sPosOrigin[Node.POS_Y] + Node.WIDTH + Node.GAP
            }
        }
        else if (!this.step2) {
            const { Pos: pPos, PosOrigin: pPosOrigin } = this.PrimaryNode;
            const { Pos: sPos, PosOrigin: sPosOrigin } = this.SecundaryNode;

            this.PrimaryNode.toRight(deltaTime, speed * this.SpeedAux());
            this.SecundaryNode.toLeft(deltaTime, speed * this.SpeedAux());

            if (pPos[Node.POS_X] >= sPosOrigin[Node.POS_X]) {
                this.step2 = true;
                if (pPos[Node.POS_X] > sPosOrigin[Node.POS_X])
                    pPos[Node.POS_X] = sPosOrigin[Node.POS_X]
                if (sPos[Node.POS_X] < pPosOrigin[Node.POS_X])
                    sPos[Node.POS_X] = pPosOrigin[Node.POS_X]
            }
        }
        else if (!this.step3) {
            const { Pos: pPos, PosOrigin: pPosOrigin } = this.PrimaryNode;
            const { Pos: sPos, PosOrigin: sPosOrigin } = this.SecundaryNode;


            this.PrimaryNode.toBot(deltaTime, speed * this.SpeedAux());
            this.SecundaryNode.toTop(deltaTime, speed * this.SpeedAux());

            if (pPos[Node.POS_Y] >= pPosOrigin[Node.POS_Y]) {
                if (pPos[Node.POS_Y] > pPosOrigin[Node.POS_Y])
                    pPos[Node.POS_Y] = pPosOrigin[Node.POS_Y]
                if (sPos[Node.POS_Y] < sPosOrigin[Node.POS_Y])
                    sPos[Node.POS_Y] = sPosOrigin[Node.POS_Y]

                this.PrimaryNode.PosOrigin[Node.POS_X] = this.PrimaryNode.Pos[Node.POS_X];
                this.PrimaryNode.PosOrigin[Node.POS_Y] = this.PrimaryNode.Pos[Node.POS_Y];
                this.SecundaryNode.PosOrigin[Node.POS_X] = this.SecundaryNode.Pos[Node.POS_X];
                this.SecundaryNode.PosOrigin[Node.POS_Y] = this.SecundaryNode.Pos[Node.POS_Y];
                var temp = this.PrimaryNode;
                this.Nodes[this.indexPrimary] = this.Nodes[this.indexSecundary];
                this.Nodes[this.indexSecundary] = temp;
                this.step3 = true;
                this.absorber = 0;
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
