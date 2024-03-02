import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentDetailComponent } from './pages/enrollment-detail/enrollment-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentsComponent
  },
  {
    path: ':id',
    component: EnrollmentDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule { }
