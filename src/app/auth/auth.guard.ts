import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const log = inject(AuthenticationService);
  const routes = inject(Router);
  if (log.loggedIn() === true){
    return true;
  }
  else{
    routes.navigate(['/not-found']);
    return false;
  }
};
