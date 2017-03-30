import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Config } from './config';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AdsModal } from '../components/ads-modal/ads-modal';
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

    public update(type:string,data: Array<number>){
        if (typeof(data) == "number")
            data=[data];
        try{
            for (const elem of data){
                    if (this.setFooter(type,elem))
                    break;
            }
            for (const elem of data){
                    if (this.setModal(type,elem))
                    break;
            }
        }catch(e){
            console.debug("AdsService: update error");
            console.log(data);
            console.log(e);
        }
        // this.footerChange.next(this.footer);

    }

    public setModal(type:string,elem: number){
        try{
            var data = this.items[type][elem];
            if (data.acf.modal_content != null && data.acf.modal_content.trim() != ''){
                let time = 2*1000;
                if (data.acf.modal_time)
                    time=data.acf.modal_time * 1000;
                if (this.modal)
                    clearTimeout(this.modal);
                this.modal = setTimeout(()=> {
                    let profileModal = this.modalCtrl.create(AdsModal,
                        { content: data.acf.modal_content, title: data.acf.modal_title });
                    profileModal.present();
                },time);
                return true;
            }
        }catch(e){
            console.log(e);
        }

    }
    public setFooter(type:string,elem: number){
        // console.log("setFooter");
        try{
            let data = this.items[type][elem];
            if (data.acf.footer != null && data.acf.footer.trim() != ''){
                this.footer.next(data.acf.footer);
                return true;
            }
        }catch(e){
            console.log(e);
        }
        this.footer.next('');
        return false;
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
