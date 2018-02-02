import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {WelcomePage} from "../pages/welcome/welcome";
import {LoginPage} from "../pages/login/login";
import {SettingPage} from "../pages/setting/setting";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any =  WelcomePage;
  public userPhone:string;
  public shopName:string;

  pages: Array<{title: string, component: any,icon:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar,private events:Events,
              public splashScreen: SplashScreen, private storage:LocalStorageProvider) {
    this.initializeApp();
    this.events.subscribe('userInfo:update',(shopName,phone)=>{
      this.shopName=shopName;
      this.userPhone=phone;
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: '开店论坛', component: HomePage, icon: 'chatboxes' },
      { title: '手机橱窗', component: ListPage, icon: 'create' },
      { title: '邀请有礼', component: ListPage, icon: 'git-merge' },
      { title: '资金账户', component: ListPage, icon: 'cash' },
    ];

    //第一次调用get方法时，'App'这个key不存在，第二个参数会作为默认值返回
    let appConfig:any = this.storage.get('App',{
      isRun:false,
      version:'1.0.0',
      logined:false
    });
    if(appConfig.isRun==false){
      this.rootPage = WelcomePage;
      appConfig.isRun = true;
      this.storage.set('App',appConfig);
    }
    else{
      if(appConfig.logined==true){
        this.rootPage = HomePage;
      }else {
        this.rootPage = LoginPage;
      }
    }
    let user:any = this.storage.get('user',{phone:'',email:'',shopName:''});
    this.userPhone=user.phone;
    this.shopName=user.shopName;
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  toSetting(){
    this.nav.push(SettingPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ionViewWillUnload(){
    this.events.unsubscribe('userInfo:update');
  }


}
