import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersServices } from './users.service';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UserDetailComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    CommonModule 
  ],
  providers: [
    UsersServices
  ]
})
export class UsersModule { }
