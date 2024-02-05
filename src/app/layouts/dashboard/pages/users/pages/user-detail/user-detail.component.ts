import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersServices } from '../../users.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userForm: FormGroup

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private usersService: UsersServices){

    this.userForm = this.fb.group({
      id: this.fb.control(''),
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      rol: this.fb.control(''),
      phone: this.fb.control(''),
      email: this.fb.control(''),
      pass: this.fb.control(''),
      createdAt: this.fb.control('')
    })

    this.usersService.getUserById(this.route.snapshot.params['id']).subscribe({
      next: (finderUser) => {
        this.userForm = this.fb.group({
          id: this.fb.control(finderUser?.id),
          firstName: this.fb.control(finderUser?.firstName),
          lastName: this.fb.control(finderUser?.lastName),
          rol: this.fb.control(finderUser?.rol),
          phone: this.fb.control(finderUser?.phone),
          email: this.fb.control(finderUser?.email),
          pass: this.fb.control(finderUser?.pass),          
          createdAt: this.fb.control(finderUser?.createdAt)
        })
    
      }
    })

  }


}
