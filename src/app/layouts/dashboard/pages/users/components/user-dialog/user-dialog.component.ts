import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {

  userForm: FormGroup

  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingUser?: User
    ) {

    this.userForm = this.fb.group({
      id: this.fb.control(''),
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      role: this.fb.control('', Validators.required),
      phone: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      createdAt: this.fb.control('', Validators.required)
    })

    if(editingUser){
      this.userForm.patchValue(editingUser)
    }

  }

  onSave(): void {
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched()
    } else{
      this.dialogRef.close(this.userForm.value)
    }    
  }

}
