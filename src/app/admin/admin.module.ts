import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RequestsComponent } from './requests/requests.component';
import { SettingsComponent } from './settings/settings.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';

@NgModule({
  declarations: [AdminComponent, RequestsComponent, SettingsComponent, AdminSideBarComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  providers: []
})
export class AdminModule { }
