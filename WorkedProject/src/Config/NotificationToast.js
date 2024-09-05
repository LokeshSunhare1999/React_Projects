import { toast } from 'react-toastify';

export const NOTIFICATION_TYPE_INFO = 'info';
export const NOTIFICATION_TYPE_SUCCESS = 'success';
export const NOTIFICATION_TYPE_WARNING = 'warning';
export const NOTIFICATION_TYPE_ERROR = 'error';

export const createNotification = (type, message) => {
  toast.dismiss();
  switch (type) {
    case NOTIFICATION_TYPE_INFO:
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      break;
    case NOTIFICATION_TYPE_SUCCESS:
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      break;
    case NOTIFICATION_TYPE_WARNING:
      toast.warning(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      break;
    case NOTIFICATION_TYPE_ERROR:
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      break;
    default:
  }
}