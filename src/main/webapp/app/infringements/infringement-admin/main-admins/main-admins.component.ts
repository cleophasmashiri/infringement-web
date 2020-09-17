import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'jhi-main-admins',
  templateUrl: './main-admins.component.html',
  styleUrls: ['./main-admins.component.scss'],
})
export class MainAdminsComponent implements OnInit {
  links = [
    { name: 'Tasks', url: '/staff/infringements/tasks' },
    { name: 'Create Infringement', url: '/staff/infringements/startprocess/trafficProcess' },
    { name: 'Infringements', url: '/staff/infringements/list' },
    { name: 'Drivers', url: '/staff/infringements/drivers' },
    { name: 'Vehicles', url: '/staff/infringements/vehicles' },
  ];
  routes?: Route[] = [];
  background: any = undefined;

  get currentUrl(): string {
    return this.router.url;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
