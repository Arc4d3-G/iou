import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface UserData {
  email: string;
  id: string;
  token: string;
}

export interface apiResponse {
  success: boolean;
  data: UserData | null;
  error: { message: string } | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.authApiUrl;

  constructor(private http: HttpClient) {}

  registerUser(email: string, password: string): Observable<apiResponse> {
    return this.http
      .post<any>(`${this.apiUrl}register`, { email, password })
      .pipe(catchError(this.handleError));
  }

  loginUser(email: string, password: string): Observable<apiResponse> {
    return this.http
      .post<any>(`${this.apiUrl}login`, { email, password })
      .pipe(catchError(this.handleError));
  }

  fetchUserData(token: string): Observable<apiResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<any>(`${this.apiUrl}user`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.log({ errorAtHandle: error });

    let errorMessage =
      'Unable to connect to the server. Please try again later.';

    if (error.error?.error?.message) {
      errorMessage = error.error.error.message;
    }
    console.log({ msg: errorMessage });
    console.error('Error:', errorMessage); // For debugging
    return throwError(() => new Error(errorMessage));
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setAuthId(authId: string): void {
    localStorage.setItem('authId', authId);
  }

  getAuthId(): string | null {
    return localStorage.getItem('authId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
