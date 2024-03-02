import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, mergeMap } from 'rxjs/operators';
import {  EMPTY, of, pipe } from 'rxjs';
import { EnrollmentsActions } from './enrollments.actions';
import { EnrollmentsService } from '../enrollments.service';
import { StudentsServices } from '../../students/students.service';
import { CoursesServices } from '../../courses/courses.service';
import { AlertsService } from '../../../../../core/services/alerts.service';
import { JsonPipe } from '@angular/common';


@Injectable()
export class EnrollmentsEffects {



  loadEnrollmentss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadEnrollments),
      concatMap(() =>
        EMPTY.pipe(
          map(data => EnrollmentsActions.loadEnrollmentsSuccess({ data })),
          catchError((error) => {
            this.alertsService.showError(`Error al cargar las inscripciones`)
            return of(EnrollmentsActions.loadEnrollmentsFailure({ error }))      
          }         
        ))
      )
    );
  });

  loadEnrollmentsPaginator$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadEnrollmentsPaginator),
      concatMap((action) => {
        return this.enrollmentsService.paginate(action.data).pipe(
          map((resp) => EnrollmentsActions.loadEnrollmentsPaginatorSuccess({ data: resp})),
          catchError((error) => {
            this.alertsService.showError(`Error al cargar las inscripciones`)
            return of(EnrollmentsActions.loadEnrollmentsPaginatorFailure({ error }))      
          }         
        )
        )
      })
    )
  })

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadStudents),
      concatMap(() => 
        this.studentsService.getStudents().pipe(
          map((resp) => EnrollmentsActions.loadStudentsSuccess({data: resp})),
          catchError((error) => {
            this.alertsService.showError(`Error al cargar los alumnos`)
            return of(EnrollmentsActions.loadStudentsFailure({ error }))      
          }         
        )
        )   
      )     
    )
  })

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadCourses),
      concatMap(() => 
        this.coursesService.getCourses().pipe(
          map((resp) => EnrollmentsActions.loadCoursesSuccess({data: resp})),
          catchError((error) => {
            return of(EnrollmentsActions.loadCoursesFailure({ error }))
          })
        )   
      )     
    )
  })

  createEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.createEnrollments),
      concatMap((action) => {
        return this.enrollmentsService.createEnrollment(action.data).pipe(
          concatMap(
            (resp) => {
              this.alertsService.showSuccess('Realizado','Se creo correctamente')
              return of(EnrollmentsActions.createEnrollmentsSuccess({ data: resp}))
            } 
          ),
          catchError((error) => {
            this.alertsService.showError(`Error al crear la inscripción`)
            return of(EnrollmentsActions.createEnrollmentsFailure({ error }))      
          }         
        )
        )
      })
    )
  })

  updateEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.updateEnrollments),
      concatMap((action) => {
        return this.enrollmentsService.updateEnrollment(action.data.id, action.data).pipe(
          concatMap(
            (resp) => {
              this.alertsService.showSuccess('Realizado','Se actualizo correctamente')
              return of(EnrollmentsActions.updateEnrollmentsSuccess({ data: resp}))
            } 
          ),
          catchError((error) => {
            this.alertsService.showError(`Error al actualizar la inscripción`)
            return of(EnrollmentsActions.updateEnrollmentsFailure({ error }))      
          }         
        )
        )
      })
    )
  })

  deleteEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.deleteEnrollments),
      concatMap((action) => {
        return this.enrollmentsService.deleteEnrollmentById(action.data).pipe(
          concatMap(
            (resp) => {
              this.alertsService.showSuccess('Realizado','Se elimino correctamente')
              return of(EnrollmentsActions.deleteEnrollmentsSuccess({ data: resp}))
            } 
          ),
          catchError((error) => {
            this.alertsService.showError(`Error al eliminar la inscripción`)
            return of(EnrollmentsActions.deleteEnrollmentsFailure({ error }))      
          }         
        )
        )
      })
    )
  })

  detailEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.detailEnrollments),
      concatMap((action) => {
        return this.enrollmentsService.getEnrollmentsById(action.data).pipe(
          map((resp) => EnrollmentsActions.detailEnrollmentsSuccess({ data: resp})),
          catchError((error) => {
              this.alertsService.showError(`Error al cargar el detalle de la inscripción`)
              return of(EnrollmentsActions.detailEnrollmentsFailure({ error }))      
            }         
          )
        )
      })
    )
  })

  constructor(private actions$: Actions, 
    private enrollmentsService: EnrollmentsService,
    private alertsService: AlertsService,
    private studentsService: StudentsServices,
    private coursesService: CoursesServices) {}
}
