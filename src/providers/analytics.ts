// import { GoogleAnalytics } from '@ionic-native/google-analytics';
// import 'autotrack';
// import 'autotrack/lib/plugins/event-tracker';
// import 'autotrack/lib/plugins/outbound-link-tracker';
// import 'autotrack/lib/plugins/outbound-form-tracker';
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
    private status = 0; //0 not initicialized, 1 enabled and initialized, >=2 disabled or erroenus
    // private _ga: any;

    public constructor(
        public config: Config,
        public wpApiLoader: WpApiLoader,
        public http: Http,
        // public navParams: NavParams,
        // private ga: GoogleAnalytics,
        public store: Store<AppState>) {

          store.select('items').subscribe(data => this.items = data);

    }
    public startTracker(){
          if (this.status == 1)
            return true
          if (this.status > 1)
            return false

          const { enabled, debug, trackId,interval, version } = this.config.get(`cordova.analytics`, {});

          if (!enabled){
            this.status = 2;
            return false;
          }

          let ga_url = 'https://www.google-analytics.com/analytics.js';
          if(debug){
            window['ga_debug'] = {trace: true};
            ga_url = 'https://www.google-analytics.com/analytics_debug.js';
          }

          (function (i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = Number(new Date());
          a = s.createElement(o),
              m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m);
      })(window, document, 'script', ga_url, 'ga',null,null);

          // window['ga'] = window['ga']; //=window['ga']||function(){(window['ga'].q=window['ga'].q||[]).push(arguments)};window['ga'].l=+new Date;

          window['ga']('create', trackId,interval);
          window['ga']('set', 'appName', name);
          window['ga']('set', 'appVersion', version);
          window['ga']('set', 'source', '(app)');
          if(debug)
            console.log('window.ga("create",'+trackId);
          //   window['ga']('require', 'cleanUrlTracker');
        //   window['ga']('require', 'eventTracker');
        //   window['ga']('require', 'outboundLinkTracker');
        //   window['ga']('require', 'outboundFormTracker');

        //   window['ga']('require', 'pageVisibilityTracker');
        //   window['ga']('require', 'socialWdigetTracker');
        //   window['ga']('require', 'urlChangeTracker',{
        //       hitFilter: this.gaFilter
        //   });
         this.status=1;
         return true;
    }

    // private gaFilter(model,elem){
    //     // third argument of set is current hit only
    //     //  model.set('dimension1', String(model.get('eventValue')), true);
    //     // if (element.className.indexOf('is-invisible') > -1) {
    //     //   throw new Error('Aborting hit');
    //     // }
    //     // //console.log(this.navParams);
    //     model.set('page','/',true);
    //
    //
    // }
    // public _startTracker(){
    // if (!window['cordova'])
    //     return false;
    //   //Cordova Plugin Analytics
    //   try{
    //     const { enabled, debug, trackId,interval } = this.config.get(`cordova.analytics`, {});
    //     ////console.log('OneSignal init. '+ JSON.stringify(enabled));
    //     if (enabled){
    //         // Enable to debug issues.
    //
    //         window['ga'].startTrackerWithId(trackId,interval)
    //            .then(() => {
    //              console.debug('Google analytics is ready now ID:'+trackId);
    //              this.enabled = true;
    //              window['ga'].trackView("Home Page", "/", true)
    //              .then(e => console.log(e))
    //              .catch(function(e) {
    //                 // rejection
    //                 console.log(e);
    //             });
    //              // Tracker is ready
    //              // You can now track pages or set additional information such as AppVersion or UserId
    //            });
    //         if (debug && this.enabled){
    //             console.debug('Analytics set log. '+ JSON.stringify(debug));
    //             window['ga'].debugMode();
    //             // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    //         }
    //       }
    //   }catch(e){
    //       console.debug("Error init Google Analytics");
    //   }
    //
    // }
    public debug(){
        this.store.select(state => {
            let data= _get(state, `items`);
            // //console.log("AdsService Footer Store "+this.type+" "+elem);
            // //console.log(data);
            // //console.log(state);
            console.log(data);
        });
    }
    public getPath(url:string){
        let regex = new RegExp('(http?://.*?)\/(.*)$');
        return '/'+regex.exec(url)[2];

    }
    public trackView(type:string, elem: any){
        if(!this.startTracker())
          return false;

        console.log(elem);

        if (elem['link']){
            // window['ga']('set','page',this.getPath(elem.link));
            // window['ga']('set','title',data.title.rendered);
            let title =  document.getElementsByTagName("title")[0].innerHTML ;
            window['ga']('send', 'screenview', {screenName: title});
            window['ga']('set', 'page', this.getPath(elem.link));
            window['ga']('set', 'title',title);
            window['ga']('send','pageview');
        }
        else if(elem['query'] && elem['query']['categories']){
            this.http.get(this.wpApiLoader.getWebServiceUrl(
                '/categories/'+elem['query']['categories']), {}).toPromise().then(
                    response => {
                    ////console.log(response.json());
                    let data = response.json();
                    let title =  data.name;
                    window['ga']('send', 'screenview', {screenName: title});
                    window['ga']('send', { 'hitType': 'pageview',
                        'page': this.getPath(data.link),
                        'title': title});
                    });

        }
        else if (typeof(elem) == "number"){
            //   window['ga'].trackView(data.title.rendered,data.link);
            let data = this.items[type][elem];
            console.log(data);
            let title =  data.title.rendered ;
            window['ga']('send', 'screenview', {screenName: title});
            window['ga']('set', 'page', this.getPath(data.link));
            window['ga']('set', 'title', title);
            window['ga']('send','pageview');
            console.log({ 'hitType': 'pageview',
                'page': this.getPath(data.link),
                'title': data.title.rendered});
        }
        else{
            // window['ga']('set','title',data.title.rendered);
            // const { enabled, debug, trackId,interval } = this.config.get(`cordova.analytics`, {});
            let title =  document.getElementsByTagName("title")[0].innerHTML ;
            window['ga']('send', 'screenview', {screenName: title});
            window['ga']('set', 'page', '/');
            window['ga']('set', 'title', title);
            window['ga']('send','pageview');

            console.log( { hitType: 'pageview',
                page: '/',
                title: document.getElementsByTagName("title")[0].innerHTML,
                campaignMedium: '(app)'});
        }

    }
    public trackEvent(type:string, elem: number){
                if(! this.startTracker())
                    return false;
        // GoogleAnalytics.trackView("Home Page", "www.in3dc.com/membership", true);
        // GoogleAnalytics.trackEvent("Page", "HomePage-Open-Action", "Label", 1);
        // trackTiming(category, intervalInMilliseconds, variable, label)
        this.store.select(state => {
            // let data= _get(state, `items[${type}][${elem}]`);
            // //console.log("AdsService Footer Store "+this.type+" "+elem);
            // //console.log(data);
            // //console.log(state);
            // this.ga.trackEvent(data.title.rendered,data.link,false);
        });
    }

    public getItem( type:string, elem: number){
        return this.store.select(state => {
            let data= _get(state, `items[${type}][${elem}]`);
            // //console.log("AdsService Footer Store "+this.type+" "+elem);
            // //console.log(data);
            // //console.log(state);
            return data;
        });

    }

}
