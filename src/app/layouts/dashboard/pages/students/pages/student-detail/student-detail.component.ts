import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsServices } from '../../students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {

  constructor(private route: ActivatedRoute, private studentService: StudentsServices){
    this.studentService.getStudentById(this.route.snapshot.params['id']).subscribe({
      next: (finderStudent) => {
        console.log(finderStudent)
      }
    })
  }

}
