import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TachesListComponent } from './components/Taches-list/Taches-list.component';
import { TacheDetailsComponent } from './components/Tache-details/Tache-details.component';
import { AddTacheComponent } from './components/add-Tache/add-Tache.component';

const routes: Routes = [
  { path: '', redirectTo: 'Taches', pathMatch: 'full' },
  { path: 'Taches', component: TachesListComponent },
  { path: 'Taches/:id', component: TacheDetailsComponent },
  { path: 'add', component: AddTacheComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }