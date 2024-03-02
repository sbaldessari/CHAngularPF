import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrollmentsService } from '../../enrollments.service';
import { Store } from '@ngrx/store';
import { selectEnrollments, selectEnrollmentsIsLoading, selectEnrollmentsPaginatorIsLoading } from '../../store/enrollments.selectors';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { EnrollmentsActions } from '../../store/enrollments.actions';


@Component({
  selector: 'app-enrollment-detail',
  templateUrl: './enrollment-detail.component.html',
  styleUrl: './enrollment-detail.component.scss'
})
export class EnrollmentDetailComponent implements OnInit {

  enrollmentForm: FormGroup

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private store: Store,
    private loadingServices: LoadingService,
    private router: Router){

      this.enrollmentForm = this.fb.group({
        student: this.fb.control(''),
        course: this.fb.control(''),
        user: this.fb.control(''),
        createdAt: this.fb.control(''),
      })

      this.store.select(selectEnrollmentsIsLoading).subscribe({
        next: (result) => this.loadingServices.setIsLoading(result) 
      }) 
            
      this.store.select(selectEnrollments).subscribe({
        next: (finderEnrollment) => {
          if(finderEnrollment[0] != null){
            this.enrollmentForm = this.fb.group({
              student: this.fb.control(finderEnrollment[0].student?.firstName + ' ' + finderEnrollment[0].student?.lastName),
              course: this.fb.control(finderEnrollment[0].course?.name),
              user: this.fb.control(finderEnrollment[0].user?.firstName + ' ' + finderEnrollment[0].user?.lastName),
              createdAt: this.fb.control(finderEnrollment[0].createdAt),
            })  
          }
        }
      })
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollmentsActions.detailEnrollments({ data: this.route.snapshot.params['id'] } ))
  }

  returnPageEnrollments(){
    this.router.navigate(['dashboard/enrollments'])    
  }

}
