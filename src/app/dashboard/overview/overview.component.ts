import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/models';
import { CarService } from '../car/car.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

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
