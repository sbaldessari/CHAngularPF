import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesServices } from '../../courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {

  constructor(private route: ActivatedRoute, private coursesService: CoursesServices){
    this.coursesService.getCourseById(this.route.snapshot.params['id']).subscribe({
      next: (finderCourse) => {
        console.log(finderCourse)
      }
    })
  }
  
}
