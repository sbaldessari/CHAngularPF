import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environments";
import { Enrollment } from "./models";
import { delay } from "rxjs";
import { Pagination, PaginationParams } from "../../../../core/models/pagination";

@Injectable({ providedIn: 'root' })

export class EnrollmentsService {

    constructor(private httpClient: HttpClient){}

    getEnrollments() {        
        let headers = new HttpHeaders()
        headers.append('token', localStorage.getItem('token') || '')   
        return this.httpClient.get<Enrollment[]>(`${environment.apiURL}/enrollments?_embed=student&_embed=course&_embed=user`, {
          headers: headers
        })
    }

    paginate(paginationParams: PaginationParams){
        let headers = new HttpHeaders()
        headers.append('token', localStorage.getItem('token') || '')
        return this.httpClient
          .get<Pagination<Enrollment>>
          (`${environment.apiURL}/enrollments?_page=${paginationParams.page}&_per_page=${paginationParams.perPage}&_embed=student&_embed=course&_embed=user`)
          .pipe(delay(2000))          
    }

    deleteEnrollmentById(id: string){
        return this.httpClient.delete<Enrollment>(`${environment.apiURL}/enrollments/${id}`)
        .pipe(delay(2000))
    }
  
    createEnrollment(data: Enrollment){
        const { id, createdAt, student, user, course, ...eventData } = data;
        return this.httpClient
            .post<Enrollment>(`${environment.apiURL}/enrollments`, {...eventData, createdAt: new Date})
            .pipe(delay(2000)) 
    }
  
    updateEnrollment(id : string, data: Enrollment) {
        return this.httpClient.put<Enrollment>(`${environment.apiURL}/enrollments/${id}`, {...data, createdAt: new Date})
        .pipe(delay(2000))  
    }
  
    getEnrollmentsById(id: string) {    
        return this.httpClient.get<Enrollment[]>(`${environment.apiURL}/enrollments?id=${id}&_embed=student&_embed=course&_embed=user`)
        .pipe(delay(2000)) 
    }

}