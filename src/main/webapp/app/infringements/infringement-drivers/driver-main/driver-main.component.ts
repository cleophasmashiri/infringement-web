import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-driver-main',
  templateUrl: './driver-main.component.html',
  styleUrls: ['./driver-main.component.scss'],
})
export class DriverMainComponent implements OnInit {
  background: any = undefined;
  links = [
    { name: 'In-Box', url: '/drivers/tasks' },
    { name: 'Infringements', url: '/drivers/infringements' },
    { name: 'Demerit points', url: '/drivers/demerit' },
    { name: 'My Fines', url: '/drivers/fines' },
    { name: 'Driver Information', url: '/drivers/info' },
  ];
  get currentUrl(): string {
    return this.router.url;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
