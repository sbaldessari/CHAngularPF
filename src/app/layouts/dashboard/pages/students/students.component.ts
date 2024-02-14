import { Component } from '@angular/core';
import { Student } from './models';
import { StudentsServices } from './students.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  displayedColumns = ['id', 'legajo', 'dni', 'genero', 'name', 'phone', 'email', 'createdAt', 'actions']

  students: Student[] = []

  totalItems = 0;
  pageSize = 5;
  currentPage = 1;

  constructor(private studentsService: StudentsServices, public dialog: MatDialog){    
  }

  ngOnInit(): void {
    this.getPageData()
  }

  getPageData(): void {
    this.studentsService.paginate(this.currentPage).subscribe({
      next: (value) => {
        const paginationResult = value
        this.totalItems = paginationResult.items
        this.students = paginationResult.data
      }
    })   
  }

  onPage(ev: PageEvent){
    this.currentPage = ev.pageIndex + 1
    this.studentsService.paginate(this.currentPage, ev.pageSize).subscribe({
      next: (paginationResult) => {
        this.totalItems = paginationResult.items
        this.students = paginationResult.data
        this.pageSize = ev.pageSize        
      }
    })
  }

  onCreate(): void {
    this.dialog.open(StudentDialogComponent).afterClosed().subscribe({
      next: (result) => {
        if (result){
          this.studentsService.createStudent(result).subscribe({
            next: (students) => {
              this.students = students
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
      this.studentsService.deleteStudentById(id).subscribe({
        next: (students) => {
          this.students = students
        }
      })
    });
  }

  onEdit(student: Student) {
    this.dialog.open(StudentDialogComponent, {
      data: student
    }).afterClosed().subscribe({
      next: (result) => {
        if(result){
          this.studentsService.updateStudentById(student.id, result).subscribe({
            next: (students) => {
              this.students = students
            }
          })
        }
      }
    })
  }

}
