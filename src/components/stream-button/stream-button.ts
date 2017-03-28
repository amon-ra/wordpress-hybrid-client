import { Component,Input } from '@angular/core';
import { StreamService } from '../../providers/stream-service';
import { Subscription }   from 'rxjs/Subscription';
import { Observable } from 'rxjs';
/*
  Generated class for the AdsFooter component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'stream-button',
  templateUrl: 'stream-button.html',
  providers: [StreamService]
})
export class StreamButtonComponent {
  @Input() source: String;



  constructor(public vm: StreamService) {

  }


}
