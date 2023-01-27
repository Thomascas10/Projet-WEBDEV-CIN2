import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/models/Tache.model';
import { TacheService } from 'src/app/services/Tache.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
  pending: Tache[] = [];
  done: Tache[] = [];
  undergoing: Tache[] = [];
  undefinedd: Tache[] = [];

  constructor(private TacheService: TacheService) { }

  ngOnInit(): void {
    this.retrieveTaches();
  }

  retrieveTaches(): void {
    this.TacheService.getAll()
      .subscribe({
        next: (data) => {
          //this.Taches = data;
          if (data) {
            //this.Taches = data;
            this.pending = data.filter(t => t.published === 'pending');
            this.done = data.filter(t => t.published === 'done');
            this.undergoing = data.filter(t => t.published === 'undergoing');
            this.undefinedd = data.filter(t => t.published === 'undefined');
          }

          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  drop(event: CdkDragDrop<Tache[]>, target: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // get the item that was dropped
      const item = event.previousContainer.data[event.previousIndex];
      const data = {
        title: item.title,
        description: item.description,
        published: target
      };
      console.log(item)
      this.TacheService.update(item.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
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