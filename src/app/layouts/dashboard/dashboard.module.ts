import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentDetailComponent } from './pages/students/pages/student-detail/student-detail.component';
import { UserDetailComponent } from './pages/users/pages/user-detail/user-detail.component';
import { CourseDetailComponent } from './pages/courses/pages/course-detail/course-detail.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'students',
        loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ])
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
