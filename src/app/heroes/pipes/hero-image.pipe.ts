import { Pipe, PipeTransform } from '@angular/core';
import { HeroInteraface } from '../interfaces';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: HeroInteraface,): string {
    if(!hero.id && !hero.alter_img) {
      return 'assets/no_image.jpg';
    }

    if(hero.alter_img) {
      return hero.alter_img;
    }

    return `assets/heroes/${hero.id}.jpg`;
  }

}
