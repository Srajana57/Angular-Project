import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);

  addToCart(item: any) {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      item.quantity = 1;
      this.cartItems.push(item);
    }
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(item: any) {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        this.cartItems = this.cartItems.filter(i => i.id !== item.id);
      }
    }
    this.cartSubject.next([...this.cartItems]);
    console.log('Cart Items after removal:', this.cartItems);
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }
}
