import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RequestsComponent } from './requests/requests.component';
import { SettingsComponent } from './settings/settings.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';

@NgModule({
  declarations: [
    AdminSideBarComponent,
    AdminOverviewComponent,
    AdminComponent,
    RequestsComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  providers: []
})
export class AdminModule { }
