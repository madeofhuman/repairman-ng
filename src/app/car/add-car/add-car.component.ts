import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  private readonly notifier: NotifierService;
  make: string;
  year: number;
  trim: string;
  model: string;

  constructor(
    private carService: CarService,
    private router: Router,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
  }

  submitForm(make: any, year: any, model: any, trim: any) {
    if (!(make.valid && year.valid && model.valid && trim.valid)) {
      return this.notifier.notify('error', 'This form contains invalid entries!');
    }

    const carObject: string = JSON.stringify({
      make: make.value,
      year: year.value,
      model: model.value,
      trim: trim.value
    });

    this.carService.addCar(carObject)
      .subscribe(() => {
        this.notifier.notify('success', 'New car added to your collection!');
        this.goBack();
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard/cars']);
  }

}
