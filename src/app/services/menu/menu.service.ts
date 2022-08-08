import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private amount: Number = 10;
  private algorithmsSelected: String = "Bubble";
  readonly algorithms: Array<String> = ["Bubble", "Insertion", "Select"];

  sort = new EventEmitter();
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

  set Amount(amount: Number) {
    this.amount = amount;
  }

  get Amount(): Number {
    return this.amount;
  }

}
