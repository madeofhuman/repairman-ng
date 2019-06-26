import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/models';
import { CarService } from 'src/app/dashboard/car/car.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss']
})
export class AdminOverviewComponent implements OnInit {

  userDetails: any = JSON.parse(localStorage.getItem('auth_user'));
  cars: Car[];

  constructor(
    private carService: CarService
  ) { }

  ngOnInit() {
    this.getCars();
  }

  /**
   * Get a users cars
   * Set local variables and
   * @returns void
   */
  getCars(): void {
    this.carService.getCars()
      .subscribe((cars) => this.cars = cars);
  }

}
