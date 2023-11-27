import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthenticationService]
})
export class HeaderComponent implements OnInit {

  cartCount: number = 0;
  

  constructor(private cartService: CartService,public authenticationService: AuthenticationService) {}
   logout() {
    this.authenticationService.logout().subscribe();
  }

  ngOnInit() {
    this.cartService.getCartObservable().subscribe(items => {
      this.cartCount = items.reduce((acc, item) => acc + item.quantity, 0); 
      console.log('Is user logged in?', this.authenticationService.loggedIn());
    });

  }
 

    
  

}
