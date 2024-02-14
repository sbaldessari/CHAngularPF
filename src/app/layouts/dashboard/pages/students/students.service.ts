import { Injectable } from "@angular/core";
import { Observable, catchError, delay, finalize, mergeMap, of, tap } from "rxjs";
import { Student } from "./models";
import { LoadingService } from "../../../../core/services/loading.service";
import { AlertsService } from "../../../../core/services/alerts.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environments";
import { Pagination } from "../../../../core/models/pagination";

@Injectable()

export class StudentsServices{

    constructor(private loadingService: LoadingService, 
                private alerts: AlertsService,
                private httpClient: HttpClient){
    }

    getStudents() {
       this.loadingService.setIsLoading(true)
       let headers = new HttpHeaders()
       headers.append('token', localStorage.getItem('token') || '')   
       return this.httpClient.get<Student[]>(`${environment.apiURL}/students`, {
         headers: headers
       }).pipe(delay(2000)).pipe(
         catchError((error) => {
           this.alerts.showError('Error al cargar los alumnos')
           return of(error)
         }), finalize(() => this.loadingService.setIsLoading(false))
       )

    }

    paginate(page: number, perPage = 5){
      this.loadingService.setIsLoading(true) 
      let headers = new HttpHeaders()
      headers.append('token', localStorage.getItem('token') || '')  
      return this.httpClient
        .get<Pagination<Student>>(`${environment.apiURL}/students?_page=${page}&_per_page=${perPage}`, {
          headers: headers
        }).pipe(delay(2000))
        .pipe(
          catchError((error) => {
            this.alerts.showError('Error al cargar los alumnos')
            return of(error)
          }), finalize(() => this.loadingService.setIsLoading(false))      
        )
    }

    deleteStudentById(id: string){
      this.loadingService.setIsLoading(true)
      return this.httpClient.delete<Student>(`${environment.apiURL}/students/${id}`).pipe(
        mergeMap(() => this.paginate(1)),
        tap(() => this.alerts.showSuccess('Realizado','Se elimino correctamente'))
      )
    }

    createStudent(data: Student){
      this.loadingService.setIsLoading(true)
      let headers = new HttpHeaders()
      headers.append('token', localStorage.getItem('token') || '') 
      return this.httpClient
          .post<Student>(`${environment.apiURL}/students`, {...data, headers: headers})
          .pipe(
            mergeMap(() => this.paginate(1)),
            tap(() => this.alerts.showSuccess('Realizado','Se creo correctamente'))
          )
    }

    updateStudentById(id : string, data: Student) {
      this.loadingService.setIsLoading(true)
      return this.httpClient.put<Student>(`${environment.apiURL}/students/${id}`, {...data})
      .pipe(
        mergeMap(() => this.paginate(1)),
        tap(() => this.alerts.showSuccess('Realizado','Se actualizo correctamente'))
      )
    }

    getStudentById(id: string): Observable<Student | undefined> {    
      return this.httpClient.get<Student>(`${environment.apiURL}/students/${id}`)
    }

}