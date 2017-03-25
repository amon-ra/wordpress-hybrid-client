import { Component,Input } from '@angular/core';
import { AdsService } from '../../providers/ads-service';
import { Subscription }   from 'rxjs/Subscription';
import { Observable } from 'rxjs';
/*
  Generated class for the AdsFooter component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'ads-footer',
  templateUrl: 'ads-footer.html'
})
export class AdsFooterComponent {
  //@Input() : String;
  footer: string;
  _subscription: Subscription;


  constructor(public ads: AdsService) {
    //console.debug('Hello AdsFooter Component');
    // this.text = '';
    //init stream with default value
    //ads.setFooter("pages",205);
    //this.stream$ = ads.getFooter(205);
    this._subscription = ads.footer.subscribe((value) => {
      this.footer = value;
      //console.log("AdsFooter:"+value);
      // console.log(this.stream$);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
