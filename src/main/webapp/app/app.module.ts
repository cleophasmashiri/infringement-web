import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { InfringementwebSharedModule } from 'app/shared/shared.module';
import { InfringementwebCoreModule } from 'app/core/core.module';
import { InfringementwebAppRoutingModule } from './app-routing.module';
import { InfringementwebHomeModule } from './home/home.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfringementsModule } from './infringements/infringements.module';
import { JhMaterialModule } from './jh-material.module';
import { SidenavListComponent } from './layouts/sidenav-list/sidenav-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { InfringementwebHomeStaffModule } from './home-staff/home-staff.module';

@NgModule({
  imports: [
    BrowserModule,
    InfringementwebSharedModule,
    InfringementwebCoreModule,
    InfringementwebHomeModule,
    InfringementwebHomeStaffModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    InfringementsModule,
    InfringementwebAppRoutingModule,
    BrowserAnimationsModule,
    JhMaterialModule,
    StoreModule.forRoot(reducers),
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    SidenavListComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
  ],
  bootstrap: [MainComponent],
})
export class InfringementwebAppModule {}
