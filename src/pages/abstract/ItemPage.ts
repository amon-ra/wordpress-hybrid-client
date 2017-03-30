import { TranslateService } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs';
import { Refresher, NavParams } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { Injector } from '@angular/core';
import { AdsService,Analytics } from '../../providers';

import { Toast, Config } from './../../providers';


export interface IItemPage {
    onLoad(data: Object): void;
    onClean(): void;
}

export class AbstractItemPage {
    // Injections
    config: Config;
    navParams: NavParams;
    toast: Toast;
    translate: TranslateService;

    init: boolean = false;
    fetched: false;
    shouldRetry: boolean = false;
    stream$: Observable<any>;
    service: any;
    type: string;
    title: string;
    ads: AdsService;
    as: Analytics;

    constructor(
        public injector: Injector
    ) {
        this.config = injector.get(Config, Config);
        this.navParams = injector.get(NavParams, NavParams);
        this.toast = injector.get(Toast, Toast);
        this.translate = injector.get(TranslateService, TranslateService);
        this.ads= injector.get(AdsService,AdsService);
        this.as = injector.get(Analytics);
        // this.footer= footer;
    }

    ionViewDidLoad() {
        console.debug('[ItemPage] init');
        let isItemLoaded;
        this.stream$.take(1).subscribe(item => isItemLoaded = item !== undefined);
        if (!isItemLoaded) {
            this.doLoad();
        } else {
            this.init = true;
        }
    }
    ionViewDidEnter(){
            this.ads.update(this.type,this.navParams.data.id);
            console.log(this.navParams);
            this.as.trackView(this.type,this.navParams.data.id);
    }
    setStream = (stream: Observable<any>) => this.stream$ = stream;
    setService = (service: any) => this.service = service;
    setType = (type: string) => this.type = type;
    setTitle = (title: string) => this.title = title;

    onLoad(data: Object) { }

    private getQuery(): Object {
        return this.config.get(`[${this.type}].query`, {})
    }

    private fetch(): Observable<any> {
        const searchParams = Object.assign({}, this.getQuery(), {
            "_embed": true
        });
        const uRLSearchParams = new URLSearchParams();
        Object.keys(searchParams).map((key) => {
            uRLSearchParams.set(key, searchParams[key]);
        });

        console.log(`[ItemPage] fetch ${this.type}`, searchParams);
        return this.service.get(this.navParams.get('id'), { search: uRLSearchParams })
            .debounceTime(this.config.getApi('debounceTime', 400))
            .timeout(this.config.getApi('timeout', 10000), new Error('timeout exceeded'))
            .retry(this.config.getApi('maxAttempt', 3) - 1)
            .map((r) => {
                this.init = true;
                this.shouldRetry = false;
                const data= r.json();
                // console.log(this.footer);
                this.onLoad(data);
            })
            .catch(res => {
                this.init = true;
                this.shouldRetry = true;
                this.toast.show(this.translate.instant('error'));
                return res;
            });
    }

    doLoad = (): void => {
        console.log('[ItemPage] doLoad');
        try{
            this.fetch().take(1).subscribe(() => { }, () => { });
        }catch(e){
            console.log(e);
        }
    }

    doRefresh(refresher: Refresher): void {
        console.log('[ItemPage] doRefresh');
        try{
            this.fetch().take(1).subscribe(() => refresher.complete(), (error) => refresher.complete());
        }catch(e){
            console.log(e);
        }
    }

}
