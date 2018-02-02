import { Injectable } from '@angular/core';
import {Product} from "../../shared/product";
import {LocalStorageProvider} from "../local-storage/local-storage";
import {PRODUCTS} from "../../shared/mock.products";

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const PAGE_SIZE=10;
@Injectable()
export class ProductProvider {

  constructor(private localStorageService:LocalStorageProvider) {
    console.log('Hello ProductProvider Provider');
  }

  add(input: Product){
    //商品ID自增，需要遍历本地存储中的商品
    return new Promise((resolve, reject) => {
      let products = this.localStorageService.get('Product',PRODUCTS);
      input.id=products[products.length-1].id+1;
      products.push(input);
      this.localStorageService.set('Product',products);
    })
  }

  //获取某一页的数据，每页10条数据。参数需要验证是否在合理的范围内。
  get(index: number): Promise<any> {
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(!index){
          reject('页码不能为空');
        }else if(index<0){
          reject('erro');
        }
        let products = this.localStorageService.get('Product',PRODUCTS);
        let result=products.slice(PAGE_SIZE*(index-1),PAGE_SIZE*index);
        resolve(result);
      },1000)
    })
  }

  //根据商品名称查找（模糊查询）商品数据
  getByName(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let products = this.localStorageService.get('Product',PRODUCTS);
      let result = Array<Product>();
      result=products.filter((products)=>{
        return products.name.indexOf(name) > -1;
      });
        resolve(result);
    })
  }

  //计算商总正品库存和总成本
  count(products: Product[]){
    return new Promise(resolve => {
      let result:number[]=[0,0];
      let totalStock=0;
      let totalPurchasePrice=0;
      console.log(products)
      if(products.length){
        for(let i=0;i<products.length;++i){
          totalStock += products[i].stock;
          totalPurchasePrice += products[i].purchasePrice;
        }
        result[0]=totalStock;
        result[1]=totalPurchasePrice;
        console.log(result)
      }
      resolve(result)
    });
  }

  //根据商品类别查找商品数据
  getByCategoryId(categoryId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let products = this.localStorageService.get('Product',PRODUCTS);
      let result = Array<Product>();
      for(let i=0;i<products.length;++i){
        if (products[i].categoryId == categoryId){
          result.push(products[i]);
        }
      }
      resolve(result);
    })
  }

}
