import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  View,
  RefreshControl,
  Text,
  TextInput,
  Image,
  AsyncStorage,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import {colors} from '../../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import TextField from 'react-native-md-textinput';
import Calendar from 'react-native-calendar-datepicker';

const validator = require('validator');
const moment = require('moment');


export default class DatePicker extends Component {

  render() {
    return (
      <View style={{
          marginTop: 24,
          marginBottom: 24,
          marginRight: 16,
          marginLeft: 16,
          shadowColor: "#000",
          shadowOpacity: 0.4,
          backgroundColor: colors.background,
          shadowRadius: 2,
          shadowOffset: {height: 0, width: 0},
     }}>
        <Calendar
          style={{
            flex: 1,
            alignSelf: 'center',
            backgroundColor: colors.background,
          }}
          barView={{
            backgroundColor: colors.background,
            padding: 16,
          }}
          dayHeaderText={{
            color: colors.text_primary,
          }}
          dayHeaderView={{
            borderColor: colors.text_hint,
          }}
          barText={{
            fontSize: 16,
            color: colors.text_primary,
          }}
          dayText={{
            color: colors.indigo_700
          }}
          daySelectedText={{
            color: '#fff',
            backgroundColor: colors.brand,
            borderColor: colors.brand,
            borderWidth: 1,
            borderRadius: 6,
          }}
          dayView={{
            borderWidth: 0
          }}
          dayRowView={{
            borderColor: colors.divider,
            height: 38,
          }}

          onChange={this.props.handleChange}
          selected={this.props.date || new Date()}
          // We use Moment.js to give the minimum and maximum dates.
          minDate={moment().startOf('day')}
          maxDate={moment().add(10, 'years').startOf('day')}
          startStage={'month'}
        />
      </View>
    );
  }


}

DatePicker.propTypes = {
  date: React.PropTypes.instanceOf(Date),
  handleChange: React.PropTypes.func.isRequired,
};
