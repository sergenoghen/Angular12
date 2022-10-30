import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

const uiModules = [
  CommonModule,
  ReactiveFormsModule ,
  MatProgressSpinnerModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatButtonModule, 
  MatToolbarModule, MatSidenavModule, MatListModule, MatDatepickerModule,
  FormsModule,
];

@NgModule({
  declarations: [],
  imports:  uiModules,
  exports:  uiModules
})
export class AppMatUiModule { }
