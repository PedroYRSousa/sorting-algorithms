import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';

@Component({
  selector: 'app-viewsort',
  templateUrl: './viewsort.component.html',
  styleUrls: ['./viewsort.component.scss']
})
export class ViewsortComponent implements OnInit {

  constructor(private _menuService: MenuService) { }

  ngOnInit(): void {
  }

  protected get AlgorithmsSelected(): String {
    return (this._menuService.AlgorithmsSelected);
  }

}
