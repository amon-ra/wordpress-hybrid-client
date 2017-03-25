// import { GoogleAnalytics } from '@ionic-native/google-analytics';
import 'autotrack';
// import 'autotrack/lib/plugins/event-tracker';
import 'autotrack/lib/plugins/outbound-link-tracker';
import 'autotrack/lib/plugins/outbound-form-tracker';
// import 'autotrack/lib/plugins/page-visibility-tracker';
// import 'autotrack/lib/plugins/social-widget-tracker';
// import 'autotrack/lib/plugins/url-change-tracker';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Config } from './config';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import _get from 'lodash/get';
import { WpApiLoader } from 'wp-api-angular';
import { Http } from '@angular/http';
// import { NavParams } from 'ionic-angular';

// declare var ga: any;

@Injectable()
export class Analytics {
    private items: any;
    private enabled = false;
    private _ga :any;

    public constructor(
        public config: Config,
        public wpApiLoader: WpApiLoader,
        public http: Http,
        // public navParams: NavParams,
        // private ga: GoogleAnalytics,
        public store: Store<AppState>) {

          store.select('items').subscribe(data => this.items = data);
          const { enabled, debug, trackId,interval } = this.config.get(`cordova.analytics`, {});

          if (!enabled)
            return null;
          window['ga_debug'] = {trace: true};

          this._ga = window['ga']; //=this._ga||function(){(this._ga.q=this._ga.q||[]).push(arguments)};this._ga.l=+new Date;

          window['ga']('create', trackId);
          console.log('window.ga("create",'+trackId);
          //   this._ga('require', 'cleanUrlTracker');
        //   this._ga('require', 'eventTracker');
          this._ga('require', 'outboundLinkTracker');
          this._ga('require', 'outboundFormTracker');

        //   this._ga('require', 'pageVisibilityTracker');
        //   this._ga('require', 'socialWdigetTracker');
        //   this._ga('require', 'urlChangeTracker',{
        //       hitFilter: this.gaFilter
        //   });
         this.enabled=true;
    }

    private gaFilter(model,elem){
        // third argument of set is current hit only
        //  model.set('dimension1', String(model.get('eventValue')), true);
        // if (element.className.indexOf('is-invisible') > -1) {
        //   throw new Error('Aborting hit');
        // }
        // console.log(this.navParams);
        model.set('page','/',true);


    }
    public _startTracker(){
    if (!window['cordova'])
        return false;
      //Cordova Plugin Analytics
      try{
        const { enabled, debug, trackId,interval } = this.config.get(`cordova.analytics`, {});
        //console.log('OneSignal init. '+ JSON.stringify(enabled));
        if (enabled){
            // Enable to debug issues.

            this._ga.startTrackerWithId(trackId,interval)
               .then(() => {
                 console.debug('Google analytics is ready now ID:'+trackId);
                 this.enabled = true;
                 this._ga.trackView("Home Page", "/", true)
                 .then(e => console.log(e))
                 .catch(function(e) {
                    // rejection
                    console.log(e);
                });
                 // Tracker is ready
                 // You can now track pages or set additional information such as AppVersion or UserId
               });
            if (debug && this.enabled){
                console.debug('Analytics set log. '+ JSON.stringify(debug));
                this._ga.debugMode();
                // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
            }
          }
      }catch(e){
          console.debug("Error init Google Analytics");
      }

    }
    public debug(){
        this.store.select(state => {
            let data= _get(state, `items`);
            // console.log("AdsService Footer Store "+this.type+" "+elem);
            // console.log(data);
            // console.log(state);
            console.log(data);
        });
    }
    public trackView(type:string, elem: any){
        if(! this.enabled)
            return false;
        console.log(elem);
        if (elem['link']){
            this._ga('set','page',elem.link);
            // this._ga('set','title',data.title.rendered);
            this._ga('send', 'pageview');
        }
        else if(elem['query']['categories']){
            this.http.get(this.wpApiLoader.getWebServiceUrl(
                '/categories/'+elem['query']['categories']), {}).toPromise().then(
                    response => {
                    //console.log(response.json());
                    let data = response.json();
                    this._ga('set','location',data.link);
                    this._ga('set','title',data.name);
                    this._ga('send', 'pageview');
                    });

        }
        else if (typeof(elem) == "number"){
            //   this._ga.trackView(data.title.rendered,data.link);
            let data = this.items[type][elem];
            console.log(data);
            this._ga('set','location',data.link);
            this._ga('set','title',data.title.rendered);
            this._ga('send', 'pageview');
        }

    }
    public trackEvent(type:string, elem: number){
                if(! this.enabled)
                    return false;
        // GoogleAnalytics.trackView("Home Page", "www.in3dc.com/membership", true);
        // GoogleAnalytics.trackEvent("Page", "HomePage-Open-Action", "Label", 1);
        // trackTiming(category, intervalInMilliseconds, variable, label)
        this.store.select(state => {
            let data= _get(state, `items[${type}][${elem}]`);
            // console.log("AdsService Footer Store "+this.type+" "+elem);
            // console.log(data);
            // console.log(state);
            // this.ga.trackEvent(data.title.rendered,data.link,false);
        });
    }

    public getItem( type:string, elem: number){
        return this.store.select(state => {
            let data= _get(state, `items[${type}][${elem}]`);
            // console.log("AdsService Footer Store "+this.type+" "+elem);
            // console.log(data);
            // console.log(state);
            return data;
        });

    }

}
