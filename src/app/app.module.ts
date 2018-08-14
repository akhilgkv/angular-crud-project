import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { crudService } from './crud.service';
import { crudComponent } from './crud.component';

@NgModule({
  declarations: [
    AppComponent,
    crudComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    crudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
