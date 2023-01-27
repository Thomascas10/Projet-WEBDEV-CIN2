import { Component } from '@angular/core';
import { Tache } from 'src/app/models/Tache.model';
import { TacheService } from 'src/app/services/Tache.service';

@Component({
  selector: 'app-add-Tache',
  templateUrl: './add-Tache.component.html',
  styleUrls: ['./add-Tache.component.css']
})
export class AddTacheComponent {

  Tache: Tache = {
    title: '',
    description: '',
    published: 'undefined'
  };
  submitted = false;

  constructor(private TacheService: TacheService) { }

  saveTache(): void {
    const data = {
      title: this.Tache.title,
      description: this.Tache.description
    };

    this.TacheService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTache(): void {
    this.submitted = false;
    this.Tache = {
      title: '',
      description: '',
      published: 'undefined'
    };
  }

}