import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  recordingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrics.doubleLargeMargin,
  },
  controlContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audiosContainer: {
    flex: 1,
    backgroundColor: Colors.secondary
  },
  audioItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
  },
  audioName: {
    color: Colors.white,
    flex: 1,
    fontSize: Fonts.size.regular,
  },
  audioLength: {
    color: Colors.white,
    fontSize: Fonts.size.h6,
  },
  durationText: {
    color: Colors.white,
    fontSize: Fonts.size.h1,
    marginBottom: Metrics.baseMargin,
  },
  buttonDelete: {
    backgroundColor: Colors.red,
    flex: 1,
    justifyContent: 'center',
  },
  iconDelete: {
    marginLeft: Metrics.doubleBaseMargin,
  },
});
