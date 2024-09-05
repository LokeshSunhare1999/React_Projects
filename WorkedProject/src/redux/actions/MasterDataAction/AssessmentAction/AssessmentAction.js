
import {
    VIEW_ASSESSMENTS,
    VIEW_ASSESSMENTS_SUCCESS,
    VIEW_ASSESSMENTS_FAILURE,

    VIEW_ASSESSMENT,
    VIEW_ASSESSMENT_SUCCESS,
    VIEW_ASSESSMENT_FAILURE,

    UPDATE_IS_ACTIVE_STATUS,
    UPDATE_IS_ACTIVE_STATUS_SUCCESS,
    UPDATE_IS_ACTIVE_STATUS_FAILURE

} from '../../../constants';

/**
 * Fetches the login details of the user if already in DB
 *
 * @param  {data} data in the form
 *
 * @return {object}    An action object with a type of FETCH_LOGIN_DETAILS
 */
export function viewAssessments(data) {
    return {
        type: VIEW_ASSESSMENTS,
        data,
    };
}

export function viewAssessmentsSuccess(data) {
    return {
        type: VIEW_ASSESSMENTS_SUCCESS,
        data,
    };
}

export function viewAssessmentsFailure(data) {
    return {
        type: VIEW_ASSESSMENTS_FAILURE,
        data,
    };
}

export function viewAssessment(data) {
    return {
        type: VIEW_ASSESSMENT,
        data,
    };
}

export function viewAssessmentSuccess(data) {
    return {
        type: VIEW_ASSESSMENT_SUCCESS,
        data,
    };
}

export function viewAssessmentFailure(data) {
    return {
        type: VIEW_ASSESSMENT_FAILURE,
        data,
    };
}

export function updateIsActiveStatus(data) {
    return {
        type: UPDATE_IS_ACTIVE_STATUS,
        data,
    };
}

export function updateIsActiveStatusSuccess(data) {
    return {
        type: UPDATE_IS_ACTIVE_STATUS_SUCCESS,
        data,
    };
}

export function updateIsActiveStatusFailure(data) {
    return {
        type: UPDATE_IS_ACTIVE_STATUS_FAILURE,
        data,
    };
}
