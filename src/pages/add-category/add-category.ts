import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Category} from "../../shared/Category";
import {CategoryProvider} from "../../providers/category/category";

/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {
  title:string;
  currentCategory:any;
  SubCategory:Array<Category>=new Array<Category>();
  newBigCategory:any=new Category;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private categoryService:CategoryProvider,private toastCtrl:ToastController) {
    this.title = this.navParams.get('title');
    if(this.title == '小分类'){
      this.currentCategory=this.navParams.get('currentCategory');
    }else{
      this.currentCategory=null;
    }
  }

  addSubCategory(){
    let category:Category=new Category();
    this.SubCategory.push(category);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategoryPage');
  }

  save(){
    for(let i=0;i<this.SubCategory.length;++i){
      if(this.SubCategory[i].name == '' || this.SubCategory[i].name == null){
        let toast=this.toastCtrl.create({
          message:'每个小分类名称都不能为空',
          duration:2000
        });
        toast.present();
        return;
      }
    }
    if(this.currentCategory){
      //新增小分类
      this.categoryService.addSubCategory(this.currentCategory,this.SubCategory);
    }else{
      //新增大分类
      if(this.newBigCategory.name=='' || this.newBigCategory.name==null){
        let toast=this.toastCtrl.create({
          message:'大分类名称不能为空',
          duration:2000
        });
        toast.present();
        return;
      }else{
        console.log(this.SubCategory);
        this.categoryService.addCategory(this.newBigCategory);
        this.categoryService.addSubCategory(this.newBigCategory,this.SubCategory);
      }
    }
    this.navCtrl.pop();

  }

}
