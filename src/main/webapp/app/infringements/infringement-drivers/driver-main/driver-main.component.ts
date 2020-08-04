import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-driver-main',
  templateUrl: './driver-main.component.html',
  styleUrls: ['./driver-main.component.scss'],
})
export class DriverMainComponent implements OnInit {
  background: any = undefined;
  links = [
    { name: 'Tasks', url: '/drivers/tasks' },
    { name: 'Infringements', url: '/drivers/infringements' },
    { name: 'Demerit points', url: '/drivers/demerit' },
  ];
  activeLink = this.links[0];

  constructor() {}

  ngOnInit(): void {}
}
