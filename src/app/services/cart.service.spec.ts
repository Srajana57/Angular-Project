import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';


describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    const item = { id: 1, name: 'Product 1', quantity: 1 };
    service.addToCart(item);

    service.getCartObservable().subscribe(cartItems => {
      expect(cartItems).toEqual([item]);
    });
  });

  it('should increment quantity for existing item in cart', () => {
    const item = { id: 1, name: 'Product 1', quantity: 1 };
    service.addToCart(item);

    const newItem = { id: 1, name: 'Product 1', quantity: 2 };
    service.addToCart(newItem);

    service.getCartObservable().subscribe(cartItems => {
      expect(cartItems).toEqual([newItem]);
    });
  });

  it('should remove item from cart', () => {
    const item1 = { id: 1, name: 'Product 1', quantity: 1 };
    const item2 = { id: 2, name: 'Product 2', quantity: 1 };
    service.addToCart(item1);
    service.addToCart(item2);

    service.removeFromCart(item1);

    service.getCartObservable().subscribe(cartItems => {
      expect(cartItems).toEqual([item2]);
    });
  });

  it('should decrement quantity for existing item in cart', () => {
    const item = { id: 1, name: 'Product 1', quantity: 2 };
    service.addToCart(item);
  
    const newItem = { id: 1, name: 'Product 1', quantity: 1 };
    // Add the newItem to the cart before removing it
    service.addToCart(newItem);
  
    service.removeFromCart(newItem);
  
    service.getCartObservable().subscribe(cartItems => {
      expect(cartItems).toEqual([item]); // Expecting item with quantity 1
    });
  });
  

  it('should remove item completely if quantity becomes zero', () => {
    const item = { id: 1, name: 'Product 1', quantity: 1};
    service.addToCart(item);

    const newItem = { id: 1, name: 'Product 1', quantity: 0 };
    service.removeFromCart(newItem);

    service.getCartObservable().subscribe(cartItems => {
      expect(cartItems).toEqual([]);
    });
  });
});

