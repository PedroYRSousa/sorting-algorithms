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
    this._menuService.reset.emit();
  }

  protected sort() {
    this._menuService.sort.emit();
  }

  protected set AlgorithmsSelected(algorithm: String) {
    this._menuService.AlgorithmsSelected = algorithm;
    this.reset();
  }

  protected get AlgorithmsSelected() {
    return this._menuService.AlgorithmsSelected;
  }

  protected set Amount(newAmount: number) {
    this._menuService.Amount = newAmount;
  }

  protected get Amount(): number {
    return this._menuService.Amount;
  }

  protected getClassButton(algorithm: String): String {
    if (this.AlgorithmsSelected === algorithm)
      return ('selected');

    return ('not-selected');
  }

}
