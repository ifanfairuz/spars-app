import ErrorException from "./ErrorException";
import { Alert } from "react-native";

let alert_shown = false;

export default class NetworkErrorException extends ErrorException {
  
  /**
   * show error alert
   */
  showErrorAlert() {
    if (alert_shown) return;
    Alert.alert('Network', 'Please check your connection', [{
      text: 'OK',
      onPress: () => alert_shown = false
    }]);
    alert_shown = true;
  }

}