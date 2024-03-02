import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesServices } from '../../courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {

  courseForm: FormGroup

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private coursesService: CoursesServices,
    private router: Router){

    this.courseForm = this.fb.group({
      name: this.fb.control(''),
      createdAt: this.fb.control(''),
    })

    this.coursesService.getCourseById(this.route.snapshot.params['id']).subscribe({
      next: (finderCourse) => {
        this.courseForm = this.fb.group({
          name: this.fb.control(finderCourse?.name),
          createdAt: this.fb.control(finderCourse?.createdAt),
        })
    
      }
    })

  }

  returnPageCourses(){
    this.router.navigate(['dashboard/courses'])    
  }
  
}
