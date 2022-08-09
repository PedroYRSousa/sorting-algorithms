export default class Node {

    protected graphic: any;
    protected selected: boolean;
    protected value: number = -1;
    protected color: Array<number> = Node.COLOR_DEFAULT;
    protected pos: Array<number> = [-1, -1];
    protected posOrigin: Array<number> = [-1, -1];

    static readonly SPEED = 1;
    static readonly POS_X = 0;
    static readonly POS_Y = 1;
    static readonly COLOR_RED = 0;
    static readonly COLOR_GREEN = 0;
    static readonly COLOR_BLUE = 0;
    static readonly COLOR_DEFAULT = [102, 51, 153];
    static readonly COLOR_SELECT_1 = [51, 25, 76];
    static readonly COLOR_SELECT_2 = [178, 153, 204];
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
        const gap = 5;
        var index: number = 0;

        while (index < nodes.length) {
            const node: Node = nodes[index];
            const { width, height } = node.graphic;

            if (node.pos[Node.POS_X] === -1) {
                const poxX = ((s.width / 2) - ((width * (nodes.length / 2)) + (gap * (nodes.length / 2))));
                node.pos[Node.POS_X] = ((width + gap) * index) + poxX;
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

    setColor(color: Array<number>) {
        this.color = color;
        this.draw();
    }

    toTop() {
        this.pos[Node.POS_Y] -= Node.SPEED;
    }

    toLeft() {
        this.pos[Node.POS_X] -= Node.SPEED;
    }

    toRight() {
        this.pos[Node.POS_X] += Node.SPEED;
    }

    toBot() {
        this.pos[Node.POS_Y] += Node.SPEED;
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
