import { Component } from '@angular/core';
import { User } from './models';
import { UsersServices } from './users.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  displayedColumns = ['id', 'name', 'rol', 'phone', 'email', 'pass', 'createdAt', 'actions']

  users: User[] = []

  constructor(private usersService: UsersServices, public dialog: MatDialog){    
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users
      }
    })
  }

  onCreate(): void {
    this.dialog.open(UserDialogComponent).afterClosed().subscribe({
      next: (result) => {
        if (result){
          this.usersService.createUser(result).subscribe({
            next: (users) => {
              this.users = users
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
      this.usersService.deleteUserById(id).subscribe({
        next: (users) => {
          this.users = users
        }
      })
    });
  }

  onEdit(user: User) {
    this.dialog.open(UserDialogComponent, {
      data: user
    }).afterClosed().subscribe({
      next: (result) => {
        if(result){
          this.usersService.updateUserById(user.id, result).subscribe({
            next: (users) => {
              this.users = users
            }
          })
        }
      }
    })
  }

}
