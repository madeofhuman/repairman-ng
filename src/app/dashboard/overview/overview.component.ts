import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  userDetails: object = JSON.parse(localStorage.getItem('auth_user'));

  constructor() { }

  ngOnInit() {
  }

}
