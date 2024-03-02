import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollments from './enrollments.reducer';

export const selectEnrollmentsState = createFeatureSelector<fromEnrollments.State>(
  fromEnrollments.enrollmentsFeatureKey
);

export const selectEnrollments = createSelector(
  selectEnrollmentsState,
  (state) => state.enrollments
)

export const selectEnrollmentsPaginator = createSelector(
  selectEnrollmentsState,
  (state) => state.paginator
)

export const selectEnrollmentsPaginatorIsLoading = createSelector(
  selectEnrollmentsState,
  (state) => state.loading
)

export const selectEnrollmentsIsLoading = createSelector(
  selectEnrollmentsState,
  (state) => state.loading
)

export const selectEnrollmentsStudents = createSelector(
  selectEnrollmentsState,
  (state) => state.students
)

export const selectEnrollmentsCourses = createSelector(
  selectEnrollmentsState,
  (state) => state.courses
)