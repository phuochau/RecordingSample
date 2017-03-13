import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Metrics, Colors } from '../../themes';
import styles from './style';

export default class IconButton extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    name: 'play',
    size: Metrics.icons.large,
    color: Colors.secondary,
  }

  render() {
    const { name, size, color, onPress } = this.props;
    const buttonWidth = size + Metrics.buttonPadding;
    const extendsButtonStyle = { width: buttonWidth, height: buttonWidth };
    return (
      <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, extendsButtonStyle]} activeOpacity={0.7}>
        <Icon name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  }
}
