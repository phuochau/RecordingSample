import {
  StyleSheet,
} from 'react-native';
import { Colors } from '../../themes';

export default StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInside: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.secondary,
  },
  buttonStopContainer: {
    backgroundColor: Colors.transparent,
  },
  buttonStop: {
    backgroundColor: Colors.secondary,
    width: 40,
    height: 40,
    borderRadius: 3,
  }
});
