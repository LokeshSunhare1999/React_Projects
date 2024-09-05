import React, { useEffect, useState } from 'react';
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import * as routes from "../Router/RoutesURL";
import Login from '../Screens/AuthModule/Login/LoginPage';
import ForgotPassword from '../Screens/AuthModule/Forgot/ForgotPage';
import ViewProgram from '../Screens/MasterData/Programs/ViewProgram';
import ViewGuestListProgramDetail from '../Screens/MasterData/Programs/ViewGuestListProgramDetail';
import AddVideoPodcasts from '../Screens/ContentManagement/VideosPodcasts/AddVideoPodcasts';
import AddBlogsArticles from '../Screens/ContentManagement/BlogsArticles/AddBlogsArticles';
import ViewBlogsArticles from '../Screens/ContentManagement/BlogsArticles/ViewBlogsArticles';
import ProtectedRoutes from './ProtectedRoutes'
import MasterDataDashboard from '../Screens/MasterData/MasterDataDashboard';
import ContentManagementDashboard from '../Screens/ContentManagement/ContentManagementDashboard';
import UserManagementDashboard from '../Screens/UserManagement/UserManagementDashboard';
import AddUser from '../Screens/UserManagement/GuestUser/AddUser';
import EditGuestUser from '../Screens/UserManagement/GuestUser/EditGuestUser';
import AddMember from '../Screens/UserManagement/TeamMembers/AddMember';
import ViewTeamMemberDetails from '../Screens/UserManagement/TeamMembers/ViewTeamMemberDetails';
import WellnessTeamList from '../Screens/UserManagement/UserRole/WellnessTeamList';
import AdminProfile from '../Screens/Profile/AdminProfile';
import Event from '../Screens/Events/Events'
import Testimonials from '../Screens/Testimonials/Testimonials'
import ViewTestimonials from '../Screens/Testimonials/ViewTestimonials'
import NotFound from '../Screens/AuthModule/NotFound'
import ViewAssessment from '../Screens/MasterData/Assessment/ViewAssessment'
import ViewGuestUser from '../Screens/UserManagement/GuestUser/ViewGuestUser';
import AddRecipeCollection from '../Screens/MasterData/RecipeCollection/AddRecipeCollection';
import RecipeList from '../Screens/MasterData/RecipeCollection/RecipeList';
import ViewRecipe from '../Screens/MasterData/RecipeCollection/ViewRecipe';
import AddRecipe from '../Screens/MasterData/RecipeCollection/AddRecipe';
import EditRecipe from '../Screens/MasterData/RecipeCollection/EditRecipe';
import SocialSharing from '../Screens/SocialSharing/SocialSharing';
import MakeAnnouncement from '../Screens/SocialSharing/MakeAnnouncement';
import AddNewGroup from '../Screens/SocialSharing/AddNewGroup';
import ViewActivity from '../Screens/MasterData/Activity/ViewActivity';
import AddActivity from '../Screens/MasterData/Activity/AddActivity';
import EditActivity from '../Screens/MasterData/Activity/EditActivity';
import ViewGuestListActivityDetails from '../Screens/MasterData/Activity/ViewGuestListActivityDetails';
import { getPermissionByAppName } from '../utils/Helper'

const AppRoutes = () => {
const [ userAuthenticate, setUserAuthenticate] = useState(false);
    const authenticateUser = () => {
        const isAuthenticated = localStorage.getItem('Authenticated')
        if (isAuthenticated) {
            return true
        } else {
            return false
        }
    }
    useEffect(()=>{
        const auth = authenticateUser();
        //debugger
        setUserAuthenticate(auth);
    },[])
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={userAuthenticate ? <Navigate to="/master-data" /> : <Login />} />
                <Route element={<ProtectedRoutes />}>
                {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.DASHBOARD} element={<MasterDataDashboard />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.MASTERDATA} element={<MasterDataDashboard />} />}
                    {getPermissionByAppName("Content Management") !== "hide" && <Route exact path={routes.CONTENT_MANAGEMENT} element={<ContentManagementDashboard />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.VIEW_PROGRAMS} element={<ViewProgram />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.VIEW_ACTIVITY} element={<ViewActivity />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.ADD_ACTIVITY} element={<AddActivity />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.EDIT_ACTIVITY} element={<EditActivity />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.VIEW_INTERESTED_GUEST_LIST_ACTIVITY} element={<ViewGuestListActivityDetails />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.ADD_RECIPE_COLLECTION} element={<AddRecipeCollection />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.ADD_RECIPE} element={<AddRecipe />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.EDIT_RECIPE} element={<EditRecipe />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.RECIPE_LIST} element={<RecipeList />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.VIEW_RECIPE} element={<ViewRecipe />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.VIEW_GUEST_LIST_PROGRAM} element={<ViewGuestListProgramDetail />} />}
                    {getPermissionByAppName("Master Data") !== "hide" && <Route exact path={routes.VIEW_ASSESSMENT} element={<ViewAssessment />} />}
                    {getPermissionByAppName("Content Management") !== "hide" && <Route exact path={routes.ADD_VIDEO_PODCASTS} element={<AddVideoPodcasts />} />}
                    {getPermissionByAppName("Content Management") !== "hide" && <Route exact path={routes.VIEW_BLOG_ARTICLE} element={<ViewBlogsArticles />} />}
                    {getPermissionByAppName("Content Management") !== "hide" && <Route exact path={routes.ADD_BLOG_ARTICLE} element={<AddBlogsArticles />} />}
                    <Route exact path={routes.PROFILE} element={<AdminProfile />} />
                    {getPermissionByAppName("User Management") !== "hide" && <Route exact path={routes.USER_MANAGEMENT} element={<UserManagementDashboard />} />}
                    {getPermissionByAppName("User Management") !== "hide" && <Route exact path={routes.ADD_USER} element={<AddUser />} />}
                    {getPermissionByAppName("User Management") !== "hide" && <Route exact path={routes.EDIT_USER} element={<EditGuestUser />} />}
                    {getPermissionByAppName("User Management") !== "hide" && <Route exact path={routes.VIEW_USER} element={<ViewGuestUser />} />}
                    {getPermissionByAppName("User Management") !== "hide" && <Route exact path={routes.ADD_MEMBER} element={<AddMember />} />}
                    {getPermissionByAppName("User Management") !== "hide" && <Route exact path={routes.VIEW_MEMBER} element={<ViewTeamMemberDetails />} />}
                    <Route exact path={routes.TEAM_LIST} element={<WellnessTeamList />} />
                    <Route exact path={routes.EVENT} element={<Event />} />
                    <Route exact path={routes.TESTIMONIALS} element={<Testimonials />} />
                    <Route exact path={routes.VIEW_TESTIMONIALS} element={<ViewTestimonials />} />
                    {getPermissionByAppName("Social Sharing") !== "hide" && <Route exact path={routes.SOCIAL_SHARING} element={<SocialSharing />} />}
                    {getPermissionByAppName("Social Sharing") !== "hide" && <Route exact path={routes.MAKE_ANNOUNCEMENT} element={<MakeAnnouncement />} />}
                    {getPermissionByAppName("Social Sharing") !== "hide" && <Route exact path={routes.ADD_NEW_GROUP} element={<AddNewGroup />} />}
                </Route>
                <Route exact path={routes.LOG_IN} element={<Login />} />
                <Route exact path={routes.FORGOT} element={<ForgotPassword />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
};

export default AppRoutes;