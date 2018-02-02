import { Component } from '@angular/core';
import {Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ProductProvider} from "../../providers/product/product";
import {AddProductPage} from "../add-product/add-product";
import {CategoryListPage} from "../category-list/category-list";
import {Product} from "../../shared/product";
import {ProductDetailPage} from "../product-detail/product-detail";

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  pageIndex=1;
  products:Product[]=new Array<Product>();
  loader: any;
  addProduct:any;
  categoryListPage:any;
  totalStock:number;
  totalPurchasePrice:number;
  productDetailPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private events:Events,
              private loadingCtrl:LoadingController,private productService:ProductProvider) {
    this.addProduct=AddProductPage;
    this.categoryListPage=CategoryListPage;
    this.productDetailPage=ProductDetailPage;

    this.events.subscribe('activeCategory:update',(data)=>{
      console.log('activeCategory:update' + data.id+data.name);
      //根据分类ID查询
      productService.getByCategoryId(data.id).then((result)=>{
        this.products=result;
      })
    })
  }

  doRefresh(event){
    this.pageIndex=1;
    this.productService.get(this.pageIndex).then((data)=>{
      this.products=data;
      console.log(data);
      event.complete();
    },(error)=>{
      console.log('错误')
    })
  }

  doInfinite(event){
    this.pageIndex++;
    this.productService.get(this.pageIndex).then((data)=>{
      if(data.length != 0){
        this.products=this.products.concat(data);
        console.log(this.products);
      }
      console.log('scroll doInfinite data')
      console.log(data);
      event.complete();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
    this.load();
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "正在加载数据，请稍候..."
    });
    this.loader.present();
  }
  protected load() {
    this.presentLoading();
    this.productService.get(this.pageIndex).then((data) => {
      this.products = data;
      this.productService.count(this.products).then(data=>{
        console.log(data)
        this.totalStock=data[0];
        this.totalPurchasePrice=data[1];
      })
      this.loader.dismiss()
    }, (error) => {
    });
  }
  onInput(event){
    let value = event.target.value;
    if(value){
      console.log('oninput事件'+value.trim())
      this.productService.getByName(value.trim()).then((result)=>{
        console.log(result);
        this.products=result;
      })
    }else{
      //显示第一页商品信息
      this.pageIndex=1;
      this.load();
    }
  }

}
