import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';


import { EmptyFieldInterface, HeroInteraface, Publisher } from '../../interfaces';
import { HeroService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: [
  ]
})
export class NewHeroPageComponent implements OnInit {
  public heroForm : FormGroup = new FormGroup(
    {
      id:                   new FormControl<string>(''),
      superhero:            new FormControl<string>('', { nonNullable: true }),
      publisher:            new FormControl<Publisher>(Publisher.DCComics),
      alter_ego:            new FormControl<string>(''),
      first_appearance:     new FormControl<string>(''),
      characters:           new FormControl<string>(''),
      alter_img:            new FormControl<string>(''),
    }
  );
  public publishers = [
    {
      id: 'DC Comics',
      label: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      label: 'Marvel - Comics'
    }
  ];

  constructor(
    private heroesService : HeroService,
    private activateRoute : ActivatedRoute,
    private router        : Router,
    private snackbar      : MatSnackBar,
    private dialog        : MatDialog,
  ) {  }

  ngOnInit(): void {
    if(this.router.url.includes('edit')) {
      this.getCurrentHeroInformation();
    }
  }

  get currentHero() : HeroInteraface {
    const hero = this.heroForm.value as HeroInteraface;
    return hero;
  }

  public onSubmitForm() : void {
    if (this.heroForm.invalid) {
      const fieldsValueArray : [] = Object.values(this.heroForm.value) as [];
      const fieldsTitleArray : [] = Object.keys(this.heroForm.value) as [];
      const emptyFieldFound = this.checkEmptyFields(fieldsValueArray, fieldsTitleArray);
      
      this.showSnackbar(emptyFieldFound.message);
      return;
    }

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe(
        (response) => {
          this.showSnackbar('Hero updated succesfully');
          return this.router.navigateByUrl('/');
        });
      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe(
      (response) => {
        this.router.navigate(['/heroes/edit', response.id])
        this.showSnackbar('Hero created succesfully');
      }
    )
  }

  private getCurrentHeroInformation() : void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHero(id))
      ).subscribe(
        (response) => {
          if(!response) {
            return this.router.navigateByUrl('/');
          }

          return this.heroForm.reset(response);
        }
      );
  }

  private showSnackbar(message : string) : void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }

  public onDeleteHero(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    if (!this.currentHero.id) {
      throw new Error('superhero Id is needed.');
      return;
    }

    const dialogRef =  this.dialog.open(ConfirmDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.currentHero
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result : boolean) => result),
        switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
        filter((wasDeleted : boolean) => wasDeleted)
      )
      .subscribe(
      () => {
        this.router.navigate(['/heroes']);
      }
    )
  }

  private checkEmptyFields(fields: [], fieldsTitle : []) : EmptyFieldInterface {
    let emptyFieldsAmount : number = -1;
    let emptyFieldTitle   : string = '';
    
    fields.forEach((field, index) => {
      if (!field && fieldsTitle[index] !== 'alter_img') {
        emptyFieldsAmount += 1;
        emptyFieldTitle = fieldsTitle[index];
      }
    });

    return {
      amount: emptyFieldsAmount,
      message: emptyFieldsAmount === 0 ?  `${emptyFieldTitle.replaceAll('_', ' ')} is empty` : 'There are empty fields',
    };
  }
  
}
