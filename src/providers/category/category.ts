import { Injectable } from '@angular/core';
import {LocalStorageProvider} from "../local-storage/local-storage";
import {CATEGORIES} from "../../shared/mock.categories";
import {Events} from "ionic-angular";
import {Subject} from "rxjs/Subject";

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class CategoryProvider {
  activeCategory={id:5,name:'默认类别'};
  subject=new Subject();

  constructor(public localStorageService:LocalStorageProvider,private events:Events) {
    console.log('Hello CategoryProvider Provider');
  }

  get(){
    return Promise.resolve(this.localStorageService.get('Categories', CATEGORIES));
  }
  updateActiveCategory(category){
    console.log(category)
    this.activeCategory.id=category.id;
    this.activeCategory.name=category.name;
    this.events.publish('activeCategory:update',category)
  }

  addCategory(category){
    let categories = this.localStorageService.get('Categories', CATEGORIES);
    category.id=categories.length+1;
    categories.push(category);
    this.localStorageService.set('Categories', categories);
    console.log('添加分类成功');
    console.log(categories)
  }

  addSubCategory(category,children){
    /**
     * 新增小分类
     * 参数：大分类，要新增的小分类数组
     * @type {any}
     */
    let categories = this.localStorageService.get('Categories', CATEGORIES);
      for(let i=0;i<categories.length;++i){
        if(category.id == categories[i].id){
          //找到大分类
          if(category.children.length == 0){
            //大分类无小分类
            for(let j=0;j<children.length;++j){
              children[j].id=category.id*10+1+j;
              categories[i].children.push(children[j]);
            }
          }else{
            for(let j=0;j<children.length;++j){
              children[j].id=categories[i].children[categories[i].children.length-1].id+1;
              categories[i].children.push(children[j]);
            }
          }
          break;
        }
      }
    this.localStorageService.set('Categories', categories);
    console.log('添加小分类成功');
    console.log(categories)
  }

}
