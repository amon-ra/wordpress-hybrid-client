import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Config } from './config';
// import { Store } from '@ngrx/store';
// import { AppState } from '../reducers';
import _get from 'lodash/get';

@Injectable()
export class StreamService {

    stream = {};
    isPlaying: string;
    info: Subject;
    timer: any;
  //   streamUrl: string;
  //   metadataUrl: string;
	// contentRegex = /<body>(.*)<\/body>/;
	// itunesSearchUrl = 'https://itunes.apple.com/search?term=';
	// resolutionRegex = /100x100/;

    public constructor(
        public config: Config,
        public loadingCtrl: LoadingController) {

    }

  togglePlay(url: string) {
			if (this.isPlaying == url) {
				this.pause();
			} else {
        this.pause()
				this.play(url);
			}
  }
  showLoading(){
     let loading = this.loadingCtrl.create({
        content: '<p>Cargando...</p><ion-spinner></ion-spinner>'
      });
      loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 12000);
  }
  startStream(url: string){
        if(typeof this.stream[url] === 'undefined') {
				   this.stream[url] = new window['Stream'](url,function (){
                    console.log("playAudio():Audio Success");
            },function (error){
                    console.log('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
                    alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
                    this.pause();
                });
            this.showLoading();
        }
  }

  play(url:string){
    if (this.isPlaying != '')
      this.pause();

    /*https://www.thepolyglotdeveloper.com/2014/11/playing-audio-android-ios-ionicframework-app/
    http://ionicframework.com/docs/api/directive/ionSpinner/
    http://stackoverflow.com/questions/37236053/ionic-angular-js-global-preloader*/
		if (window['Stream']) {
        this.startStream(url);
				// Play audio
				this.stream[url].play();
        this.isPlaying = url;
		}
		else{
        alert("Error loading streaming plugin");
    }

            //window.plugins.streamingMedia.playAudio(url);
//             if (ionic.Platform.isAndroid()){
//                 window.navigator.RADIO.play(function(s) {
//                 console.log('SUCCESS navigator.RADIO.play');
//                 }, function(s) {
//                 console.log('ERROR navigator.RADIO.play');
//                 console.log(s);
//                 }, url, 'RM Radio', 'online');
//             }
// 			getStreamInfo();
// 			this.timer =  setInterval(() => {
// 				getStreamInfo();
// 			}, 5000);
  }

  pause(){
    // clearInterval(this.timer);
    this.info = null;
/*            if (ionic.Platform.isAndroid()){
                window.navigator.RADIO.stop(function(s) {
                console.log('SUCCESS navigator.RADIO.stop');
                }, function(s) {
                console.log('ERROR navigator.RADIO.stop');
                });
            }
            if (ionic.Platform.isIOS()){ */

    if(typeof this.stream[this.isPlaying] === 'undefined')  {
      this.isPlaying = '';
      return;
    }

    this.stream[this.isPlaying].stop();
    //we are streaming and cleanup the cache
    delete this.stream[this.isPlaying];
//             }
    //window.plugins.streamingMedia.stopAudio();
    this.isPlaying = '';
  }
  getStreamInfo() {
    console.log("getStreamInfo: Init");
    // streamService.getStreamInfo().then(function(info) {
    //            console.log("getStreamInfo");
    //            console.log(info);
    //   this.info = info;
    // }, function() {
    //           console.log("getStreamInfo: err");
    //   this.info = null;
    // });
  }

}
