//import Platform from 'react-platform-js'

//-----BASE_URL Code--------
//export let BASE_URL = "https://stgapi.chroniclecloud.com/";
export let BASE_URL = "https://dev-api.anandaspa.com/";

// -----Device Type--------
export const device_type = 'web_app';
export const REACT_APP_ENCRYPTION_KEY = "aNanDArESoRT@1234!#$%&*";
//-----Device Version--------
//export const device_version = JSON.stringify(Platform.OS + " " + Platform.OSVersion);

//-----AdminProfile Text--------
export const YOU_FIRST_NAME_HAS_BEEN_UPDATED = "Your first name has been updated.";
export const YOU_LAST_NAME_HAS_BEEN_UPDATED = "Your last name has been updated.";
export const YOU_FIRST_AND_LAST_NAME_HAS_BEEN_UPDATED = "Your first name and last name has been updated.";
export const PASSWORD_CHANGE_SUCCESSFULLY = "Password Changed successfully.";
export const PROFILE_DETAILS_FETCHED_SUCCESSFULLY = "Profile details fetched successfully";

export const NAME_REGEX = /^[a-zA-Z]+$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const PASSWORD_REGEX = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;\"'<>,.?/_₹]).{8,15}$/;
export const PHONE_REGEX = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;

//-----Login Text--------
export const EMAIL_IS_REQUIRED = "Email is required!";
export const THIS_IS_NOT_A_VALID_EMAIL_FORMAT = "This is not a valid email format!";
export const PASSWORD_IS_REQUIRED = "Password is required!";
export const PASSWORD_MUST_BE_MORE_THAN_8_CHARACTERS = "Password must be more than 8 characters";
export const PASSWORD_CANNOT_EXCEED_MORE_THAN_20_CHARACTERS = "Password cannot exceed more than 20 characters";
export const THIS_IS_NOT_A_VALID_PASSWORD_FORMAT = "This is not a valid password format!";

//-----AddMember Text--------
export const PHONE_NUMBER_IS_REQUIRED = "Phone Number is required!";
export const THIS_IS_NOT_A_VALID_PHONE_NUMBER_FORMAT = "This is not a valid phone number format!";
export const USER_ROLE_IS_REQUIRED = "User Role is required!";
export const FIRST_NAME_IS_REQUIRED = "first Name is required!";
export const LAST_NAME_IS_REQUIRED = "Last Name is required!";

//-----AddRecipe Text--------
export const TITLE_IS_REQUIRED = "Title is required!";
export const TYPE_IS_REQUIRED = "Type is required!";
export const CALORIES_IS_REQUIRED = "Calories is required!";
export const ENTER_CALORIES_IN_NUMBER = "Enter Calories in Number!";
export const DOSHA_IS_REQUIRED = "Dosha is required!";
export const CAL_IS_REQUIRED = "Cal is required!";
export const PROTEIN_IS_REQUIRED = "Protein is required!";
export const FAT_IS_REQUIRED = "Fat is required!";
export const PORTION_IS_REQUIRED = "Portion is required!";
export const MINUTES_IS_REQUIRED = "Minutes is required!";
export const CARB_IS_REQUIRED = "Carb is required!";