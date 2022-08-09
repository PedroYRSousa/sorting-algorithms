import * as p5 from 'p5';
import Node from './node';
import { Component, OnInit, OnDestroy, OnChanges, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import Bubble from './bubble';
import Algorithm from './algorithm';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnDestroy, OnInit, OnChanges {

  private sketch!: p5;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLElement>;

  constructor(private _menuService: MenuService) {
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy() {
    this.sketch.remove();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sketch.remove();
    this.init();
  }

  refresh = () => {
    this.sketch.remove();
    this.init();
  }

  init() {
    const { clientWidth } = this.canvas.nativeElement;

    this.sketch = new p5((s: any) => {
      var alg: Algorithm;
      var nodes: Array<Node> = [];

      s.preload = () => {
      }

      s.setup = () => {
        s.noCursor();
        const aspectRatio = 16 / 9;
        const width = clientWidth * 0.95;
        const height = (width / (aspectRatio));

        s.frameRate(this._menuService.FrameRate);

        s.createCanvas(width, height);
        nodes = Node.createNodes(this._menuService.Amount, s);

        if (this._menuService.AlgorithmsSelected === "Bubble")
          alg = new Bubble(nodes);
      };

      s.draw = () => {
        s.background(0, 77, 178);
        Node.showNodes(nodes, s);
        alg.start();
      };

    }, this.canvas.nativeElement);
  }

}
