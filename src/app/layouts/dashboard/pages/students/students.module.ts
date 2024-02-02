import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsServices } from './students.service';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent,
    StudentDetailComponent
  ],
  imports: [
    SharedModule,
    StudentsRoutingModule,
    CommonModule
  ],
  providers: [
    StudentsServices
  ]
})
export class StudentsModule { }
