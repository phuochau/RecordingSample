
import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addRecord, deleteRecord } from '../redux/reducers/recorder';
import AudioManager from '../lib/AudioManager';
import { RecordingButton, IconButton } from '../components';
import { Colors } from '../themes';
import styles from './styles/MainScreenStyle';

@connect(
  state => ({
    records: state.recorder.records,
  }),
  { addRecord, deleteRecord }
)
export default class MainScreen extends Component {
  static propTypes = {
    records: PropTypes.array,
    addRecord: PropTypes.func,
    deleteRecord: PropTypes.func,
  }

  constructor(...props) {
    super(...props);
    this.state = {
      isStart: false,
      isPause: false,
      currentTime: 0,
      hasPermission: false,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.resume = this.resume.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  componentWillMount() {
    AudioManager.getInstance().checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });
      if (!hasPermission) {
        return;
      }

      AudioManager.getInstance().setOnProgressListener(this.onProgress);
      AudioManager.getInstance().setOnFinishListener(this.onFinish);
    });
  }

  onProgress(data) {
    if (data.currentTime > 0) {
      this.setState({
        currentTime: data.currentTime
      });
    }
  }

  onFinish(didSucceed, name, path) {
    this.props.addRecord({
      name,
      path,
      length: this.state.currentTime,
    });
    this.setState({
      currentTime: 0
    });
  }

  /* Control the recorder */
  start() {
    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    AudioManager.getInstance().start().then(() => {
      this.setState({
        isStart: true,
      });
    });
  }

  stop() {
    AudioManager.getInstance().stop().then(() => {
      this.setState({
        isStart: false,
        isPause: false,
      });
    });
  }

  pause() {
    if (Platform.OS === 'android') {
      Alert.alert(
        'Not Support',
        'Currently, this function does not support for Android!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      );
      return;
    }

    AudioManager.getInstance().pause().then(() => {
      this.setState({ isPause: true });
    });
  }

  resume() {
    this.setState({ isPause: false });
    AudioManager.getInstance().resume();
  }

  play(path) {
    AudioManager.play(path);
  }

  deleteRecord(record) {
    AudioManager.deleteRecord(record.path).then((isDelete) => {
      console.log('isDelete', isDelete);
      this.props.deleteRecord(record);
    });
  }

  renderPauseResume() {
    if (this.state.isPause) {
      return <IconButton onPress={this.resume} name="play-arrow" />;
    }
    return <IconButton onPress={this.pause} name="pause" />;
  }

  renderAudioList() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <ListView
        enableEmptySections
        dataSource={ds.cloneWithRows(this.props.records)}
        renderRow={(record) => {
          return (
            <Swipeable rightButtons={[
              <TouchableOpacity style={styles.buttonDelete} onPress={() => this.deleteRecord(record)}>
                <Icon style={styles.iconDelete} name="delete" size={38} color={Colors.white} />
              </TouchableOpacity>
            ]}>
              <TouchableOpacity onPress={() => this.play(record.path)} style={styles.audioItem}>
                <Text style={styles.audioName}>{record.name}</Text>
                <Text style={styles.audioLength}>{AudioManager.getTimeString(record.length)}</Text>
              </TouchableOpacity>
            </Swipeable>
          );
        }}
      />
    );
  }

  render() {
    const { isStart, currentTime } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.recordingContainer}>
          <Text style={styles.durationText}>{AudioManager.getTimeString(currentTime)}</Text>
          <View style={styles.controlContainer}>
            <RecordingButton onStartPress={this.start} onStopPress={this.stop} isRecording={isStart} />
            {isStart && this.renderPauseResume()}
          </View>
        </View>
        <View style={styles.audiosContainer}>
          {this.renderAudioList()}
        </View>
      </View>
    );
  }
}
