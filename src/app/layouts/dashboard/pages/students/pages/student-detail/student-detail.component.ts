import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsServices } from '../../students.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {

  studentForm: FormGroup

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private studentsService: StudentsServices){

    this.studentForm = this.fb.group({
      id: this.fb.control(''),
      legajo: this.fb.control(''),
      dni: this.fb.control(''),
      genero: this.fb.control(''),
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      phone: this.fb.control(''),
      email: this.fb.control(''),
      createdAt: this.fb.control('')
    })

    this.studentsService.getStudentById(this.route.snapshot.params['id']).subscribe({
      next: (finderStudent) => {
        this.studentForm = this.fb.group({
          id: this.fb.control(finderStudent?.id),
          legajo: this.fb.control(finderStudent?.legajo),
          dni: this.fb.control(finderStudent?.dni),
          genero: this.fb.control(finderStudent?.genero),
          firstName: this.fb.control(finderStudent?.firstName),
          lastName: this.fb.control(finderStudent?.lastName),
          phone: this.fb.control(finderStudent?.phone),
          email: this.fb.control(finderStudent?.email),
          createdAt: this.fb.control(finderStudent?.createdAt)
        })
    
      }
    })

  }

}
