import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { CartItemComponent } from '../cart-item/cart-item.component';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  const cartServiceStub = {
    getCartObservable: jasmine.createSpy().and.returnValue(new BehaviorSubject([])),
    removeFromCart: jasmine.createSpy()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent, CartItemComponent,HeaderComponent ], 
      imports: [MatCardModule],
      providers: [
        { provide: CartService, useValue: cartServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCartObservable on initialization', () => {
    expect(cartService.getCartObservable).toHaveBeenCalled();
  });

  it('should update cartItems when cart service emits new value', () => {
    const dummyCartItems = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2 },
      { id: 2, name: 'Product 2', price: 15, quantity: 1 }
    ];

    spyOn(component, 'getTotalPrice').and.returnValue(35);

    const cartObservable = cartService.getCartObservable() as BehaviorSubject<any[]>;
    cartObservable.next(dummyCartItems);

    expect(component.cartItems).toEqual(dummyCartItems);
  });

  it('should calculate total price correctly', () => {
    const dummyCartItems = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2 },
      { id: 2, name: 'Product 2', price: 15, quantity: 1 }
    ];

    component.cartItems = dummyCartItems;

    const totalPrice = component.getTotalPrice();

    expect(totalPrice).toBe(35);
  });

  it('should call removeFromCart method on cart service when removeItem is called', () => {
    const dummyCartItem = { id: 1, name: 'Product 1', price: 10, quantity: 2 };
  
    // Spy on the removeFromCart method of the cartService
    spyOn(cartService, 'removeFromCart');
  
    // Call the removeItem method on the component with the dummy cart item
    component.removeItem(dummyCartItem);
  
    // Use expect to check whether the removeFromCart method of the cartService was called with the dummy cart item
    expect(cartService.removeFromCart).toHaveBeenCalledWith(dummyCartItem);
  });
  

});
