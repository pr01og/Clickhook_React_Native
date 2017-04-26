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

const validator = require('validator');

export default class LeadProfileRow extends Component {

  render() {

    let icon;
    let icon_color = this.props.icon_disabled === true ? colors.text_disabled : colors.brand;
    switch (this.props.icon) {
      case 'call':
        icon = <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-call`} size={28} color={icon_color}/>;
        break;
      case 'mail':
        icon = <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-mail`} size={28} color={icon_color}/>;
        break;
      default:
        icon = null;
    }

    const value = this.props.secondary ?
      <Text style={{fontSize: 14, color: colors.text_secondary}}>
        {this.props.secondary}
      </Text>
      :
      <Text style={{fontSize: 12, color: colors.text_disabled, fontStyle: 'italic'}}>
        {this.props.no_value}
      </Text>;
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={{flexDirection: 'row', paddingLeft: 16, marginTop: 8, marginBottom: 8}}>
          <View style={{width: 40, paddingRight: 16, top: 10}}>
            {icon}
          </View>
          <View style={{marginRight: 16, flex: 1}}>
            <Text style={{fontSize: 16, color: colors.text_primary, paddingBottom: 8}}>
              {this.props.primary}
            </Text>
            {value}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


/*

 */

LeadProfileRow.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  primary: React.PropTypes.string.isRequired,
  no_value: React.PropTypes.string.isRequired,
  secondary: React.PropTypes.string,
  icon: React.PropTypes.string,
  icon_disabled: React.PropTypes.bool,
};
