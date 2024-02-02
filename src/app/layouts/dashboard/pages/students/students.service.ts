import { Injectable } from "@angular/core";
import { Observable, delay, finalize, of, tap } from "rxjs";
import { Student } from "./models";
import { LoadingService } from "../../../../core/services/loading.service";
import { AlertService } from "../../../../core/services/alert.service";

let students: Student[] = [
    {
        id: 1,
        legajo: 100015,
        dni: 11111111,
        genero: 'MASCULINO',
        firstName: 'Juan',
        lastName: 'Perez',    
        phone: '12345678',
        email: 'jperez@academinanatural.com.ar',
        createdAt: new Date()
    },
    {
        id: 2,
        legajo: 100016,
        dni: 22222222,
        genero: 'FEMENINO',
        firstName: 'Gilda',
        lastName: 'Gomez',    
        phone: '98765452',
        email: 'ggomez@academinanatural.com.ar',
        createdAt: new Date()
    },
    {
        id: 3,
        legajo: 100017,
        dni: 33333333,
        genero: 'MASCULINO',
        firstName: 'Jose',
        lastName: 'Fernandez',    
        phone: '34534543',
        email: 'jfernandez@academinanatural.com.ar',
        createdAt: new Date()
    }
]

@Injectable()

export class StudentsServices{

    constructor(private loadingService: LoadingService, private alerts: AlertService){
    }

    getStudents() {
       this.loadingService.setIsLoading(true)
       return of(students).pipe(delay(2000), finalize(() => this.loadingService.setIsLoading(false)))
    }

    deleteStudentById(id: number){
        this.loadingService.setIsLoading(true)
        students = students.filter((el) => el.id != id)
        return this.getStudents().pipe(tap(() => this.alerts.showSuccess('Realizado','Se elimino correctamente')))
    }

    createStudent(data: Student){
        students = [...students, {...data, id: students.length + 1}]
        return this.getStudents()
    }

    updateStudentById(id : number, data: Student) {
        students = students.map((el) => el.id === id ? { ...el, ...data } : el)
        return this.getStudents()
    }

    getStudentById(id: number): Observable<Student | undefined> {    
        this.loadingService.setIsLoading(true) 
        return of(students.find((students) => students.id == id)).pipe(delay(3000), finalize(() => this.loadingService.setIsLoading(false)))
    }

}