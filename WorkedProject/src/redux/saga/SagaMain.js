import { all } from 'redux-saga/effects';
import login from './LoginSaga/loginSaga';
import viewAdminProfile from './ViewProfileSaga/ViewProfileSaga';
import forgot from './ForgotSaga/forgotSaga';
import updateProfile from './UpdateProfileSaga/updateProfileSaga';
import logout from './LogoutSaga/logoutSaga';
import viewPrograms from './MasterDataSaga/ProgramsSaga/ProgramSaga';
import viewAssessments from './MasterDataSaga/AssessmentSaga/AssessmentSaga';
import viewAssessmentQuestion from './MasterDataSaga/AssessmentSaga/ViewAssessmentSaga';
import guestUser from './UserManagementSaga/GuestUserSaga/GuestUserSaga';
import viewTeamMembers from './UserManagementSaga/TeamMemberSaga/TeamMemberSaga';
import userRole from './UserManagementSaga/UserRoleSaga/UserRoleSaga';
import accessManagement from './UserManagementSaga/AccessManagementSaga/AccessManagementSaga';
import recipeCollection from './MasterDataSaga/RecipeCollectionSaga/RecipeCollectionSaga';
import videoPodcast from './ContentManagementSaga/videoPodcastSaga/videoPodcastSaga';
import contentCategory from './MasterDataSaga/ContentCategorySaga/ContentCategorySaga';
import Testimonials from './TestimonialsSaga/TestimonialsSaga';
import Events from './EventsSaga/EventsSaga';
import viewActivities from './MasterDataSaga/ActivitySaga/ActivitySaga';

export default function* SagaMain() {
  yield all([
    login(),
    viewAdminProfile(),
    forgot(),
    updateProfile(),
    logout(),
    viewPrograms(),
    viewAssessments(),
    viewAssessmentQuestion(),
    guestUser(),
    viewTeamMembers(),
    userRole(),
    accessManagement(),
    recipeCollection(),
    videoPodcast(),
    contentCategory(),
    Testimonials(),
    Events(),
    viewActivities(),
  ])
}