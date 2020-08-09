import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfringementwebEntityModule } from './entities/entity.module';
import { BpmProcessModule } from 'app/bpm-process/bpm-process.module';

@NgModule({
  imports: [
    InfringementwebEntityModule,
    BpmProcessModule,
    RouterModule.forChild([
      {
        path: 'drivers',
        loadChildren: () => import('./infringement-drivers/drivers.module').then(m => m.DriversModule),
      },
      {
        path: 'infringements',
        loadChildren: () => import('./infringement-admin/admins.module').then(m => m.AdminsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class InfringementsModule {}
