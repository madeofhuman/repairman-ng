import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/car/car.service';
import { Car } from 'src/app/shared/models';

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

  getCars(): void {
    this.carService.getCars()
      .subscribe((cars) => this.cars = cars);
  }

}
