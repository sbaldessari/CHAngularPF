import { Component } from '@angular/core';
import { User } from './models';
import { UsersServices } from './users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  displayedColumns = ['id', 'name', 'rol', 'phone', 'email', 'password', 'createdAt', 'actions']

  users: User[] = []

  totalItems = 0;
  pageSize = 5;
  currentPage = 1;

  constructor(private usersService: UsersServices, public dialog: MatDialog){    
  }

  ngOnInit(): void {
    this.getPageData()
  }

  getPageData(): void {
    this.usersService.paginate(this.currentPage).subscribe({
      next: (value) => {
        const paginationResult = value
        this.totalItems = paginationResult.items
        this.users = paginationResult.data
      }
    })   
  }

  onPage(ev: PageEvent){
    this.currentPage = ev.pageIndex + 1
    this.usersService.paginate(this.currentPage, ev.pageSize).subscribe({
      next: (paginationResult) => {
        this.totalItems = paginationResult.items
        this.users = paginationResult.data
        this.pageSize = ev.pageSize        
      }
    })
  }

  onCreate(): void {
    this.dialog.open(UserDialogComponent).afterClosed().subscribe({
      next: (result) => {
        if (result){
          this.usersService.createUser(result).subscribe({
            next: (paginationResult) => {
              this.totalItems = paginationResult.items
              this.users = paginationResult.data
              this.pageSize = paginationResult.pageSize  
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
      this.usersService.deleteUserById(id).subscribe({        
        next: (paginationResult) => {          
          this.totalItems = paginationResult.items
          this.users = paginationResult.data
          this.pageSize = paginationResult.pageSize  
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
            next: (paginationResult) => {
              this.totalItems = paginationResult.items
              this.users = paginationResult.data
              this.pageSize = paginationResult.pageSize  
            }
          })
        }
      }
    })
  }

}
