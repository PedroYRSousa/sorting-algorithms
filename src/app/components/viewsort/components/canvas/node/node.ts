export default class Node {

    protected graphic: any;
    protected selected: boolean;
    protected value: number = -1;
    protected color: Array<number> = Node.COLOR_DEFAULT;
    protected pos: Array<number> = [-1, -1];
    protected posOrigin: Array<number> = [-1, -1];

    static readonly GAP = 5;
    static readonly SPEED = 10;
    static readonly POS_X = 0;
    static readonly POS_Y = 1;
    static readonly COLOR_RED = 0;
    static readonly COLOR_GREEN = 0;
    static readonly COLOR_BLUE = 0;
    static readonly COLOR_DEFAULT = [102, 51, 153];
    static readonly WIDTH = 50;
    static readonly HEIGHT = 50;

    constructor(graphic: any) {
        this.selected = false;
        this.graphic = graphic;
        this.value = (parseInt)(((Math.random() * (99 - 0)).toString()));
    }

    static createNodes(amount: number, s: any): Array<Node> {
        const width = 50;
        const height = 50;
        var nodes: Array<Node> = [];

        while (amount > 0) {
            const node: Node = new Node(s.createGraphics(width, height))

            node.draw();
            nodes.push(node);
            amount--;
        }
        return (nodes);
    }

    static showNodes(nodes: Array<any>, s: any) {
        var index: number = 0;

        if (!nodes)
            return;

        while (index < nodes.length) {
            const node: Node = nodes[index];
            const { width, height } = node.graphic;

            if (node.pos[Node.POS_X] === -1) {
                const poxX = ((s.width / 2) - ((width * (nodes.length / 2)) + (Node.GAP * (nodes.length / 2))));
                node.pos[Node.POS_X] = ((width + Node.GAP) * index) + poxX;
                node.posOrigin[Node.POS_X] = node.pos[Node.POS_X];
            }

            if (node.pos[Node.POS_Y] === -1) {
                const poxY = ((s.height / 2) - (height / 2));
                node.pos[Node.POS_Y] = poxY;
                node.posOrigin[Node.POS_Y] = node.pos[Node.POS_Y]
            }

            s.image(node.graphic, node.pos[Node.POS_X], node.pos[Node.POS_Y])
            index++;
        }
    }

    set Value(value: number) {
        this.value = value;
    }

    get Value(): number {
        return (this.value);
    }

    set Pos(pos: number[]) {
        this.pos = pos;
    }

    get Pos(): number[] {
        return (this.pos);
    }

    set PosOrigin(posOrigin: number[]) {
        this.posOrigin = posOrigin;
    }

    get PosOrigin(): number[] {
        return (this.posOrigin);
    }

    setColor(color: Array<number>) {
        this.color = color;
        this.draw();
    }

    toTop(deltaTime: number, speed: number) {
        this.pos[Node.POS_Y] -= speed * (deltaTime / 1000);
    }

    toLeft(deltaTime: number, speed: number) {
        this.pos[Node.POS_X] -= speed * (deltaTime / 1000);
    }

    toRight(deltaTime: number, speed: number) {
        this.pos[Node.POS_X] += speed * (deltaTime / 1000);
    }

    toBot(deltaTime: number, speed: number) {
        this.pos[Node.POS_Y] += speed * (deltaTime / 1000);
    }

    private draw() {
        this.createRect();
        this.createText();
    }

    private createRect() {
        this.graphic
            .fill(this.color[0], this.color[1], this.color[2])
            .noStroke()
            .rect(0, 0, Node.WIDTH, Node.HEIGHT);
    }

    private createText() {
        this.graphic
            .fill(255)
            .textSize(25)
            .textAlign(this.graphic.CENTER)
            .text(this.value, Node.WIDTH / 2, Node.HEIGHT / 2 + 25 / 3);
    }
}
