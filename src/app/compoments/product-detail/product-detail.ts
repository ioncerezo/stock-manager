import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  public id: number = 0;
  public producto?: Product;
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private cd: ChangeDetectorRef,
  ) {
    ar.params.subscribe({
      next: (data) => {
        this.id = data['id'];
        this.obtenerProducto();
      },
      error: (error) => {
        console.error;
        router.navigate(['/productos']);
      },
    });
  }
  obtenerProducto() {
    this.productService.getProductById(this.id).subscribe({
      next: (data) => {
        this.producto = {
          id: this.id,
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail,
          price: data.price,
          stock: data.stock,
        };
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.router.navigate(['/productos']);
      },
    });
  }

  eliminar() {
    if (confirm('Estas seguro de que quieres eliminar')) {
      this.productService.deleteProduct(this.id).subscribe({
        next: (data) => {
          alert('Eliminado correctamente:\n' + JSON.stringify(data));
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          console.error(error);
          alert('No se ha eliminado');
        },
      });
    }
  }

  editar() {
    this.router.navigate(['/gestionar', this.id]);
  }
}
