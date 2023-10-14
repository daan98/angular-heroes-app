import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HeroInteraface } from '../interfaces';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroService {

    private baseUrl : string = environments.baseUrl

    constructor(private http : HttpClient) { }
    
    public getHeroes() : Observable<HeroInteraface[]> {
        return this.http.get<HeroInteraface[]>(`${this.baseUrl}/heroes`);
    }

    public getHero(id : string) : Observable<HeroInteraface | undefined> {
        return this.http.get<HeroInteraface>(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError(error => of(undefined))
            );
    }

    public getSuggestion(query : string, limit : number) : Observable<HeroInteraface[]> {
        return this.http.get<HeroInteraface[]>(`${this.baseUrl}/heroes?q=${query}&_limit=${limit}`);
    }

    public addHero(hero : HeroInteraface) : Observable<HeroInteraface> {
        return this.http.post<HeroInteraface>(`${this.baseUrl}/heroes`, hero);
    }

    public updateHero(hero : HeroInteraface) : Observable<HeroInteraface> {
        if (!hero.id) {
            throw Error('hero id is required');
        }

        return this.http.patch<HeroInteraface>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }

    public deleteHero(id : string) : Observable<boolean> {
        return this.http.delete(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError(error => of(false)),
                map(response => true)
            );
    }
}