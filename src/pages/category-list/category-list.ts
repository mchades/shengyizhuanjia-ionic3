import { Component } from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {Category} from "../../shared/Category";
import {CategoryProvider} from "../../providers/category/category";
import {AddCategoryPage} from "../add-category/add-category";
import {EditCategoryPage} from "../edit-category/edit-category";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {
  addCategoryPage:any;

  public categories:Array<Category>;
  public activeCategory:Category;
  public activeSubCategories:Array<Category>=[];
  public activeSubCategory:Category;

  constructor(private categoryService:CategoryProvider,public actionSheetCtrl:ActionSheetController,
              public navCtrl:NavController,public navParams:NavParams,private storage:LocalStorageProvider) {
    this.addCategoryPage=AddCategoryPage;

    categoryService.get().then((data)=>{
      this.storage.set('Categories',data);
      this.categories = data;
      this.selectCategory(this.categories[0]);
      // this.activeCategory=this.categories[0];
      // this.activeSubCategories=this.activeCategory.children;
    })
  }

  selectCategory(category:Category){
    //选择大分类时，改变activeCategory的值，并找到该类别下的小类
    this.activeCategory=category;
    this.activeSubCategories=category.children;
  }

  selectSubCategory(category:Category){
    //选择小分类时，改变activeSubCategory的值，跳转回之前的页面
    this.activeSubCategory=category;
    this.categoryService.updateActiveCategory(category);
    this.navCtrl.pop();
  }

  presentActionSheet(){
    //显示一个操作表，让用户选择编辑分类还是新增小分类
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            this.gotoAddCategory();
          }
        },{
          text: '编辑分类',
          handler: () => {
            this.navCtrl.push(EditCategoryPage,{currentCategory:this.activeCategory});
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  gotoAddCategory(){
    //页面跳转到新增小分类页面
    this.navCtrl.push(AddCategoryPage,{title:'小分类',currentCategory:this.activeCategory});
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CategoryListPage');
  }
  ionViewDidEnter(){
    this.categoryService.get().then((data)=>{
      this.storage.set('Categories',data);
      this.categories = data;
      this.selectCategory(this.categories[0]);
      // this.activeCategory=this.categories[0];
      // this.activeSubCategories=this.activeCategory.children;
    })
  }

}
