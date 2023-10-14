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

  constructor(private heroesService : HeroService, private activatedRoute : ActivatedRoute, private router : Router) {
    console.log('activatedRoute: ', activatedRoute);
    // console.log('rootSnapshot: ', rootSnapshot);
    /* const id = root.params.pipe(map(p => p));
    console.log('id value --> ', id); */
    /* root.queryParams.subscribe(params => {
      console.log(params);
    }); */
    
  }

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
          console.log('RESPONSE: ', response);
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
