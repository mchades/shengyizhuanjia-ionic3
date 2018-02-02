import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
  template:`
    <ion-list>
      <button ion-item>修改商品</button>
      <button ion-item>删除商品</button>
    </ion-list>  
  `
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
  close() {
    this.viewCtrl.dismiss();
  }

}
