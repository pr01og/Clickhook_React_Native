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
const numeral = require('numeral');
const moment = require('moment');

export default class LeadNotesRow extends Component {
  render() {

    let note = this.props.note || {};

    return (
      <TouchableWithoutFeedback onPress={() => this.props.handlePress(note.id)}>
        <View style={{paddingBottom: 24}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <Text style={{flex: 1, color: colors.text_secondary, fontSize: 14}}>
              <Text style={{color: colors.text_primary, fontSize: 16}}>
                {`${note.created_by_name}: `}
              </Text>
              {note.sanitized_text}
            </Text>
            <Text style={{color: colors.text_disabled, fontSize: 12}}>
              {moment(note.updated_at).format('D, MMM YYYY')}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

LeadNotesRow.propTypes = {
  note: React.PropTypes.object.isRequired,
  handlePress: React.PropTypes.func.isRequired,
};