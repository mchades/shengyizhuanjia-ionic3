import { Component } from '@angular/core';
import {ActionSheetController, AlertController, Events, NavController, NavParams} from 'ionic-angular';
import {CategoryListPage} from "../category-list/category-list";
import {Product} from "../../shared/product";
import {CategoryProvider} from "../../providers/category/category";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Camera,CameraOptions} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {ProductProvider} from "../../providers/product/product";

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  categoryListPage:any;
  product:Product=new Product();
  supplier:string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController, private categoryService:CategoryProvider,
              private events:Events,private barcodeScanner:BarcodeScanner,
              private camera:Camera,private imagePicker:ImagePicker,
              private actionSheetCtrl:ActionSheetController,private productService:ProductProvider) {
    this.categoryListPage=CategoryListPage;
    this.product.categoryId=this.categoryService.activeCategory.id;
    this.product.categoryName=this.categoryService.activeCategory.name;

    this.events.subscribe('activeCategory:update',(data)=>{
      console.log('activeCategory:update' + data.id+data.name);

      this.product.categoryId=data.id;
      this.product.categoryName=data.name;
    })
  }

  //摄像头扫描
  scanBarcode() {
    console.log('dakaishexiangtou');
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.product.barcode = barcodeData.text;
    }, (err) => {
      // An error occurred
    });
  }
  //上传图片
  presentActionSheet(){
    //显示一个操作表，让用户选择
    let actionSheet = this.actionSheetCtrl.create({
      title: '上传图片',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            this.cameraPicture();
          }
        },{
          text: '从照片库选择',
          handler: () => {
            this.pickImage();
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

  //拍照
  cameraPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  //从图片库选择
  pickImage() {
    // 判断是否设置了三张图片
    let options = {
      maximumImagesCount: 3,  // 计算出最多能选几张
      outputType: 0
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.product.images.push(results[i]);
      }
    }, (err) => { });
  }

  //完成
  save(){
    if(this.saveAndNew()){
      this.navCtrl.pop();
    }
  }

  //继续添加
  saveAndNew(){
    let alert = this.alertCtrl.create({
      title: '提示',
      message:'添加商品成功',
      buttons:['确定']
    });

    let p=this.product;
    if(p.barcode && p.name && p.price && this.supplier){
      this.productService.add(this.product);
      alert.present();
      console.log(this.product)
      this.product.categoryId=this.categoryService.activeCategory.id;
      this.product.categoryName=this.categoryService.activeCategory.name;
      this.product.images=[];
      this.product.barcode='';
      this.product.name='';
      this.product.price=0;
      this.product.purchasePrice=0;
      this.product.stock=0;
      this.product.standard='';
      this.product.note='';
      this.product.supplierPhone='';
      this.product.supplierName='';
      this.supplier='';
      return true;
    }else{
      alert.setMessage('请检查，*号为必填项目');
      alert.present();
      return false;
    }
  }

  //新增供应商
  showPrompt(){
    let prompt = this.alertCtrl.create({
      title: '新增供货商',
      inputs: [
        {
          name: 'name',
          placeholder: '供应商名称（必填）'
        },
        {
          name: 'phone',
          placeholder: '供应商电话（必填）'
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
          text: '保存',
          handler: data => {
            console.log(data);
            this.product.supplierName=data.name;
            this.product.supplierPhone=data.phone;
            this.supplier=data.name+'  '+'电话：'+data.phone;
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }
  ionViewDidLeave(){

  }
  ionViewWillUnload(){
    this.events.unsubscribe('activeCategory:update');
  }

}
