import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.scss']
})
export class FlowersComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedColor: string = '';
  selectedDelivery: string = '';
  colors: string[] = [];
  deliveries: string[] = [];
  private searchSubject = new Subject();
  

  constructor(private http: HttpClient, private router: Router,private cartService: CartService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(() => this.filterProducts());
  }
  
  
  ngOnInit() {
    this.http.get('assets/products.json').subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = [...this.products]; 
      this.colors = [...new Set(this.products.map(product => product.color))];
      this.deliveries = [...new Set(this.products.map(product => product.delivery))];
    });
  }

  redirectToDescription(productId: number) {
    this.router.navigate(['/description', productId]);
  }

  searchProducts() {
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products
      .filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .filter(product =>
        !this.selectedColor || product.color === this.selectedColor
      )
      .filter(product =>
        !this.selectedDelivery || product.delivery === this.selectedDelivery
      );
  }

  sortByName() {
    this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByPrice() {
    this.filteredProducts.sort((a, b) => a.price - b.price);
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  
}
