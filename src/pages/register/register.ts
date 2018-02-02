import {Component, ViewChild} from '@angular/core';
import {Events, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HomePage} from "../home/home";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,
              private storage:LocalStorageProvider,private toastCtrl:ToastController,
              private authenticationCodeService:AuthenticationCodeProvider,private events:Events) {
  }
  @ViewChild('registerSlides') registerSlides:any;
  register = {
    phone:'',
    email:'',
    shopName:'',
    password:'',
    confirmPassword:'',
    code:''
  };
  public isTimerStart:boolean=false;
  public timerText:string="发送验证码";
  private  timerRemainSeconds:number=60;
  public yanzhengma:string;
  public showCode=false;

  ionViewDidLoad() {
    this.registerSlides.lockSwipes(true);
  }
  next(){
    this.registerSlides.lockSwipeToNext(false);
    this.registerSlides.slideNext();
    this.registerSlides.lockSwipeToNext(true);
  }
  previous() {
    this.registerSlides.lockSwipeToPrev(false);
    this.registerSlides.slidePrev();
    this.registerSlides.lockSwipeToPrev(true);
  }
  showMeCode(){
    this.showCode=!this.showCode
  }
  send(){
    this.yanzhengma=this.authenticationCodeService.createCode(4);
    console.log(this.yanzhengma);
    this.isTimerStart=true;
    this.timerTracker();
    //使用短信云服务发送验证码
    let mobile=this.register.phone;
    let tpl_id=60327;
    let tpl_value=encodeURIComponent('#code#='+this.yanzhengma)
    let key='b2d0134d10b6fbd9a1abf2d313c2534d';
    let url='http://v.juhe.cn/sms/send?mobile='
      +mobile+'&tpl_id='+tpl_id+'&tpl_value='+tpl_value+'&key='+key
    this.http.get(url)
      .subscribe(data=>{
        console.log('发送短信验证码成功')
        console.log(data);
      })
  }
  validateCode(){
    if(this.authenticationCodeService.validate(this.register.code)){
      this.next();
    }
    else{
      let toast=this.toastCtrl.create({
        message:'短信验证码不正确或者已过期',
        duration:3000
      });
      toast.present();
    }
  }
  saveUserInfo(){

    //保存当前登录者信息
    let time=new Date();
    let registerTime=time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate() + ' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
    let userConfig = {
      phone:this.register.phone,
      email:this.register.email,
      shopName:this.register.shopName,
      password:this.register.password,
      flag:true,
      registerTime:registerTime
    };
    this.storage.set('user',userConfig);
    //修改左侧菜单用户信息
    this.events.publish('userInfo:update',userConfig.shopName,userConfig.phone);
    //将注册信息添加到用户列表里
    let userlist:any = this.storage.get('userlist',null);
    if(null == userlist){
      var arrayObj = new Array();
      arrayObj.push(userConfig);
      this.storage.set('userlist',arrayObj);
    }else{
      userlist.push(userConfig);
      this.storage.set('userlist',userlist);
    }
    //保存登录状态
    let app:any = this.storage.get('App',null);
    app.logined=true;
    this.storage.set('App',app);
    this.navCtrl.setRoot(HomePage)
  }

  timerTracker(){
    setTimeout(()=>{
      if(this.timerRemainSeconds>0){
        this.timerRemainSeconds--;
        this.timerText=this.timerRemainSeconds+"s后再发送";
        this.timerTracker();
      }else {
        this.timerText="再次发送";
        this.timerRemainSeconds=60;
        this.isTimerStart=false;
      }
      },1000
    )
  }



}
