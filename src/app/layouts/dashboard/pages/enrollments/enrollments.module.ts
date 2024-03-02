import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentsEffects } from './store/enrollments.effects';
import { StoreModule } from '@ngrx/store';
import { enrollmentsFeature } from './store/enrollments.reducer';
import { EnrollmentDetailComponent } from './pages/enrollment-detail/enrollment-detail.component';
import { StudentsServices } from '../students/students.service';
import { CoursesServices } from '../courses/courses.service';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { EnrollmentsService } from './enrollments.service';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    EnrollmentsComponent,
    EnrollmentDialogComponent,
    EnrollmentDetailComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    SharedModule,
    StoreModule.forFeature(enrollmentsFeature),
    EffectsModule.forFeature([EnrollmentsEffects])
  ],
  providers: [
    StudentsServices,
    CoursesServices,
    EnrollmentsService
  ]
})
export class EnrollmentsModule { }
