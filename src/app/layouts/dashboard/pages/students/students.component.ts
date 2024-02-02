import { Component } from '@angular/core';
import { Student } from './models';
import { StudentsServices } from './students.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  displayedColumns = ['id', 'legajo', 'dni', 'genero', 'name', 'phone', 'email', 'createdAt', 'actions']

  students: Student[] = []

  constructor(private studentsService: StudentsServices, public dialog: MatDialog){    
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students
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

  onDelete(id: number) {
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
