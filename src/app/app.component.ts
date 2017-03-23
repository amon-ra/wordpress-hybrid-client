import { Store } from '@ngrx/store';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { AppState, IParamsState } from './../reducers';
import { Config } from './../providers';
import { MenuMapping } from './../pages';

@Component({
  template: `
    <menu [content]="content"></menu>
    <ion-nav #content [root]="rootPage"></ion-nav>
    <ads-footer></ads-footer>
  `
})
export class WPHC {
  @ViewChild(Nav) nav: Nav;

  constructor(
    public translate: TranslateService,
    public platform: Platform,
    public store: Store<AppState>,
    public config: Config,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {

    store.select('params')
      .map((params: IParamsState) => {
        const appNode: any = document.querySelector('ion-app');
        appNode.style = `zoom: ${0.8 + (0.1 * params.zoom)}`
      })
      .subscribe();
    // Set the default language for translation strings, and the current language.
    translate.setDefaultLang('en');
    translate.use('en')

    platform.ready().then(() => {

      //Cordova Plugin Analytics
      try{
        const { enabled, debug, trackId } = this.config.get(`cordova.analytics`, {});
        //console.log('OneSignal init. '+ JSON.stringify(enabled));
        if (enabled){
            // Enable to debug issues.
            if (debug){
                console.log('Analytics set log. '+ JSON.stringify(debug));
                // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
            }

            window["plugins"].analytics.startTrackerWithId(trackId);
            // Call syncHashedEmail anywhere in your app if you have the user's email.
            // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
            // window["plugins"].OneSignal.syncHashedEmail(oneSignal_userEmail);
          }
      }catch(e){
          console.log("Error init Google Analytics");
      }


      //Cordova Plugin Onesignal
      try{
        const { enabled, debug, appId } = this.config.get(`cordova.oneSignal`, {});
        //console.log('OneSignal init. '+ JSON.stringify(enabled));
        if (enabled){
            // Enable to debug issues.
            if (debug){
                console.log('OneSignal set log. '+ JSON.stringify(debug));
                window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
            }

            var notificationOpenedCallback = function(jsonData) {
                console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
            };

            window["plugins"].OneSignal
                .startInit(appId)
                .handleNotificationOpened(notificationOpenedCallback)
                .endInit();

            // Call syncHashedEmail anywhere in your app if you have the user's email.
            // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
            // window["plugins"].OneSignal.syncHashedEmail(oneSignal_userEmail);
          }
      }catch(e){
          console.log("Error init OneSignal");
      }

      const { page, params } = this.config.get('defaultPage', {});

      if (page && MenuMapping[page]) { // redirect to default page
        this.nav.setRoot(MenuMapping[page], params);
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
