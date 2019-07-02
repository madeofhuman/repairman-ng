import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from "@angular/router";
import { QuoteService } from 'src/app/dashboard/quote/quote.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {

  private notifier: NotifierService;

  quote: any;

  urlId: number;

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
    this.route.paramMap.subscribe(params => {
      this.urlId = parseInt(params.get("id"), 10);
    });
    this.quoteService.getQuote(this.urlId)
      .subscribe((quote) => {
        console.log('quote>>>', quote);
        this.quote = quote;
      })
  }

  carDetails(car): string {
    return car ? `${car && car.make} ${car && car.model} - ${car && car.trim}` : 'Toyota Corolla - XLE';
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
    console.log('commentObject>>>', commentObject);
    console.log('quot_id>>>>', this.quote.id);
    const formControl = this.quoteComment;
    this.quoteService.addQuoteComment(this.quote.id, commentObject)
      .subscribe((newComment) => {
        this.notifier.notify('success', 'Quote comment created');
        formControl.reset();
        this.quoteService.getQuote(newComment.quote_id)
          .subscribe((quote) => {
            console.log('quote>>>', quote);
            this.quote = quote;
          });
      });
  }

}
