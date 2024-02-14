import { Component } from '@angular/core';
import { Course } from './models';
import { CoursesServices } from './courses.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  displayedColumns = ['id', 'name', 'createdAt', 'actions']

  courses: Course[] = []

  totalItems = 0;
  pageSize = 5;
  currentPage = 1;

  constructor(private coursesService: CoursesServices, public dialog: MatDialog){ 
  }

  ngOnInit(): void {
    this.getPageData()
  }

  getPageData(): void {
    this.coursesService.paginate(this.currentPage).subscribe({
      next: (value) => {
        const paginationResult = value
        this.totalItems = paginationResult.items
        this.courses = paginationResult.data
      }
    })   
  }

  onPage(ev: PageEvent){
    this.currentPage = ev.pageIndex + 1
    this.coursesService.paginate(this.currentPage, ev.pageSize).subscribe({
      next: (paginationResult) => {
        this.totalItems = paginationResult.items
        this.courses = paginationResult.data
        this.pageSize = ev.pageSize        
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

  onDelete(id: string) {
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
