import { combineReducers } from 'redux';
import login from './AuthReducer/loginReducer';
import viewAdminProfile from './AuthReducer/viewAdminProfileReducer';
import loading from './CommonReducer/loadingReducer';
import forgot from './AuthReducer/forgotReducer';
import updateProfile from './AuthReducer/updateProfileReducer';
import logout from './AuthReducer/logoutReducer';
import { viewPrograms, viewProgram, viewGuestListProgram, updateProgramRequest } from './MasterDataReducer/programReducer'
import { viewAssessments, viewAssessment } from './MasterDataReducer/AssessmentReducer'
import { viewGuestUsers, viewGuestUserDetails, addNewGuest, updateGuestDetails } from './UserManagementReducer/guestUserReducer'
import { addNewTeamMember, deleteTeamMember, getUserRoleList, updateMultipleUserRole, updateTeamMemberDetails, viewTeamMemberDetails, viewTeamMembers } from './UserManagementReducer/TeamMemberReducer';
import { addNewUserRole, deleteUserRoleTitle, UpdateUserRoleTitle } from './UserManagementReducer/UserRoleReducer';
import { getAccessManagementList } from './UserManagementReducer/AccessManagementReducer';
import { addRecipe, addRecipeCollection, deleteMasterDataModule, editRecipe, editRecipeCollection, getRecipeCollectionList, getRecipeList, viewEditRecipeCollection, viewRecipe, viewRecipeCollectionDetails, uploadFile } from './MasterDataReducer/RecipeCollectionReducer';
import {
  getContentsList,
  viewContentDetails,
  addVideoPodcast,
  updateVideoPodcast,
  deleteVideoPodcast,
  getProgramsList,
  getCategoryList
} from './ContentmanagementReducer/videoPodcastsReducer';
import { getContentCategoryList } from './MasterDataReducer/ContentCategoryReducer';
import { approveRejectTestimonials, getTestimonialsList, viewTestimonialsDetails } from './TestimonialsReducer/TestimonialsReducer';
import { addNewEvent, editEventDetails, getEventsList, viewEventDetails } from './EventsReducer/EventsReducer';
import { addNewActivity, getActivityList, getInterestedGuestList, updateActivity, viewActivityDetails } from './MasterDataReducer/ActivityReducer';

const rootReducer = combineReducers({

  login: login,
  viewAdminProfile: viewAdminProfile,
  loading: loading,
  forgot: forgot,
  logout: logout,
  updateProfile: updateProfile,
  viewPrograms: viewPrograms,
  viewProgram: viewProgram,
  viewGuestListProgram: viewGuestListProgram,
  viewAssessments: viewAssessments,
  viewAssessment: viewAssessment,
  viewGuestUsers: viewGuestUsers,
  viewGuestUserDetails: viewGuestUserDetails,
  addNewGuest: addNewGuest,
  updateGuestDetails: updateGuestDetails,
  viewTeamMembers: viewTeamMembers,
  deleteTeamMember: deleteTeamMember,
  addNewTeamMember: addNewTeamMember,
  getUserRoleList: getUserRoleList,
  viewTeamMemberDetails: viewTeamMemberDetails,
  updateTeamMemberDetails: updateTeamMemberDetails,
  updateMultipleUserRole: updateMultipleUserRole,
  deleteUserRoleTitle: deleteUserRoleTitle,
  addNewUserRole: addNewUserRole,
  UpdateUserRoleTitle: UpdateUserRoleTitle,
  getAccessManagementList: getAccessManagementList,
  getRecipeCollectionList: getRecipeCollectionList,
  addRecipeCollection: addRecipeCollection,
  editRecipeCollection: editRecipeCollection,
  viewRecipeCollectionDetails: viewRecipeCollectionDetails,
  getRecipeList: getRecipeList,
  deleteMasterDataModule: deleteMasterDataModule,
  viewEditRecipeCollection: viewEditRecipeCollection,
  viewRecipe: viewRecipe,
  addRecipe: addRecipe,
  editRecipe: editRecipe,

  getContentsList: getContentsList,
  viewContentDetails: viewContentDetails,
  addVideoPodcast: addVideoPodcast,
  updateVideoPodcast: updateVideoPodcast,
  deleteVideoPodcast: deleteVideoPodcast,
  getProgramsList: getProgramsList,
  getCategoryList: getCategoryList,

  getContentCategoryList: getContentCategoryList,

  getTestimonialsList: getTestimonialsList,
  viewTestimonialsDetails: viewTestimonialsDetails,
  approveRejectTestimonials: approveRejectTestimonials,

  getEventsList: getEventsList,
  viewEventDetails: viewEventDetails,
  addNewEvent: addNewEvent,
  editEventDetails: editEventDetails,

  uploadFile: uploadFile,
  updateProgramRequest: updateProgramRequest,

  getActivityList: getActivityList,
  viewActivityDetails: viewActivityDetails,
  addNewActivity: addNewActivity,
  updateActivity: updateActivity,
  getInterestedGuestList: getInterestedGuestList,

});

export default rootReducer;
