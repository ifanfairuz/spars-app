import ErrorException from "./ErrorException";
import { Alert } from "react-native";

let alert_shown = false;

export default class UnauthErrorException extends ErrorException {
  
  /**
   * show error alert
   */
  showErrorAlert(onPress?: () => void) {
    if (alert_shown) return;
    Alert.alert('Sesi Habis', this.message, [{
      text: 'OK',
      onPress: () => {
        if (onPress) onPress();
        alert_shown = false;
      }
    }]);
    alert_shown = true;
  }

}