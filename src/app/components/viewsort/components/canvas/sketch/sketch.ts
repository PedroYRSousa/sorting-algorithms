import * as p5 from 'p5';

import { MenuService } from 'src/app/services/menu/menu.service';
import Node from 'src/app/components/viewsort/components/canvas/node/node';
import Bubble from 'src/app/components/viewsort/components/canvas/algorithms/bubble';
import Selection from 'src/app/components/viewsort/components/canvas/algorithms/selection';
import Algorithm from 'src/app/components/viewsort/components/canvas/algorithms/algorithm';

export default class Sketch {

    static readonly FRAME_RATE = 240;

    private readonly menuService: MenuService;
    private sketch!: p5;
    private alg!: Algorithm;
    private clientWidth: number;

    constructor(menuService: MenuService, element: HTMLElement) {
        this.menuService = menuService;
        this.clientWidth = element.clientWidth;
        this.sketch = new p5((s: any) => this.handleAnimation(s), element);

        this.initAlg();

        menuService.start.subscribe(() => this.alg?.start());
        menuService.pause.subscribe(() => this.alg?.pause());
        menuService.new.subscribe(() => this.alg?.new(this.menuService.Amount, this.sketch));
    }

    get Speed(): number { return this.menuService.Speed; }

    get Amount(): number { return this.menuService.Amount; }

    removeSkecth = () => this.sketch.remove();

    handleAnimation(s: any) {
        s.preload = () => {
            this.alg?.createNodes(this.Amount, s);
        }

        s.setup = () => {
            const aspectRatio = 16 / 9;
            const width = this.clientWidth * 0.95;
            const height = (width / (aspectRatio));

            s.createCanvas(width, height);
        };

        s.draw = async () => {
            s.frameRate((Sketch.FRAME_RATE * this.Speed) * this.alg.SpeedAux());
            s.background(0, 77, 178);
            Node.showNodes(this.alg?.Nodes, s);
            if (!(this.alg?.isAnimation()))
                s.frameRate((Sketch.FRAME_RATE * this.Speed) / 10);
            this.alg?.sort();
        };
    }

    private initAlg() {
        if (this.menuService.AlgorithmsSelected === MenuService.BUBBLE_SORT)
            this.alg = new Bubble();
        if (this.menuService.AlgorithmsSelected === MenuService.SELECTION_SORT)
            this.alg = new Selection();
    }
}
