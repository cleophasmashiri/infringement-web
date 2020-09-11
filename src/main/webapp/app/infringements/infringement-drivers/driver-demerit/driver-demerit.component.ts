import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-driver-demerit',
  templateUrl: './driver-demerit.component.html',
  styleUrls: ['./driver-demerit.component.scss'],
})
export class DriverDemeritComponent implements OnInit {
  displayedColumns: any[] = ['description', 'created', 'points'];
  items: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  showItemView(): void {}
}
