import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {

  studentForm: FormGroup

  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingStudent?: Student
    ) {

    this.studentForm = this.fb.group({
      id: this.fb.control(''),
      legajo: this.fb.control('', Validators.required),
      dni: this.fb.control('', Validators.required),
      genero: this.fb.control('', Validators.required),
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      phone: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      createdAt: this.fb.control('', Validators.required)
    })

    if(editingStudent){
      this.studentForm.patchValue(editingStudent)
    }

  }

  onSave(): void {
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched()
    } else{
      this.dialogRef.close(this.studentForm.value)
    }    
  }

}
