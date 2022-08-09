import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  static readonly FRAME_RATE = 60;
  static readonly BUBBLE_SORT = "Bubble";

  private speed: number = 1;
  private amount: number = 10;
  private algorithmsSelected: String = MenuService.BUBBLE_SORT;

  readonly algorithms: Array<String> = [MenuService.BUBBLE_SORT];

  start = new EventEmitter();
  pause = new EventEmitter();
  reset = new EventEmitter();

  constructor() {
    this.algorithmsSelected = this.algorithms[0];
  }

  set AlgorithmsSelected(selected: String) {
    this.algorithmsSelected = selected;
  }

  get AlgorithmsSelected(): String {
    return this.algorithmsSelected;
  }

  set Speed(speed: number) {
    this.speed = speed;
  }

  get Speed(): number {
    if (this.speed > 15)
      this.speed = 15;
    if (this.speed <= 0)
      this.speed = 0;

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
