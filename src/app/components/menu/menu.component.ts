import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isStarted = false;
  isPaused = false;

  constructor(protected _menuService: MenuService) {
  }

  ngOnInit(): void {
  }

  protected new() {
    this._menuService.new.emit();
    this.isStarted = false;
    this.isPaused = false;
  }

  protected start() {
    this._menuService.start.emit();
    this.isStarted = true;
    this.isPaused = false;
  }

  protected pause() {
    this._menuService.pause.emit();
    this.isStarted = false;
    this.isPaused = true;
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
