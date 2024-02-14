import { Injectable } from "@angular/core";
import { User } from "../dashboard/pages/users/models";
import { Router } from "@angular/router";
import { AlertsService } from "../../core/services/alerts.service";
import { Observable, delay, finalize, map, of, tap } from "rxjs";
import { LoadingService } from "../../core/services/loading.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environments";

interface LoginData {
    email: null | string;
    password: null | string;
}

@Injectable({ providedIn: 'root'})
export class AuthService {

    authUser: User | null = null

    constructor(private router: Router, 
        private alertsService: AlertsService, 
        private loadingService: LoadingService,
        private httpClient: HttpClient) {}

    setAuthuser(user: User){
        this.authUser = user
        localStorage.setItem(
            'token', 
            user.token
        )
    }

    login(data: LoginData): Observable<User[]>{ 
        return this.httpClient
            .get<User[]>(`${environment.apiURL}/users?email=${data.email}&password=${data.password}`)
            .pipe(
                tap((response) => {
                    if(!!response[0]){
                        this.setAuthuser(response[0])  
                        this.router.navigate(['dashboard'])                  
                    }else{
                        this.alertsService.showError('email o password incorrectos')
                    }
                })
            )
    }

    logout(): void {
        this.authUser = null
        this.router.navigate(['auth','login'])
        localStorage.removeItem('token')
    }

    verifyToken() {
        return this.httpClient.get<User[]>(
            `${environment.apiURL}/users?token=${localStorage.getItem('token')}`
        ).pipe(
            map((response) => {
                if(response.length) {
                    this.setAuthuser(response[0])
                    return true
                }else{
                    this.authUser = null
                    localStorage.removeItem('token')
                    return false
                }
            })
        )
    }

}