import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CoursesComponent } from './courses.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesServices } from './courses.service';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogComponent,
    CourseDetailComponent
  ],
  imports: [
    SharedModule,
    CoursesRoutingModule,
    CommonModule
  ],
  providers: [
    CoursesServices
  ]
})
export class CoursesModule { }
