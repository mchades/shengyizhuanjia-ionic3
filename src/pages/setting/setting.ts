import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {ShopPage} from "../shop/shop";
import {AboutUsPage} from "../about-us/about-us";
import {EditPasswordPage} from "../edit-password/edit-password";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  loginPage:any
  shopPage:any
  aboutUsPage:any
  editPassword:any

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:LocalStorageProvider) {
    this.loginPage=LoginPage;
    this.shopPage=ShopPage;
    this.aboutUsPage=AboutUsPage;
    this.editPassword=EditPasswordPage;
  }

  exit(){
    let app:any = this.storage.get('App',null);
    app.logined=false;
    this.storage.set('App',app);
    this.storage.remove('user');
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
