import { Injectable } from "@angular/core";
import { Observable, delay, finalize, of, tap } from "rxjs";
import { Course } from "./models";
import { LoadingService } from "../../../../core/services/loading.service";
import { AlertService } from "../../../../core/services/alert.service";

let courses: Course[] = [
    {
        id: 1,
        name: 'Matematicas',
        createdAt: new Date()
    },
    {
        id: 2,
        name: 'Fisica',
        createdAt: new Date()
    },
    {
        id: 3,
        name: 'Quimica',
        createdAt: new Date()
    },
]

@Injectable()

export class CoursesServices{

    constructor(private loadingService: LoadingService, private alerts: AlertService){
    }

    getCourses() {
       this.loadingService.setIsLoading(true)
       return of(courses).pipe(delay(2000), finalize(() => this.loadingService.setIsLoading(false)))
    }

    deleteCourseById(id: number){
        this.loadingService.setIsLoading(true)
        courses = courses.filter((el) => el.id != id)
        return this.getCourses().pipe(tap(() => this.alerts.showSuccess('Realizado','Se elimino correctamente')))
    }

    createCourse(data: Course){
        courses = [...courses, {...data, id: courses.length + 1}]        
        return this.getCourses()
    }

    updateCourseById(id : number, data: Course) {
        courses = courses.map((el) => el.id === id ? { ...el, ...data } : el)
        return this.getCourses()
    }

    getCourseById(id: number): Observable<Course | undefined> {    
        this.loadingService.setIsLoading(true) 
        return of(courses.find((courses) => courses.id == id)).pipe(delay(3000), finalize(() => this.loadingService.setIsLoading(false)))
    }

}