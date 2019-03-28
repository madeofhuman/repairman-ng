import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private notifier: NotifierService;

  constructor(private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    const name = JSON.parse(localStorage.getItem('auth_user')).name;
    this.notifier.notify('info', `Welcome back, ${name}!`);
  }

}
