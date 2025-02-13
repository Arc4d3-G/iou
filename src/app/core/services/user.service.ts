import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  authUserId: number;
  createdAt: string;
  currency: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.iouApiUrl + '/users';

  constructor(private http: HttpClient) {}

  // Fetch user by authUserId
  getUserByAuthUserId(authUserId: number): Observable<User | null> {
    return this.http
      .get<User>(`${this.apiUrl}/auth/${authUserId}`)
      .pipe(catchError(this.handleError));
  }

  // Fetch user by userId
  getUserById(userId: number): Observable<User | null> {
    return this.http
      .get<User>(`${this.apiUrl}/${userId}`)
      .pipe(catchError(this.handleError));
  }

  // Create a new user
  createUser(user: User): Observable<User | string | null> {
    return this.http
      .post<User | string>(this.apiUrl, user, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError));
  }

  // Centralized error handler
  private handleError(error: HttpErrorResponse): Observable<null> {
    console.log({ errorAtHandle: error });

    if (error.status === 404) {
      return of(null); // User not found
    } else if (error.status === 0) {
      return throwError(() => new Error('Backend unreachable')); // Backend is down
    }

    return throwError(() => new Error(error.error || 'Unknown error occurred'));
  }
}
