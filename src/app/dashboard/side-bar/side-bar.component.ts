import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  /**
   * Verify user admin status
   * @returns boolean by subscribing to our authentication service
   */
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
