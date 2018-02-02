import { Component } from '@angular/core';
import {AlertController, Events, NavController, NavParams, ToastController} from 'ionic-angular';
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {RegisterPage} from "../register/register";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string = '';//视图模型的属性账号，双向绑定
  password:string = '';//视图模型的属性密码，双向绑定

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toastCtrl:ToastController, private alertCtrl:AlertController,
              private storage:LocalStorageProvider,private events:Events) {
  }

  login(){
    let flag:boolean =false;
    if (this.username==''){
      let toast = this.toastCtrl.create({
        message:'用户名不能为空',
        duration:3000
      });
      toast.present();
    }else {
      let userlist:any = this.storage.get('userlist',null);
      if(userlist == null){
        let alert = this.alertCtrl.create({
          title: '提示',
          message:'用户名或者密码不正确',
          buttons:['确定']
        });
        alert.present();
      }else{
        for (let i=0;i<userlist.length;i++ ){
          if((this.username==userlist[i].phone || this.username==userlist[i].email)
            && this.password==userlist[i].password){
            flag=true;
            this.storage.set('user',userlist[i]);
            //修改左侧菜单用户信息
            this.events.publish('userInfo:update',userlist[i].shopName,userlist[i].phone);
            break;
          }
        }
        if (flag){
          let app:any = this.storage.get('App',null);
          app.logined=true;
          this.storage.set('App',app);
          this.navCtrl.setRoot(HomePage)
        }else {
          let alert = this.alertCtrl.create({
            title: '提示',
            message:'用户名或者密码不正确',
            buttons:['确定']
          });
          alert.present();
        }
      }
    }
  }

  toForgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }

  toReister(){
    this,this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
