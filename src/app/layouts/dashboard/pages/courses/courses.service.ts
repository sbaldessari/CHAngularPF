import { Injectable } from "@angular/core";
import { Observable, catchError, delay, finalize, mergeMap, of, tap } from "rxjs";
import { Course } from "./models";
import { LoadingService } from "../../../../core/services/loading.service";
import { AlertsService } from "../../../../core/services/alerts.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environments";
import { Pagination } from "../../../../core/models/pagination";

@Injectable()

export class CoursesServices{

    constructor(private loadingService: LoadingService, 
                private alerts: AlertsService,
                private httpClient: HttpClient){
    }

    getCourses() {
       this.loadingService.setIsLoading(true)
       let headers = new HttpHeaders()
       headers.append('token', localStorage.getItem('token') || '')   
       return this.httpClient.get<Course[]>(`${environment.apiURL}/courses`, {
         headers: headers
       }).pipe(delay(2000)).pipe(
         catchError((error) => {
           this.alerts.showError('Error al cargar los cursos')
           return of(error)
         }), finalize(() => this.loadingService.setIsLoading(false))
       )
    }

    paginate(page: number, perPage = 5){
        this.loadingService.setIsLoading(true)
        let headers = new HttpHeaders()
        headers.append('token', localStorage.getItem('token') || '')
        return this.httpClient
          .get<Pagination<Course>>(`${environment.apiURL}/courses?_page=${page}&_per_page=${perPage}`)
          .pipe(delay(2000))
          .pipe(
            catchError((error) => {
              this.alerts.showError('Error al cargar los cursos')
              return of(error)
            }), finalize(() => this.loadingService.setIsLoading(false))      
          )
    }

    deleteCourseById(id: string){
      this.loadingService.setIsLoading(true)
      return this.httpClient.delete<Course>(`${environment.apiURL}/courses/${id}`).pipe(
        mergeMap(() => this.paginate(1)),
        tap(() => this.alerts.showSuccess('Realizado','Se elimino correctamente'))
      )
    }

    createCourse(data: Course){
      this.loadingService.setIsLoading(true)
      return this.httpClient
      .post<Course>(`${environment.apiURL}/courses`, {...data})
      .pipe(
        mergeMap(() => this.paginate(1)),
        tap(() => this.alerts.showSuccess('Realizado','Se creo correctamente'))
      )
    }

    updateCourseById(id : string, data: Course) {
      this.loadingService.setIsLoading(true)
      return this.httpClient.put<Course>(`${environment.apiURL}/courses/${id}`, {...data})
      .pipe(
        mergeMap(() => this.paginate(1)),
        tap(() => this.alerts.showSuccess('Realizado','Se actualizo correctamente'))
      )
    }

    getCourseById(id: string): Observable<Course | undefined> {    
      return this.httpClient.get<Course>(`${environment.apiURL}/courses/${id}`)
    }

}