import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  public id: number | null = null;
  public formulario: Product = {
    title: '',
    description: '',
    price: 0,
    stock: 0,
  };
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private cd: ChangeDetectorRef,
  ) {
    this.obtenerId();
    if (this.id) {
      this.productService.getProductById(this.id).subscribe({
        next: (data) => {
          this.formulario = {
            title: data.title,
            description: data.description,
            price: data.price,
            stock: data.stock,
          };
          cd.detectChanges();
        },
      });
    }
  }

  enviarFormulario() {
    if (this.id) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  private createProduct() {
    this.productService.createProduct(this.formulario).subscribe({
      next: (data) => {
        alert('Creado exitosamente\n' + JSON.stringify(data));
        this.router.navigate(['/productos']);
      },
      error: (error) => alert('Error al crear:\n' + JSON.stringify(error)),
    });
  }

  private updateProduct() {
    if (this.id) {
      this.productService.updateProduct(this.id, this.formulario).subscribe({
        next: (data) => {
          alert('Actualizado\n' + JSON.stringify(data));
          this.router.navigate(['/productos']);
        },
        error: (error) => alert('Error al actualizar:\n' + JSON.stringify(error)),
      });
    }
  }

  private obtenerId(): void {
    this.ar.params.subscribe({
      next: (data) => {
        this.id = Number(data['id']);
      },
      error: (error) => {
        console.error;
        this.router.navigate(['/productos']);
      },
    });
  }
}
