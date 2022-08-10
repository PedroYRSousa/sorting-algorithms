import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import Sketch from './sketch/sketch';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnDestroy, OnInit {

  private sketch!: Sketch;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLElement>;

  constructor(private _menuService: MenuService) {
  }

  ngOnInit(): void {
    this._menuService.setAlgorithm.subscribe(() => this.init());
    this.init();
  }

  ngOnDestroy() {
    this.sketch?.removeSkecth();
  }

  init() {
    this.sketch?.removeSkecth();
    this.sketch = new Sketch(this._menuService, this.canvas.nativeElement);
  }
}
