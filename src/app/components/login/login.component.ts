import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  haveaccess:boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
   
  ) {}

  submit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    const { email, password } = loginForm.value;

    this.authenticationService.login(email, password);
  }
 
}
