import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { Observable, retry } from 'rxjs';
import { HeroInteraface } from '../../interfaces';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public heroes : HeroInteraface[] = [];
  
  constructor( private heroesService : HeroService ) {  }

  ngOnInit(): void {
    this.retireveHeros();
  }

  private retireveHeros() : void {
    this.heroesService.getHeroes().subscribe(
      (response : HeroInteraface[]) => {
        this.heroes = response;
      }
    );
  }
}
