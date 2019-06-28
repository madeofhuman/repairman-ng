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
    this.carService.getAllCars()
      .subscribe((cars) => {
        console.log('cars>>>', cars)
        this.cars = cars;
      });
  }

  carDetails(car) {
    const carOwner = car.user.name === this.userDetails.name ? "you" : car.user.name;
    return `${car.make} ${car.model} - ${car.trim} by ${carOwner} (${car.quotes.length || 0} quotes)`;
  }

}
