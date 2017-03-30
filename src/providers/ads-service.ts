import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Config } from './config';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AdsModal } from '../pages/ads-modal/ads-modal';
import _get from 'lodash/get';

@Injectable()
export class AdsService {

    // private footerList: { [id: number] : string; } = {};
    // private modalList: { [id: number] : string; } = {};
    public footer: Subject<string>;
    private modal: any;
    private items: any;
    // private footerId: string;
    // public footerChange: Subject<string>;
    // public footer$: Observable<any>;
    // private type: string = "posts";

    public constructor(
        public config: Config,
        private store: Store<AppState>,
        private modalCtrl: ModalController) {
        // this.footerList = new Array();
        // this.modalList = new Array();
        // this.footer$ = Observable.of();
        this.footer=new Subject<string>();
        store.select('items').subscribe(data => this.items = data);
        //console.debug("AdsService: Init");
    }

    public update(type:string,data: Array<any>){

        try{
            for (const elem of data){
                if (elem.acf.footer != null && elem.acf.footer.trim() != ''){
                    // this.footerList[elem.id]=elem.acf.footer
                    this.setFooter(type,elem.id);
                    break;
                }
            }
            for (const elem of data){
                if ( elem.acf.modal_time != null &&
                    elem.acf.modal_content != null && elem.acf.modal_title != null){
                    let time: number;
                    time=elem.acf.modal_time;
                    if (time > 1){
                        this.setModal(type,elem.id,time*1000);
                    }
                    break;
                }

            }
        }catch(e){
            console.debug("AdsService: update error");
            console.log(data);
            console.log(e);
        }
        // this.footerChange.next(this.footer);

    }

    public setModal(type:string,elem: number,time: number){
        let stream = this.getItem(type,elem);
        if (this.modal && time < 1)
            clearTimeout(this.modal);
        this.modal = setTimeout(()=> {
            let profileModal = this.modalCtrl.create(AdsModal,stream);
            profileModal.present();
        },time);
    }
    public setFooter(type:string,elem: number){
        // console.log("setFooter");
        let data = this.items[type][elem];
            if (data.acf.footer)
                this.footer.next(data.acf.footer);
            else
                this.footer.next('');
    }

    public getItem( type:string, elem: number){
        return this.store.select(state => {
            let data= _get(state, `items[${type}][${elem}]`);
            // console.log("AdsService Footer Store "+type+" "+elem);
            // console.log(data);
            // console.log(state);
            return data;
        });

    }

}
