import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private amount: number = 10;
  private algorithmsSelected: String = "Bubble sort"

  constructor(protected _menuService: MenuService) {
  }

  ngOnInit(): void {
    this.algorithmsSelected = this._menuService.algorithms[0];
  }

  protected reset() {
    this._menuService.sort.emit(this.Amount);
  }

  protected sort() {
    this._menuService.reset.emit(this.Amount);
  }

  protected set AlgorithmsSelected(algorithm: String) {
    this.algorithmsSelected = algorithm;
    this.reset();
  }

  protected set Amount(newAmount: number) {
    this.amount = newAmount;
  }

  protected get Amount(): number {
    return this.amount;
  }

  protected getClassButton(algorithm: String): String {
    if (this.algorithmsSelected === algorithm)
      return ('selected');

    return ('not-selected');
  }

}
