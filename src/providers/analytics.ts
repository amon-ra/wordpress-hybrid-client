import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Injectable } from '@angular/core';
import { Config } from './config';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import _get from 'lodash/get';

@Injectable()
export class Analytics {

    public constructor(
        public config: Config,
        private store: Store<AppState>,
        private ga: GoogleAnalytics) {
    }

    public startTracker(){
      //Cordova Plugin Analytics
      try{
        const { enabled, debug, trackId,interval } = this.config.get(`cordova.analytics`, {});
        //console.log('OneSignal init. '+ JSON.stringify(enabled));
        if (enabled){
            // Enable to debug issues.
            if (debug){
                console.debug('Analytics set log. '+ JSON.stringify(debug));
                this.ga.debugMode();
                // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
            }

            this.ga.startTrackerWithId(trackId,interval)
               .then(() => {
                 console.debug('Google analytics is ready now');
                 this.ga.trackView("Home Page", "/", true);
                 // Tracker is ready
                 // You can now track pages or set additional information such as AppVersion or UserId
               });
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
        // GoogleAnalytics.trackView("Home Page", "www.in3dc.com/membership", false);
        // this.init=false;
        // GoogleAnalytics.trackEvent("Page", "HomePage-Open-Action", "Label", 1);
        // trackTiming(category, intervalInMilliseconds, variable, label)
        //if elem is a number fire from a post id
        //if elem is an options object:
        console.debug(typeof(elem));
        console.debug(JSON.stringify(elem));
        if (typeof(elem) == "number"){
            this.store.select(state => {
                let data= _get(state, `items[${type}][${elem}]`);
                // console.log("AdsService Footer Store "+this.type+" "+elem);
                // console.log(data);
                // console.log(state);
                this.ga.trackView(data.title.rendered,data.link,false);
            });
        }

    }
    public trackEvent(type:string, elem: number){
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
