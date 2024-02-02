import { Component } from '@angular/core';
import { Course } from './models';
import { CoursesServices } from './courses.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  displayedColumns = ['id', 'name', 'createdAt', 'actions']

  courses: Course[] = []

  constructor(private coursesService: CoursesServices, public dialog: MatDialog){    
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses
      }
    })
  }

  onCreate(): void {
    this.dialog.open(CourseDialogComponent).afterClosed().subscribe({
      next: (result) => {
        if (result){
          this.coursesService.createCourse(result).subscribe({
            next: (courses) => {
              this.courses = courses
            }
          })
        }
      }
    })
  }

  onDelete(id: number) {
    Swal.fire({
      title: "¿Esta seguro?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: "Cancelar"
    }).then((result) => {
      this.coursesService.deleteCourseById(id).subscribe({
        next: (courses) => {
          this.courses = courses
        }
      })
    });
  }

  onEdit(course: Course) {
    this.dialog.open(CourseDialogComponent, {
      data: course
    }).afterClosed().subscribe({
      next: (result) => {
        if(result){
          this.coursesService.updateCourseById(course.id, result).subscribe({
            next: (courses) => {
              this.courses = courses
            }
          })
        }
      }
    })
  }

}
