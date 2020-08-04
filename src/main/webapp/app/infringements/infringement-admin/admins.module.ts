import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAdminsComponent } from './main-admins/main-admins.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { JhMaterialModule } from 'app/jh-material.module';
import { InfringementwebSharedLibsModule } from 'app/shared/shared-libs.module';

@NgModule({
  declarations: [MainAdminsComponent],
  imports: [CommonModule, AdminsRoutingModule, JhMaterialModule, InfringementwebSharedLibsModule],
})
export class AdminsModule {}
