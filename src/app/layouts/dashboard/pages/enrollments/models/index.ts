import { Course } from "../../courses/models";
import { Student } from "../../students/models";
import { User } from "../../users/models";

export interface Enrollment {
    id: string;    
    studentId: string;
    courseId: string;
    userId: string; 
    createdAt: Date;       
    student?: Student;
    course?: Course;
    user?: User;
}
