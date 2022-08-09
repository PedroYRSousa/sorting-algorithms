import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  @Input() algorithm: String = "";

  constructor() { }

  ngOnInit(): void {
  }

}
