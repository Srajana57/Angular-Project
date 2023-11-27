// authentication.service.ts

import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  haveaccess: boolean = false;

  constructor(private auth: Auth, private route: Router) { }

  signup(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        this.haveaccess = true;
        alert("Login successful");
        this.route.navigate(['/home']);
      })
      .catch(err => {
        this.haveaccess = false;
        console.error(err);
        alert("Login failed. Please check your credentials.");
      })
    );
  }
  

  logout(): Observable<void> {
    return from(signOut(this.auth))
      .pipe(
        finalize(() => {
          this.haveaccess = false;
          this.route.navigate(['/login']);
        })
      );
  }

  loggedIn(): boolean {
    return this.haveaccess;
  }
}
