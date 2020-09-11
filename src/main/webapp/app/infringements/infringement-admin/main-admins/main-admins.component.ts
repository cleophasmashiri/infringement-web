import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { infringementsRoutes } from 'app/infringements/infringementsRoutes';

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
  activeLink = this.links[0];
  background: any = undefined;

  constructor() {}

  ngOnInit(): void {
    //this.routes = infringementsRoutes[0].children;
  }
}
