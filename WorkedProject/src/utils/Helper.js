import * as routes from "../Router/RoutesURL";
import { createNotification } from '../Config/NotificationToast';
import { REACT_APP_ENCRYPTION_KEY } from "../Config/Constant";

export const rowOptions = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
];

export const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
];

export const Leveloptions = [
    { value: 'Comprehensive', label: 'Comprehensive' },
    { value: 'Foundation & Comprehensive', label: 'Foundation & Comprehensive' },
];

export const durationOptions = [
    { value: '30', label: '30 Minutes' },
    { value: '60', label: '60 Minutes' },
    { value: '90', label: '90 Minutes' },
    { value: '120', label: '120 Minutes' },
    { value: '150', label: '150 Minutes' },
    { value: '180', label: '180 Minutes' },
    { value: '210', label: '210 Minutes' },
    { value: '240', label: '240 Minutes' },
    { value: '270', label: '270 Minutes' },
    { value: '300', label: '300 Minutes' },
];

export const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
];

export const weekdays = [
    { value: 0, day: 'Sun' },
    { value: 0, day: 'Mon' },
    { value: 0, day: 'Tue' },
    { value: 0, day: 'Wed' },
    { value: 0, day: 'Thu' },
    { value: 0, day: 'Fri' },
    { value: 0, day: 'Sat' },
];


export const addSuffix = (num) => {
    if (num % 100 >= 11 && num % 100 <= 13) {
        return num + "th";
    } else if (num % 10 === 1) {
        return num + "st";
    } else if (num % 10 === 2) {
        return num + "nd";
    } else if (num % 10 === 3) {
        return num + "rd";
    } else {
        return num + "th";
    }
}

const CryptoJS = require("crypto-js");
export const encryptUrlData = (data) => {
    return CryptoJS.AES.encrypt(data, REACT_APP_ENCRYPTION_KEY).toString()
}
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), REACT_APP_ENCRYPTION_KEY).toString()
}

export const decryptData = (data) => {
    var bytes = CryptoJS.AES.decrypt(data, REACT_APP_ENCRYPTION_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}

export const logOut = (type, msg) => {
    localStorage.clear();
    window.location.href = routes.LOG_IN;
    createNotification(type, msg);
}

export const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
export const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export const getPermissionByAppName = (appName) => {
    const userData = JSON.parse(localStorage.getItem('UserData'));
    const filteredObject = userData?.permissions?.find(x => x.app_name === appName);
    return filteredObject?.permission;
}
export const getRandomName=()=> { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0) {//Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & (0x3 | 0x8))).toString(16);
  });
}