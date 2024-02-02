import { Injectable } from "@angular/core";
import { Observable, delay, finalize, of, tap } from "rxjs";
import { User } from "./models";
import { LoadingService } from "../../../../core/services/loading.service";
import { AlertService } from "../../../../core/services/alert.service";

let users: User[] = [
    {
        id: 1,
        firstName: 'Jorge',
        lastName: 'Martinez',   
        rol: 'ADMIN', 
        phone: '12345678',
        email: 'jmartinez@academinanatural.com.ar',
        pass: 'Abcd1234',
        createdAt: new Date()
    },
    {
        id: 2,
        firstName: 'Tomas',
        lastName: 'Garcia',   
        rol: 'USER', 
        phone: '12345678',
        email: 'rgarcia@academinanatural.com.ar',
        pass: 'Abcd1234',
        createdAt: new Date()
    },
    {
        id: 3,
        firstName: 'Julio',
        lastName: 'Diaz',   
        rol: 'USER', 
        phone: '12345678',
        email: 'jdiaz@academinanatural.com.ar',
        pass: 'Abcd1234',
        createdAt: new Date()
    },
]

@Injectable()

export class UsersServices{

    constructor(private loadingService: LoadingService, private alerts: AlertService){
    }

    getUsers() {
       this.loadingService.setIsLoading(true)
       return of(users).pipe(delay(2000), finalize(() => this.loadingService.setIsLoading(false)))
    }

    deleteUserById(id: number){
        this.loadingService.setIsLoading(true)
        users = users.filter((el) => el.id != id)
        return this.getUsers().pipe(tap(() => this.alerts.showSuccess('Realizado','Se elimino correctamente')))
    }

    createUser(data: User){
        users = [...users, {...data, id: users.length + 1}]
        return this.getUsers()
    }

    updateUserById(id : number, data: User) {
        users = users.map((el) => el.id === id ? { ...el, ...data } : el)
        return this.getUsers()
    }

    getUserById(id: number): Observable<User | undefined> {   
        this.loadingService.setIsLoading(true) 
        return of(users.find((users) => users.id == id)).pipe(delay(3000), finalize(() => this.loadingService.setIsLoading(false)))
    }

}