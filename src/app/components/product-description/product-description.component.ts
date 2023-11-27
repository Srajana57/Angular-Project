import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  productId: number = 0;
  product: any | undefined;
  cartCount: number = 0;
  newName: string = '';
  newComment: string = '';
  names: string[] = [];
  comments: { productId: number, name: string, text: string }[] = [];
  

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private cartService: CartService) { }

  addComment() {
    if (this.newName && this.newComment) {
      this.comments.push({ productId: this.productId, name: this.newName, text: this.newComment });
      this.newName = '';
      this.newComment = '';
      this.saveCommentsToLocalStorage();
      

    }
  }

  saveCommentsToLocalStorage() {
    const updatedComments = this.comments.filter(comment => comment.productId !== this.productId);
    updatedComments.push(...this.comments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  }

  loadCommentsFromLocalStorage() {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      this.comments = JSON.parse(storedComments)
        .filter((comment: { productId: number; }) => comment.productId === this.productId);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['productId'] || 0;
      this.loadProduct(); 
  
      this.cartService.getCartObservable().subscribe(items => {
        const productInCart = items.find(item => item.id === this.productId);
        this.cartCount = productInCart ? productInCart.quantity : 0;
      });
    });
    this.loadCommentsFromLocalStorage();
  }
  

  loadProduct() {
    this.http.get('assets/products.json').subscribe((data: any) => {
      this.product = data.find((p: any) => p.id === this.productId);
    });
  }
  getStarsArray(): number[] {
    return Array.from({ length: 5 }, (_, index) => index + 1);
  }
  goBack() {
    this.router.navigate(['/flowers']);
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.cartCount = this.product.quantity; // Set cartCount to the quantity of the product
    }
  }
  

  removeFromCart() {
    if (this.product) {
      this.cartService.removeFromCart(this.product);
      this.cartCount = this.product.quantity; // Set cartCount to the quantity of the product
    }
  }
}  
