import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroInteraface } from '../interfaces';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroService {

    private baseUrl : string = environments.baseUrl

    constructor(private http : HttpClient) { }
    
    public getHeroes() : Observable<HeroInteraface[]> {
        return this.http.get<HeroInteraface[]>(`${this.baseUrl}/heroes`)
    }
}