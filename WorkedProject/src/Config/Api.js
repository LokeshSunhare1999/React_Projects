import { BASE_URL } from "./Constant";

export let base_url_API = BASE_URL + "userAuth/api/admin/";

//---------Auth Module---------
export const Login_API = base_url_API + 'login';
export const ViewProfile_API = base_url_API + 'viewProfile';
export const Forgot_API = base_url_API + 'forgotPassword';
export const UpdateProfile_API = base_url_API + 'updateProfile';
export const Logout_API = BASE_URL + "userAuth/api/logout";

//---------Master Data Module---------
export const AllPrograms_API = BASE_URL + 'adminPrograms/api/allPrograms';
export const UpdateActiveStatus_API = BASE_URL + 'adminPrograms/api/updateIsActiveStatus';
export const ViewProgramDetails_API = BASE_URL + 'adminPrograms/api/viewProgram';
export const GuestListForProgram_API = BASE_URL + 'adminPrograms/api/getGuestListForProgram';

//-----------User Management---------
export const AllGuest_API = BASE_URL + 'adminUserManagement/api/getGuestUsersData';
export const ViewGuestDetails_API = BASE_URL + 'adminUserManagement/api/viewGuestDetails';
export const AddNewGuest_API = BASE_URL + 'adminUserManagement/api/addNewGuest';
export const UpdateGuestDetails_API = BASE_URL + 'adminUserManagement/api/updateGuestDetailsByAdmin';

//---------Assessment ---------
export const AllAssessment_API = BASE_URL + 'adminPrograms/api/getSectionsMasterData';
export const ViewAssessment_API = BASE_URL + 'adminPrograms/api/getQuestionsBySection';

//---------Team Member Module ---------
export const TeamMembersList_API = BASE_URL + 'adminUserManagement/api/getTeamMembersList';
export const addTeamMember_API = BASE_URL + 'adminUserManagement/api/addNewTeamMember';
export const deleteTeamMember_API = BASE_URL + 'adminUserManagement/api/deleteUser';
export const getUSerRoleList_API = BASE_URL + 'adminUserManagement/api/getUserRoleList';
export const getTeamMemberDetails_API = BASE_URL + 'adminUserManagement/api/viewTeamUserDetailById';
export const updateTeamMemberDetails_API = BASE_URL + 'adminUserManagement/api/updateTeamUserDetailById';
export const updateMultipleUserRole_API = BASE_URL + 'adminUserManagement/api/bulkUpdateUserRole';

//---------User Role Module ---------

export const addNewUserRole_API = BASE_URL + 'adminUserManagement/api/addNewUserRole';
export const deleteUserRole_API = BASE_URL + 'adminUserManagement/api/deleteUserRole';
export const updateUserRole_API = BASE_URL + 'adminUserManagement/api/updateUserRoleTitle';

//---------Access Management Module ---------
export const accessManagementList_API = BASE_URL + 'adminUserManagement/api/accessManagementList';
export const updateAccess_API = BASE_URL + 'adminUserManagement/api/updateAccess';

//---------Recipe Collection Module ---------
export const getRecipeCollectionList_API = BASE_URL + 'adminPrograms/api/getRecipeCollectionList';
export const addNewRecipeCollection_API = BASE_URL + 'adminPrograms/api/addNewRecipeCollection';
export const ViewRecipeCollectionForEdit_API = BASE_URL + 'adminPrograms/api/viewRecipeCollectionById';
export const editRecipeCollection_API = BASE_URL + 'adminPrograms/api/updateRecipeCollectionById';
export const getRecipe_API = BASE_URL + 'adminPrograms/api/getRecipeListByCollectionId';
export const viewRecipeDetailsById_API = BASE_URL + 'adminPrograms/api/getRecipeDetailsById';
export const addNewRecipe_API = BASE_URL + 'adminPrograms/api/addNewRecipe';
export const updateRecipe_API = BASE_URL + 'adminPrograms/api/updateRecipeById';

//--------- Master Data Module Delete Common APi ---------
export const masterDataModuleDelete_API = BASE_URL + 'adminPrograms/api/delete';

//--------Content Management------
export const ViewProgramsList_API = BASE_URL + 'adminPrograms/api/getAnandaProgramList';
export const ViewCategoryList_API = BASE_URL + 'adminContentManagement/api/getContentCategories';
export const ContentsList_API = BASE_URL + 'adminContentManagement/api/getContentList';
export const ViewContentDetails_API = BASE_URL + 'adminContentManagement/api/getContentDetailById';
export const AddVideoPodcast_API = BASE_URL + 'adminContentManagement/api/addContent';
export const UpdateVideoPodcast_API = BASE_URL + 'adminContentManagement/api/updateContentById';
export const ViewContentsList_API = BASE_URL + 'adminContentManagement/api';

export const DeleteContent_API = BASE_URL + 'adminPrograms/api/delete';

//--------Content Category------
export const getContentCategoryList_API = BASE_URL + 'adminPrograms/api/getContentCategoryList';

//--------Content Category------
export const getTestimonialsList_API = BASE_URL + 'adminTestimonialManagement/api/getTestimonialList';
export const viewTestimonials_API = BASE_URL + 'adminTestimonialManagement/api/viewTestimonialDetails';
export const approveRejectTestimonials_API = BASE_URL + 'adminTestimonialManagement/api/updateApprovalStatus';

//--------Upload File API Common For All------
export const uploadFile_API = BASE_URL + 'api/upload/file';

export const update_Program_Req_API = BASE_URL + '/adminPrograms/api/sendUpdateRequestToDev';

//--------Activity For All------
export const getActivity_API = BASE_URL + 'adminPrograms/api/getInHouseActivityList';
export const viewActivity_API = BASE_URL + 'adminPrograms/api/getInHouseActivityDetailsById';
export const interestedGuestList_API = BASE_URL + 'adminPrograms/api/interestedGuestList';
export const addActivity_API = BASE_URL + 'adminPrograms/api/addNewInHouseActivity';
export const updateActivity_API = BASE_URL + 'adminPrograms/api/updateInHouseActivityById';
