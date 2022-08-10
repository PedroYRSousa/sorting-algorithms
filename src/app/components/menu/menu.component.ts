import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  protected readonly WIDTH = window.innerWidth;
  protected readonly FRAME_RATE = MenuService.FRAME_RATE;

  constructor(protected _menuService: MenuService) {
  }

  ngOnInit(): void {
  }

  protected new() {
    this._menuService.reset.emit();
  }

  protected start() {
    this._menuService.start.emit();
  }

  protected pause() {
    this._menuService.pause.emit();
  }

  protected set AlgorithmsSelected(algorithm: String) {
    this._menuService.AlgorithmsSelected = algorithm;
    this.new();
  }

  protected get AlgorithmsSelected() {
    return this._menuService.AlgorithmsSelected;
  }

  protected set Speed(newSpeed: number) {
    this._menuService.Speed = newSpeed;
  }

  protected get Speed(): number {
    return this._menuService.Speed;
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
