import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from "@angular/router";
import { QuoteService } from 'src/app/dashboard/quote/quote.service';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.scss']
})
export class QuoteDetailsComponent implements OnInit {

  private notifier: NotifierService;

  quote: any;

  quoteId: number;
  carId: number;

  quoteComment = new FormControl('');

  user = JSON.parse(localStorage.getItem('auth_user'));

  constructor(
    private location: Location,
    private quoteService: QuoteService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.quoteId = parseInt(params.get("quote_id"), 10);
      this.carId = parseInt(params.get("car_id"), 10);
      this.quoteService.getQuote(this.quoteId, this.carId)
        .subscribe((quote) => {
          this.quote = quote;
        })
    });
  }

  carDetails(car): string {
    return `${car && car.make} ${car && car.model} - ${car && car.trim}`;
  }

  backNav(): void {
    this.location.back();
  }

  createComment(): void {
    if (this.quoteComment.value.length < 1) return;
    const commentObject: string = JSON.stringify({
      text: this.quoteComment.value,
      user_id: this.user.id,
      quote_id: this.quote.id,
    });
    const formControl = this.quoteComment;
    this.quoteService.addQuoteComment(this.quote.id, commentObject, this.carId)
      .subscribe((newComment) => {
        this.notifier.notify('success', 'Quote comment created');
        formControl.reset();
        this.quoteService.getQuote(newComment.quote_id, this.carId)
          .subscribe((quote) => {
            this.quote = quote;
          });
      });
  }

}
