import { EventEmitter, Injectable } from '@angular/core';

import Sketch from 'src/app/components/viewsort/components/canvas/sketch/sketch'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  static readonly FRAME_RATE = Sketch.FRAME_RATE;
  static readonly BUBBLE_SORT = "Bubble";
  static readonly SELECTION_SORT = "Selection";

  private speed: number = 1;
  private amount: number = 10;
  private algorithmsSelected: String = MenuService.BUBBLE_SORT;

  readonly algorithms: Array<String> = [MenuService.BUBBLE_SORT];

  new = new EventEmitter();
  start = new EventEmitter();
  pause = new EventEmitter();
  setAlgorithm = new EventEmitter();

  constructor() {
    this.algorithmsSelected = this.algorithms[0];
  }

  set AlgorithmsSelected(selected: String) {
    this.algorithmsSelected = selected;
    this.setAlgorithm.emit();
  }

  get AlgorithmsSelected(): String {
    return this.algorithmsSelected;
  }

  set Speed(speed: number) {
    this.speed = speed;
  }

  get Speed(): number {
    if (this.speed > 1)
      this.speed = 1;
    if (this.speed <= 0.1)
      this.speed = 0.1;

    return this.speed;
  }

  set Amount(amount: number) {
    this.amount = amount;
  }

  get Amount(): number {
    if (this.amount > 15)
      this.amount = 15;
    if (this.amount <= 0)
      this.amount = 0;

    return this.amount;
  }

}
