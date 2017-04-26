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
import Icon from 'react-native-vector-icons/Ionicons';

export default class LeadTasksRow extends Component {
  render() {

    let {task, users} = this.props;

    console.log('#4ds4fd4 row pros of lead tasks: ', this.props);

    let user_id2obj = {};
    users.forEach(user => {
      user_id2obj[user.id] = user;
    });

    const icon_name =
      task.completed ? `${Platform.OS === 'ios' ? 'ios' : 'md'}-checkbox`
        : `${Platform.OS === 'ios' ? 'ios' : 'md'}-square-outline`;

    let style = {
      label: {
        fontSize: 12,
        color: '#fff',
        padding: 4,
        width: 80,
        textAlign: 'center',
      }
    };

    if (task.label) {
      switch (task.label.toLowerCase()) {
        case 'urgent':
          style.label.backgroundColor = colors.red;
          break;
        case 'meeting':
          style.label.backgroundColor = colors.orange;
          break;
        case 'call':
          style.label.backgroundColor = colors.green;
          break;
        case 'follow up':
          style.label.backgroundColor = colors.blue;
          break;
      }
    }

    return (
      <View style={{flexDirection: 'row', padding: 8}}>
        <TouchableWithoutFeedback onPress={() => this.props.handleToggleCompleted(task.id, !task.completed)}>
          <View>
            <Icon
              name={icon_name}
              size={30}
              color={colors.brand}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={{paddingLeft: 16, flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, color: colors.text_primary, flex: 1}}>{task.name.trim()}</Text>
            <View>
              <Text style={style.label}>{task.label}</Text>
            </View>
          </View>
          <Text style={{fontSize: 14, color: colors.text_secondary}}>
            {`Assigned to ${task.assigned_to_id ? user_id2obj[task.assigned_to_id].name : 'Nobody'}`}
          </Text>
        </View>
      </View>
    );
  }
}

LeadTasksRow.propTypes = {
  task: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  handleToggleCompleted: React.PropTypes.func.isRequired,
};