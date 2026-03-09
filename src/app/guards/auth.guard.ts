import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../features/home/services/auth.service';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {

    return this.authService.isLoggedIn.pipe(take(1),map(userIsLoggedIn => {
      if (userIsLoggedIn) {
        return true;
      }
      else{
        this.router.navigate(['/home']);
        return false;
      }
    }));
  }
}