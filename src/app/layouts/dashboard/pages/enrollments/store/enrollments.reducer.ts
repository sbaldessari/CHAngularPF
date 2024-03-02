import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentsActions } from './enrollments.actions';
import { Enrollment } from '../models';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';
import { Pagination } from '../../../../../core/models/pagination';

export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  enrollments: Enrollment[];
  students: Student[];
  courses: Course[];
  loading: boolean;
  error: unknown;
  paginator: Pagination<Enrollment> | null;
}

export const initialState: State = {
  enrollments: [],
  students: [],
  courses: [],
  loading: false,
  error: null,
  paginator: null
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentsActions.loadEnrollments, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(EnrollmentsActions.loadEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      enrollments: action.data
    }
  }),
  on(EnrollmentsActions.loadEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(EnrollmentsActions.loadEnrollmentsPaginator, (state) => {
    return {
      ...state,
      loading: true      
    }
  }),
  on(EnrollmentsActions.loadEnrollmentsPaginatorSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      paginator: action.data
    }
  }),
  on(EnrollmentsActions.loadEnrollmentsPaginatorFailure, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(EnrollmentsActions.loadStudents, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(EnrollmentsActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      students: action.data
    }
  }),
  on(EnrollmentsActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(EnrollmentsActions.loadCourses, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(EnrollmentsActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      courses: action.data
    }
  }),
  on(EnrollmentsActions.loadCoursesFailure, (state )=> {
    return {
      ...state,
      loading: false
    }
  }),
  on(EnrollmentsActions.createEnrollments, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(EnrollmentsActions.createEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(EnrollmentsActions.createEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(EnrollmentsActions.updateEnrollments, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(EnrollmentsActions.updateEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(EnrollmentsActions.updateEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(EnrollmentsActions.deleteEnrollments, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(EnrollmentsActions.deleteEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(EnrollmentsActions.deleteEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      loading: false
    }
  }),
  on(EnrollmentsActions.detailEnrollments, (state) => {
    return {
      ...state,
      loading: true      
    }
  }),
  on(EnrollmentsActions.detailEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      enrollments: action.data
    }
  }),
  on(EnrollmentsActions.detailEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});

