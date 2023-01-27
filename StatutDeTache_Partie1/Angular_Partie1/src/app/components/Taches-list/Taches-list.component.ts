import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/models/Tache.model';
import { TacheService } from 'src/app/services/Tache.service';

@Component({
  selector: 'app-Taches-list',
  templateUrl: './Taches-list.component.html',
  styleUrls: ['./Taches-list.component.css']
})
export class TachesListComponent implements OnInit {

  Taches?: Tache[];
  currentTache: Tache = {};
  currentIndex = -1;
  title = '';

  constructor(private TacheService: TacheService) { }

  ngOnInit(): void {
    this.retrieveTaches();
  }

  retrieveTaches(): void {
    this.TacheService.getAll()
      .subscribe({
        next: (data) => {
          this.Taches = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTaches();
    this.currentTache = {};
    this.currentIndex = -1;
  }

  setActiveTache(Tache: Tache, index: number): void {
    this.currentTache = Tache;
    this.currentIndex = index;
  }

  removeAllTaches(): void {
    this.TacheService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentTache = {};
    this.currentIndex = -1;

    this.TacheService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.Taches = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
    deleteTache(id: string): void {
    this.TacheService.delete(id)
      .subscribe({
        next: (res) => {
          this.refreshList();
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

}