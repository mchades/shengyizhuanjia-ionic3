import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Product} from "../../shared/product";
import {PopoverPage} from "../popover/popover";
import {SharePage} from "../share/share";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  product:Product;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public popoverCtrl:PopoverController,public modalCtrl:ModalController,
              public alertCtrl:AlertController) {
    this.product = this.navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  showPrice(){
    let prompt = this.alertCtrl.create({
      title: '查看进价',
      inputs: [
        {
          name: 'name',
          placeholder: '请输入用户名'
        },
        {
          name: 'password',
          placeholder: '请输入密码'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '验证',
          handler: data => {
            console.log('点击验证');

          }
        }
      ]
    });
    prompt.present();
  }

  share(){
      let modal = this.modalCtrl.create(SharePage, {});
      modal.onDidDismiss(data => {

        // 点击后分享
      });
      console.log('弹出模态窗口前');
      modal.present();
  }

}
