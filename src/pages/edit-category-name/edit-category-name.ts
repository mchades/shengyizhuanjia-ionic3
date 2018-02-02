import { Component } from '@angular/core';
import { NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the EditCategoryNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-category-name',
  templateUrl: 'edit-category-name.html',
})
export class EditCategoryNamePage {
  name: string; // 在模板中使用ngModel双向绑定
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    // 通过navParams接收传过来的参数
    this.name = this.navParams.get('name');
  }
  dismiss() {
    this.viewCtrl.dismiss({name: this.name});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCategoryNamePage');
  }

}
