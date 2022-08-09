import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  static readonly BUBBLE_SORT = "Bubble";

  private amount: number = 10;
  private frameRate: number = 3;
  private algorithmsSelected: String = MenuService.BUBBLE_SORT;

  readonly algorithms: Array<String> = [MenuService.BUBBLE_SORT];

  start = new EventEmitter();
  pause = new EventEmitter();
  reset = new EventEmitter();

  constructor() {
    this.algorithmsSelected = this.algorithms[0];
  }

  set FrameRate(frameRate: number) {
    this.frameRate = frameRate;
  }

  get FrameRate(): number {
    return this.frameRate;
  }

  set AlgorithmsSelected(selected: String) {
    this.algorithmsSelected = selected;
  }

  get AlgorithmsSelected(): String {
    return this.algorithmsSelected;
  }

  set Amount(amount: number) {
    this.amount = amount;
  }

  get Amount(): number {
    return this.amount;
  }

}
