import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, map } from 'rxjs';

import { environments } from 'src/environments/environments';
import { UserInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user   ?: UserInterface;
  private baseUrl : string = environments.baseUrl;

  constructor( private http : HttpClient ) { }

  public getCurrentUser() : UserInterface | undefined {
    if(!this.user?.id) {
      return undefined;
    }

    return structuredClone(this.user);
  }

  public login(email : string, password : string) : Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.baseUrl}/users/1`)
      .pipe(
        tap((response) => this.user = response),
        tap((response) => localStorage.setItem('token', JSON.stringify(response.id)))
      );
  }

  public checkAuthentication() : Observable<boolean> {
    const token = localStorage.getItem('token');

    if(!token) {
      return of(false);
    }

    return this.http.get<UserInterface>(`${this.baseUrl}/users/1`)
      .pipe(
        tap((response) => this.user = response),
        map((response) => !!response),
        catchError((error) => of(false))
      )
  }
  public logout() : void {
    localStorage.clear();
    return; 
  }
}
