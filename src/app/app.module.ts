import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {WelcomePage} from "../pages/welcome/welcome";
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import {RegisterPage} from "../pages/register/register";
import {FormsModule} from "@angular/forms";
import { AuthenticationCodeProvider } from '../providers/authentication-code/authentication-code';
import {LoginPage} from "../pages/login/login";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import {CopyrightComponent} from "../components/copyright/copyright";
import {SettingPage} from "../pages/setting/setting";
import {ShopPage} from "../pages/shop/shop";
import {EditShopPage} from "../pages/edit-shop/edit-shop";
import {AboutUsPage} from "../pages/about-us/about-us";
import {EditPasswordPage} from "../pages/edit-password/edit-password";
import {CategoryListPage} from "../pages/category-list/category-list";
import { CategoryProvider } from '../providers/category/category';
import {AddCategoryPage} from "../pages/add-category/add-category";
import {EditCategoryPage} from "../pages/edit-category/edit-category";
import {EditCategoryNamePage} from "../pages/edit-category-name/edit-category-name";
import { ProductProvider } from '../providers/product/product';
import {AddProductPage} from "../pages/add-product/add-product";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {ProductListPage} from "../pages/product-list/product-list";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductDetailPage} from "../pages/product-detail/product-detail";
import {PopoverPage} from "../pages/popover/popover";
import {SharePage} from "../pages/share/share";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    LoginPage,
    ForgotPasswordPage,
    CopyrightComponent,
    SettingPage,
    ShopPage,
    EditShopPage,
    AboutUsPage,
    EditPasswordPage,
    CategoryListPage,
    AddCategoryPage,
    EditCategoryPage,
    EditCategoryNamePage,
    AddProductPage,
    ProductListPage,
    ProductDetailPage,
    PopoverPage,
    SharePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回', // 配置返回按钮的文字
      backButtonIcon: 'arrow-dropleft-circle' // 配置返回按钮的图标
    }),
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    LoginPage,
    ForgotPasswordPage,
    CopyrightComponent,
    SettingPage,
    ShopPage,
    EditShopPage,
    AboutUsPage,
    EditPasswordPage,
    CategoryListPage,
    AddCategoryPage,
    EditCategoryPage,
    EditCategoryNamePage,
    AddProductPage,
    ProductListPage,
    ProductDetailPage,
    PopoverPage,
    SharePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalStorageProvider,
    AuthenticationCodeProvider,
    CopyrightComponent,
    CategoryProvider,
    ProductProvider,
    BarcodeScanner,
    Camera,
    ImagePicker,
    HttpClient,
  ]
})
export class AppModule {}
