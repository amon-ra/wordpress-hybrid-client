import {DomSanitizer} from '@angular/platform-browser';
import {PipeTransform, Pipe} from "@angular/core";
import { Config } from '../providers/config';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private config: Config, private sanitized: DomSanitizer) {}
  transform(value: any, enable = false,filters = [] as string[]) {
    console.log('safehtml');
    console.log(enable);
    console.log(filters);
    console.log(value);
    for(let regex of filters){
      value=value.replace(regex);
    }
    for(let regex of this.config.getApi('filters')){
      value=value.replace(regex);
    }
    console.log(value);
    if (this.config.getApi('safehtml') == true || enable)
      return this.sanitized.bypassSecurityTrustHtml(value);
    else
      return value;
  }
}
