import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'driver',
        loadChildren: () => import('./driver/driver.module').then(m => m.InfringementwebDriverModule),
      },
      {
        path: 'vehicle',
        loadChildren: () => import('./vehicle/vehicle.module').then(m => m.InfringementwebVehicleModule),
      },
      {
        path: 'infringement',
        loadChildren: () => import('./infringement/infringement.module').then(m => m.InfringementwebInfringementModule),
      },
      {
        path: 'document',
        loadChildren: () => import('./document/document.module').then(m => m.InfringementwebDocumentModule),
      },
      {
        path: 'infringement-action',
        loadChildren: () => import('./infringement-action/infringement-action.module').then(m => m.InfringementwebInfringementActionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class InfringementwebEntityModule {}
