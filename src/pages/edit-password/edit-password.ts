import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the EditPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {

  edit={
    oldPassword:'',
    newPassword:'',
    confirmPassword:'',
  };
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:LocalStorageProvider) {
    this.user=this.storage.get('userlist',null); //取到的是数组
  }
  confirm(){
    let user=this.storage.get('userlist',null);
    user[0].password=this.edit.confirmPassword;
    this.storage.set('userlist',this.user);
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPasswordPage');
  }

}
