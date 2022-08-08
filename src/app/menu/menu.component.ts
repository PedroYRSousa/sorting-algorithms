import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(protected _menuService: MenuService) {
  }

  ngOnInit(): void {
  }

  protected reset() {
    this._menuService.sort.emit(this.Amount);
  }

  protected sort() {
    this._menuService.reset.emit(this.Amount);
  }

  protected set AlgorithmsSelected(algorithm: String) {
    this._menuService.AlgorithmsSelected = algorithm;
    this.reset();
  }

  protected get AlgorithmsSelected() {
    return this._menuService.AlgorithmsSelected;
  }

  protected set Amount(newAmount: Number) {
    this._menuService.Amount = newAmount;
  }

  protected get Amount(): Number {
    return this._menuService.Amount;
  }

  protected getClassButton(algorithm: String): String {
    if (this.AlgorithmsSelected === algorithm)
      return ('selected');

    return ('not-selected');
  }

}
