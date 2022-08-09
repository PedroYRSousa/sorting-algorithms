import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ViewsortComponent } from './viewsort/viewsort.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SortComponent } from './viewsort/sort/sort.component';
import { CanvasComponent } from './viewsort/canvas/canvas.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ViewsortComponent,
    SortComponent,
    CanvasComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
