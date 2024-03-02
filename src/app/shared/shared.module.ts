import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { TitlesDirective } from './titles.directive';
import { ValidationErrorsPipe } from './validation-errors.pipe';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    FullNamePipe,
    TitlesDirective,
    ValidationErrorsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    TitlesDirective,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCardModule,
    ValidationErrorsPipe,
    MatSelectModule    
  ]
})
export class SharedModule { }
