import { Component, Input, OnInit } from '@angular/core';
import { TacheService } from 'src/app/services/Tache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tache } from 'src/app/models/Tache.model';

@Component({
  selector: 'app-Tache-details',
  templateUrl: './Tache-details.component.html',
  styleUrls: ['./Tache-details.component.css']
})
export class TacheDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentTache: Tache = {
    title: '',
    description: '',
    published: 'undefined'
  };
  
  message = '';

  constructor(
    private TacheService: TacheService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTache(this.route.snapshot.params["id"]);
    }
  }

  getTache(id: string): void {
    this.TacheService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTache = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(published: string): void {
    const data = {
      title: this.currentTache.title,
      description: this.currentTache.description,
      published: published
    };

    this.message = '';

    this.TacheService.update(this.currentTache.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (published == 'pending') {
            this.currentTache.published = 'pending';
          } else if (published == 'done') {
            this.currentTache.published = 'done';
          }
          else if (published == 'undergoing') {
            this.currentTache.published = 'undergoing';
          } else {
            this.currentTache.published = 'undefined';
          }
          this.message = 'La tâche a bien été Mise à Jour !';
        },
        error: (e) => console.error(e)
      });
  }


  updatePublishedDrag(published: string, titre:string, desc:string): void {
    const data = {
      title: titre,
      description: desc,
      published: published
    };

    this.message = '';

    this.TacheService.update(this.currentTache.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (published == 'pending') {
            this.currentTache.published = 'pending';
          } else if (published == 'done') {
            this.currentTache.published = 'done';
          }
          else if (published == 'undergoing') {
            this.currentTache.published = 'undergoing';
          } else {
            this.currentTache.published = 'undefined';
          }
          this.message = 'La tâche a bien été Mise à Jour !';
        },
        error: (e) => console.error(e)
      });
  }

  updateTache(): void {
    this.message = '';

    this.TacheService.update(this.currentTache.id, this.currentTache)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = 'La tâche a bien été Mise à Jour !';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTache(): void {
    this.TacheService.delete(this.currentTache.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/Taches']);
        },
        error: (e) => console.error(e)
      });
  }

}