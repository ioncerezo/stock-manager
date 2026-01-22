import { Component } from '@angular/core';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../models/product';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  public products: Array<Product> | undefined = undefined;
  public productsFiltrados: Array<Product> | undefined = undefined;
  public total: number = 0;
  public loading: boolean = true;
  public esError: boolean = false;
  public busqueda: string = '';

  constructor(
    private productService: ProductsService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = [...Object.values(this.obtenerProductos(data))];
        this.productsFiltrados = [...this.products];
        this.calcularPrecioTotal();
        this.loading = false;
        cd.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.esError = true;
        cd.detectChanges();
      },
    });
  }

  calcularPrecioTotal() {
    this.total = 0;
    this.productsFiltrados?.forEach((producto) => {
      this.total += producto.price;
    });
  }
  filtrar() {
    this.productsFiltrados = this.products?.filter((producto) =>
      producto.title.toLowerCase().trim().includes(this.busqueda.toLowerCase().trim()),
    );
    this.calcularPrecioTotal();
    this.cd.detectChanges();
  }

  navegarDetail(id: number | undefined) {
    if (id) {
      this.router.navigate(['/producto', id]);
    }
  }

  eliminar(id?: number) {
    if (id) {
      if (confirm('Estas seguro de que quieres eliminar')) {
        this.productService.deleteProduct(id).subscribe({
          next: (data) => {
            alert('Eliminado correctamente:\n' + JSON.stringify(data));
            this.productsFiltrados = this.products?.filter((producto) => producto.id !== id);
            this.calcularPrecioTotal();
            this.cd.detectChanges();
          },
          error: (error) => {
            console.error(error);
            alert('No se ha eliminado');
          },
        });
      }
    }
  }

  editar(id?: number) {
    this.router.navigate(['/gestionar', id]);
  }

  obtenerProductos(data: any): Product {
    return data['products'].map((product: any) => {
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        thumbnail: product.thumbnail,
      };
    });
  }
}
