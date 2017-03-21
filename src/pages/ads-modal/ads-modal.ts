import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Observable } from 'rxjs';

/*
  Generated class for the Taxonomies page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ads-modal',
  templateUrl: 'ads-modal.html'
})
export class AdsModal {
  stream$: Observable<any>;
  // list$: Observable<Array<any>>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
    this.stream$ = navParams.get('stream');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  trackBy = (index: number, item) => item.id;

}
