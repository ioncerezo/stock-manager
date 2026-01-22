import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './compoments/product-list/product-list';
import { ProductDetail } from './compoments/product-detail/product-detail';
import { ProductForm } from './compoments/product-form/product-form';
import { NotFound } from './compoments/not-found/not-found';

const routes: Routes = [
  {
    path: 'productos',
    component: ProductList,
  },
  {
    path: 'producto/:id',
    component: ProductDetail,
  },
  {
    path: 'gestionar',
    component: ProductForm,
  },
  {
    path: 'gestionar/:id',
    component: ProductForm,
  },
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFound,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
