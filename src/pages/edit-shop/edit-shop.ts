import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the EditShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-shop',
  templateUrl: 'edit-shop.html',
})
export class EditShopPage {
  title:string;
  property:string;
  value:string;//用于ngMode
  shop:any;//用于保存从本地存储中获得店铺数据
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage:LocalStorageProvider) {
    this.title = this.navParams.get('title');
    this.property = this.navParams.get('property');
    this.shop=this.storage.get('user',null);
    //其他代码省略
  }

  save(){
    this.shop[this.property] = this.value;
    this.storage.set('user',this.shop);
    this.navCtrl.pop();
    //其他代码省略
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShopPage');
  }

}
