import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersServices } from './users.service';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent    
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    CommonModule    
  ],
  exports: [
    UsersComponent
  ],
  providers: [
    UsersServices
  ]
})
export class UsersModule { }
