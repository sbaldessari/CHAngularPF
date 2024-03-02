import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../students/models';
import { Course } from '../../../courses/models';
import { EnrollmentsActions } from '../../store/enrollments.actions';
import { selectEnrollmentsCourses, selectEnrollmentsStudents } from '../../store/enrollments.selectors';
import { UsersServices } from '../../../users/users.service';
import { Enrollment } from '../../models';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrl: './enrollment-dialog.component.scss'
})
export class EnrollmentDialogComponent {

  students$: Observable<Student[]>
  courses$: Observable<Course[]>

  enrollmentsForm: FormGroup

  constructor(private store: Store, 
    private formBuilder: FormBuilder, 
    private matDialogRef: MatDialogRef<EnrollmentDialogComponent>,
    private usersServices: UsersServices,
    @Inject(MAT_DIALOG_DATA) private editingEnrollment?: Enrollment){  
    
    this.enrollmentsForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      studentId: this.formBuilder.control('', Validators.required),
      courseId: this.formBuilder.control('', Validators.required),
      userId: this.formBuilder.control('')
    })

    this.usersServices.getUserByToken().subscribe({
      next: (user) => {
        this.enrollmentsForm.controls['userId'].setValue(user[0].id);
      }
    })

    this.store.dispatch(EnrollmentsActions.loadStudents())
    this.store.dispatch(EnrollmentsActions.loadCourses())

    this.students$ = this.store.select(selectEnrollmentsStudents)
    this.courses$ = this.store.select(selectEnrollmentsCourses)

    if(editingEnrollment){
      this.enrollmentsForm.patchValue(editingEnrollment)
    }

  }

  onSave(): void {
    if(this.enrollmentsForm.invalid){
      this.enrollmentsForm.markAllAsTouched()
    }else{
      if(this.editingEnrollment){
        this.store.dispatch(EnrollmentsActions.updateEnrollments({ data: this.enrollmentsForm.value }))
      }else{
        this.store.dispatch(EnrollmentsActions.createEnrollments({ data: this.enrollmentsForm.value}))
      }
      this.matDialogRef.close()
    }
  }

}
