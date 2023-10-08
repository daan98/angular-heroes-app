import { Component, Input, OnInit } from '@angular/core';
import { HeroInteraface } from '../../interfaces';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {
  @Input() hero !: HeroInteraface;

  ngOnInit(): void {
    if(!this.hero) {
      throw new Error('Hero properties needed');
    }
  }
}
