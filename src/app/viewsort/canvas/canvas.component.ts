import * as p5 from 'p5';
import Node from './node';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import Bubble from './bubble';
import Algorithm from './algorithm';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnDestroy, OnInit {

  private alg!: Algorithm;
  private sketch!: p5;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLElement>;

  constructor(private _menuService: MenuService) {
    this._menuService.start.subscribe(() => this.alg?.start());
    this._menuService.pause.subscribe(() => this.alg?.pause());
    this._menuService.reset.subscribe(() => this.alg?.reset(this._menuService.Amount, this.sketch));
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy() {
    this.sketch.remove();
  }

  init() {
    const { clientWidth } = this.canvas.nativeElement;

    this.sketch = new p5((s: any) => {
      s.preload = () => {
        const { Amount, AlgorithmsSelected } = this._menuService;

        if (AlgorithmsSelected === MenuService.BUBBLE_SORT) {
          this.alg = new Bubble();
          this.alg.createNodes(Amount, s);
        }
      }

      s.setup = () => {
        s.noCursor();
        const aspectRatio = 16 / 9;
        const width = clientWidth * 0.95;
        const height = (width / (aspectRatio));
        const { FrameRate } = this._menuService;

        s.frameRate(FrameRate);

        s.createCanvas(width, height);
      };

      s.draw = () => {
        s.background(0, 77, 178);
        Node.showNodes(this.alg?.Nodes, s);
        this.alg?.sort();
      };

    }, this.canvas.nativeElement);
  }

}
