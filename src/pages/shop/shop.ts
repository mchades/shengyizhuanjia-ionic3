import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EditShopPage} from "../edit-shop/edit-shop";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  editShopPage:any;
  user={
    shopName:'',
    shortName:'未设置',
    registerTime:'',
    phone:'',
    email:'',
    shopkeeper:'未设置',
    shopPhone:'未设置',
    shopType:'未设置'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:LocalStorageProvider) {
    this.editShopPage=EditShopPage;
    this.user=this.storage.get('user',null);
  }

  ionViewDidEnter(){
    this.user=this.storage.get('user',null);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

}
