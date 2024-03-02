import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';
import { Enrollment } from '../models';
import { Pagination, PaginationParams } from '../../../../../core/models/pagination';

export const EnrollmentsActions = createActionGroup({
  source: 'Enrollments',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Load Enrollments Paginator': props<{ data: PaginationParams}>(),
    'Load Enrollments Paginator Success': props<{ data: Pagination<Enrollment> }>(),
    'Load Enrollments Paginator Failure': props<{ error: unknown }>(),
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: Student[]}>(),
    'Load Students Failure': props<{ error: unknown }>(),
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[]}>(),
    'Load Courses Failure': props<{ error: unknown }>(),
    'Create Enrollments': props<{ data: Enrollment}>(),
    'Create Enrollments Success': props<{ data: Enrollment}>(),
    'Create Enrollments Failure': props<{ error: unknown }>(),
    'Update Enrollments': props<{ data: Enrollment}>(),
    'Update Enrollments Success': props<{ data: Enrollment}>(),
    'Update Enrollments Failure': props<{ error: unknown }>(),
    'Delete Enrollments': props<{ data: string}>(),
    'Delete Enrollments Success': props<{ data: Enrollment}>(),
    'Delete Enrollments Failure': props<{ error: unknown }>(),
    'Detail Enrollments': props<{ data: string}>(),
    'Detail Enrollments Success': props<{ data: Enrollment[]}>(),
    'Detail Enrollments Failure': props<{ error: unknown }>(),
  }
});
