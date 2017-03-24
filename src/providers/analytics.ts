import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Config } from './config';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import _get from 'lodash/get';

@Injectable()
export class Analytics {
    private items: any;
    private enabled = false;

    public constructor(
        public config: Config,
        private store: Store<AppState>,
        private _ga: GoogleAnalytics) {
          store.select('items').subscribe(data => this.items = data);
    }

    public startTracker(){
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
        // GoogleAnalytics.trackView("Home Page", "www.in3dc.com/membership", false);
        // this.init=false;
        // GoogleAnalytics.trackEvent("Page", "HomePage-Open-Action", "Label", 1);
        // trackTiming(category, intervalInMilliseconds, variable, label)
        //if elem is a number fire from a post id
        //if elem is an options object:
        console.debug(typeof(elem));
        console.debug(JSON.stringify(elem));
        // if (typeof(elem) == "number"){
        //     console.debug("ga.trackView1");
        //     let item = this.store.select(state => _get(state, `items[${type}][${elem}]`))
        //         .subscribe(data => {
        //         //console.log("AdsService Footer Store "+this.type+" "+elem);
        //         // console.log(data);
        //         // console.log(state);
        //         console.log("ga.trackView"+JSON.stringify(data));
        //         this._ga.trackEvent(data.title.rendered,data.link, "Label", 1);
        //         this._ga.trackView(data.title.rendered,data.link,true)
        //          .then(e => console.log(e))
        //          .catch(e => console.log(e));
        //     });
        // }
        let data = this.items[type][elem];
        if (typeof(elem) == "number"){
          this._ga.trackView(data.title.rendered,data.link);
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
