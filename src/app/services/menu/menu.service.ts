import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  readonly algorithms: Array<String> = ["Bubble sort", "sort 1"];

  sort = new EventEmitter();
  reset = new EventEmitter();

  constructor() {
  }

}
