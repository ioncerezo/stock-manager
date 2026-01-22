import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url: string = 'https://dummyjson.com/products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + id);
  }

  createProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(this.url + '/add', data);
  }

  updateProduct(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(this.url + '/' + id, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
}
