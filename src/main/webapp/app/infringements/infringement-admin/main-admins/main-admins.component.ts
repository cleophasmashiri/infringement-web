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
    { name: 'Tasks', url: '/process/tasks' },
    { name: 'Create Infringement', url: '/infringements/startprocess/trafficProcess' },
    { name: 'Infringements', url: '/infringements/list' },
    { name: 'Drivers', url: '/infringements/drivers' },
    { name: 'Vehicles', url: '/infringements/vehicles' },
  ];
  routes?: Route[] = [];
  activeLink = this.links[0];
  background: any = undefined;

  constructor() {}

  ngOnInit(): void {
    //this.routes = infringementsRoutes[0].children;
  }
}
