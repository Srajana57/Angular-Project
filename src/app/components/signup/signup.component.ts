import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordDontMatch: 'true'
      };
    }
    return null;
  };

}

export function ValidateEmail(control: AbstractControl) {
  if (!control.value.includes('@gmail.com')) {
    return { invalid: true };
  }
  return null;
}
export function passwordValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
 
      const value = control.value;
 
      if (!value) {
          return null;
      }
 
      const hasUpperCase = /[A-Z]+/.test(value);
 
      const hasLowerCase = /[a-z]+/.test(value);
 
      const hasNumeric = /[0-9]+/.test(value);
 
      const hasSpecialChar = /[$@$!%*?&]+/.test(value)
 
      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
 
      return !passwordValid ? {passwordStrength:true}: null;
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],

})
export class SignUpComponent {
  

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required,ValidateEmail]),
    password: new FormControl('', [Validators.required,passwordValidator()]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordMatchValidator() });

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  

  submit() {
    const { name, email, password } = this.signUpForm.value;
    if (!this.signUpForm.valid || !name || !email || !password) {
      return;
    }

    

    this.authentication.signup(email, password).subscribe({
      next: () => {
        alert('Congrats! You are all signed up');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('An error occurred during signup. Please try again.');
      },
      
    });
  }
}
