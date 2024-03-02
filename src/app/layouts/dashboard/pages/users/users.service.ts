import { Injectable } from "@angular/core";
import { Observable, catchError, delay, finalize, mergeMap, of, tap } from "rxjs";
import { User } from "./models";
import { LoadingService } from "../../../../core/services/loading.service";
import { AlertsService } from "../../../../core/services/alerts.service";
import { environment } from '../../../../../environments/environments';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Pagination } from "../../../../core/models/pagination";

@Injectable()

export class UsersServices{

    constructor(private loadingService: LoadingService, 
                private alerts: AlertsService,
                private httpClient: HttpClient){
    }

    generateString(length: number) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }  
        return result;
    }

    getUsers() {
       this.loadingService.setIsLoading(true)
       let headers = new HttpHeaders()
       headers.append('token', localStorage.getItem('token') || '')   
       return this.httpClient.get<User[]>(`${environment.apiURL}/users`, {
         headers: headers
       }).pipe(delay(2000))
          .pipe(
            catchError((error) => {
              this.alerts.showError('Error al cargar los usuarios')
              return of(error)
            }), finalize(() => this.loadingService.setIsLoading(false))      
          )
    }

    paginate(page: number, perPage = 5){  
        this.loadingService.setIsLoading(true) 
        let headers = new HttpHeaders()
        headers.append('token', localStorage.getItem('token') || '')        
        return this.httpClient
          .get<Pagination<User>>(`${environment.apiURL}/users?_page=${page}&_per_page=${perPage}`, {
            headers: headers
          }).pipe(delay(2000))
          .pipe(
            catchError((error) => {
              this.alerts.showError('Error al cargar los usuarios')
              return of(error)
            }), finalize(() => this.loadingService.setIsLoading(false))      
          )
    }

    deleteUserById(id: string){
        this.loadingService.setIsLoading(true)
        return this.httpClient.delete<User>(`${environment.apiURL}/users/${id}`).pipe(
          mergeMap(() => this.paginate(1)),
          tap(() => this.alerts.showSuccess('Realizado','Se elimino correctamente'))
        )
    }

    createUser(data: User){
      this.loadingService.setIsLoading(true)
      const { id, ...eventData } = data;
      return this.httpClient.post<User>(`${environment.apiURL}/users`, 
          {...eventData, token: this.generateString(15)})
          .pipe(
            mergeMap(() => this.paginate(1)),
            tap(() => this.alerts.showSuccess('Realizado','Se creo correctamente'))
          )
    }

    updateUserById(id : string, data: User) {
      this.loadingService.setIsLoading(true)
      return this.httpClient.put<User>(`${environment.apiURL}/users/${id}`, 
        {...data})
        .pipe(
          mergeMap(() => this.paginate(1)),
          tap(() => this.alerts.showSuccess('Realizado','Se actualizo correctamente'))
        )
    }

    getUserById(id: string): Observable<User | undefined> {  
      return this.httpClient.get<User>(`${environment.apiURL}/users/${id}`)
    }

    getUserByToken() {  
      const token = localStorage.getItem('token')
      return this.httpClient.get<User[]>(`${environment.apiURL}/users?token=${token}`)
    }

}