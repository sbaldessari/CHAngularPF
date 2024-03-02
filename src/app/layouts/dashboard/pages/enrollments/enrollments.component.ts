import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from './models';
import { EnrollmentsService } from './enrollments.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { selectEnrollments, selectEnrollmentsIsLoading, selectEnrollmentsPaginator, selectEnrollmentsPaginatorIsLoading } from './store/enrollments.selectors';
import { EnrollmentsActions } from './store/enrollments.actions';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {

  displayedColumns = ['id', 'student', 'course', 'user', 'createdAt', 'actions']

  totalItems = 0;
  pageSize = 5;
  currentPage = 1;

  enrollments: Enrollment[] = []

  constructor(private store: Store,
              private matDialog: MatDialog,
              private loadingServices: LoadingService){    

    this.store.select(selectEnrollmentsPaginatorIsLoading).subscribe({
      next: (result) => this.loadingServices.setIsLoading(result) 
    }) 
  }

  ngOnInit(): void {
    this.getPageData()
  }

  getPageData(): void {
    this.store.dispatch(EnrollmentsActions.loadEnrollmentsPaginator({ data: { page: this.currentPage, perPage: 5 }}))
    this.store.select(selectEnrollmentsPaginator).subscribe({
      next: (result) => {
        const paginationResult = result
        if(paginationResult != null) {
          this.totalItems = paginationResult.items
          this.enrollments = paginationResult.data   
        }
      }
    })
  }

  onPage(ev: PageEvent){
    this.currentPage = ev.pageIndex + 1
    this.store.dispatch(EnrollmentsActions.loadEnrollmentsPaginator({ data: { page: this.currentPage, perPage: ev.pageSize }}))
    this.store.select(selectEnrollmentsPaginator).subscribe({
      next: (result) => {
        const paginationResult = result
        if(paginationResult != null) {
          this.totalItems = paginationResult.items
          this.enrollments = paginationResult.data   
          this.pageSize = ev.pageSize   
        }
      }
    })
  }

  onCreate(): void {
    this.matDialog.open(EnrollmentDialogComponent).afterClosed().subscribe({
      next: () => {
        this.getPageData()
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
      if(result.isConfirmed){
        this.store.dispatch(EnrollmentsActions.deleteEnrollments({ data: id }))
      }      
    });
  }

  onEdit(enrollment: Enrollment) {
    this.matDialog.open(EnrollmentDialogComponent, {
      data: enrollment
    }).afterClosed()
  }
  
}
