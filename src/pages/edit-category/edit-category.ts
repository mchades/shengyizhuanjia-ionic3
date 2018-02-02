import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {EditCategoryNamePage} from "../edit-category-name/edit-category-name";
import {Category} from "../../shared/Category";

/**
 * Generated class for the EditCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategoryPage {

  editCategoryNamePage:any;
  currentCategory:Category;
  SubCategory:Array<Category>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController,public modalCtrl:ModalController) {
    this.editCategoryNamePage=EditCategoryNamePage;
    this.currentCategory=this.navParams.get('currentCategory');
    this.SubCategory=this.currentCategory.children;
  }

  presentModal(category:Category) {
    let modal = this.modalCtrl.create(EditCategoryNamePage, {name: category.name},{enableBackdropDismiss:false});
    modal.onDidDismiss(data => {

      // 修改数据并保存到本地存储
    });
    console.log('弹出模态窗口前');
    modal.present();
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '你确认要删除吗？',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            // 删除数据并保存到本地存储中
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCategoryPage');
  }

}
