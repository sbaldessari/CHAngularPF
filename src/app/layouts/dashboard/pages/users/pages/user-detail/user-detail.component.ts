import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersServices } from '../../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  constructor(private route: ActivatedRoute, private usersService: UsersServices){
    this.usersService.getUserById(this.route.snapshot.params['id']).subscribe({
      next: (finderUser) => {
        console.log(finderUser)
      }
    })
  }


}
