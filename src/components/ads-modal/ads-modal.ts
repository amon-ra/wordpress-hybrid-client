import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the AdsModal component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'ads-modal',
  templateUrl: 'ads-modal.html'
})
export class AdsModal {
  content: string;
  title: string;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.content = navParams.get('content');
    this.title = navParams.get('title');
    console.log (this.content);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
