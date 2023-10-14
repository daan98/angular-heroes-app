import { Component } from '@angular/core';
import { HeroInteraface } from '../../interfaces';
import { HeroService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  
  public heroes            : HeroInteraface[] = [];
  public heroesControl     : FormControl      = new FormControl('');
  public filteredOptions  ?: HeroInteraface;

  constructor( private heroService : HeroService ) {  }

  public onSearchhero() : void {
    this.heroService.getSuggestion(this.heroesControl.value, 6).subscribe(
      (response : HeroInteraface[]) =>  {
        this.heroes = response;
      }
    );
  }

  public onSeletedOption(event : MatOptionSelectionChange) : void {
    if (!event.source.value) {
      this.filteredOptions = undefined;
      return;
    }

    const hero : HeroInteraface = event.source.value;
    this.heroesControl.setValue(hero.superhero);
    this.filteredOptions = hero;
  }

}