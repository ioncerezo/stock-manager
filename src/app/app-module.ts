import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './compoments/product-list/product-list';
import { ProductDetail } from './compoments/product-detail/product-detail';
import { ProductForm } from './compoments/product-form/product-form';
import { NotFound } from './compoments/not-found/not-found';

@NgModule({
  declarations: [
    App,
    ProductList,
    ProductDetail,
    ProductForm,
    NotFound
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
