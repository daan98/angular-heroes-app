import { Component, OnInit } from '@angular/core';
import { HeroInteraface } from '../../interfaces';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'heroes-hero',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {
  public hero ?: HeroInteraface;

  constructor(
    private heroesService : HeroService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.retrieveHeroInfo();
  }

  private retrieveHeroInfo() : void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHero(id))
      )
      .subscribe(
        (response : HeroInteraface | undefined) => {
          if (!response) {
            return this.router.navigate(['heroes/list']);
          }
          
          return this.hero = response;
        }
      )
  }

  public goBack() : void {
    this.router.navigate(['heroes/list']);
  }
}
