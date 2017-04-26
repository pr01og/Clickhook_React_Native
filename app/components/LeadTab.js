// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  View,
  Text,
  TextInput,
  Image,
  AsyncStorage,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import {colors} from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LeadTab extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let styles = {
      btn: {
        height: 56,
        flex: 1,
        justifyContent: 'center',
      },
      text: {
        textAlign: 'center',
      }
    };

    if (this.props.active) {
      styles.btn.backgroundColor = colors.brand;
      styles.text.color = '#fff';
    }

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.btn}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

LeadTab.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
};
