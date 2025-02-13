import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    const authUserId = this.authService.getAuthId();
    if (!authUserId) {
      console.log({ profileGuard: 'No authUserId' });
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.userService.getUserByAuthUserId(parseInt(authUserId)).pipe(
      map((user) => {
        console.log({ user: user });
        if (!user) {
          this.router.navigate(['/profile-setup']);
          return false;
        }
        return true;
      }),
      catchError((error) => {
        console.log({ profileGuardError: error });
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
