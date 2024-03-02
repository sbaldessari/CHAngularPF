import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from './pages/users/models';
import { UsersServices } from './pages/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  authUser?: User

  constructor(private authService: AuthService, private usersService: UsersServices){
    this.usersService.getUserByToken().subscribe({
      next: (user) => {
        this.authUser = user[0]            
      }
    })    
  }

  logout(): void {
    this.authService.logout()
  }
  
}
