import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {AddProductPage} from "../add-product/add-product";
import {ProductListPage} from "../product-list/product-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public today:number;
  public cmpToday:number;
  public sevenDays:number;
  public cmpSevenDays:number;
  public thisMonth:number;
  public cmpThisMonth:number;

  addProductPage:any;
  productListPage:any;

  constructor(public navCtrl: NavController) {
    this.addProductPage=AddProductPage;
    this.productListPage=ProductListPage;

    let num =Math.random() * 1000;

    this.today =Math.random() * 1000;
    this.sevenDays =Math.random() * 1000;
    this.thisMonth =Math.random() * 1000;
    //console.log(this.today);

    this.cmpToday=this.today-num;
    this.cmpSevenDays=this.sevenDays-num;
    this.cmpThisMonth=this.thisMonth-num;
  }


}
