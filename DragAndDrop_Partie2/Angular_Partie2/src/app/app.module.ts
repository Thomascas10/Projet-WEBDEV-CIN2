import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTacheComponent } from './components/add-Tache/add-Tache.component';
import { TacheDetailsComponent } from './components/Tache-details/Tache-details.component';
import { TachesListComponent } from './components/Taches-list/Taches-list.component';
import { TestComponent } from './test/test.component';
import { DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    AddTacheComponent,
    TacheDetailsComponent,
    TachesListComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
