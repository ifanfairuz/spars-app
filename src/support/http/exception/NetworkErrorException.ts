import ErrorException from "./ErrorException";
import { Alert } from "react-native";

let alert_shown = false;

export default class NetworkErrorException extends ErrorException {
  
  /**
   * show error alert
   */
  showErrorAlert() {
    if (alert_shown) return;
    Alert.alert('Jaringan', 'Pastikan Anda terhubung ke internet.', [{
      text: 'OK',
      onPress: () => alert_shown = false
    }]);
    alert_shown = true;
  }

}