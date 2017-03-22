import {DomSanitizer} from '@angular/platform-browser';
import {PipeTransform, Pipe} from "@angular/core";
import { Config } from '../providers/config';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private config: Config, private sanitized: DomSanitizer) {}
  transform(value: any, enable = false,filter_str = "") {
    // console.log('safehtml');
    // console.log(enable);
    // console.log(filter_str);
    // console.log(this.config.getApi('filters'));
    // console.log(value);
    let data = value;
    if (data == null)
      return '';
    try{
      let filters = JSON.parse(filter_str);
      for(let regex in filters){
        // console.log(regex);
        data=data.replace(new RegExp(regex),filters[regex]);
      }
    }catch(e){
      data=value;
    }
    let filters = this.config.getApi('filters');
    for(let regex in filters){
      // console.log(regex);
      data=data.replace(new RegExp(regex),filters[regex]);
    }
    // console.log(data);
    if (this.config.getApi('safehtml') == true || enable)
      data = this.sanitized.bypassSecurityTrustHtml(data);
    if (data == null)
      return '';
    return data;

  }
}
