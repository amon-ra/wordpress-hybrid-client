import { Component } from '@angular/core';

/*
  Generated class for the AdsModal component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'ads-modal',
  templateUrl: 'ads-modal.html'
})
export class AdsModalComponent {

  text: string;

  constructor() {
    console.log('Hello AdsModal Component');
    this.text = 'Hello World';
  }

}
