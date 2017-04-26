// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  View,
  Text,
  Modal,
  TextInput,
  Image,
  AsyncStorage,
  RefreshControl,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import {colors} from '../styles/styles';
const numeral = require('numeral');
const moment = require('moment');
import Fab from './Fab';
import LeadTasksRow from './LeadTasksRow';

export default class LeadTasksList extends Component {

  render() {

    let rows = [];

    if (this.props.tasks && this.props.tasks.tasks && this.props.tasks.tasks.length > 0) {
      this.props.tasks.tasks.forEach(task => {

        /*
         assigned_by_id ---> 204
         assigned_to_id ---> null
         completed ---> false
         completed_at ---> null
         description ---> null
         due ---> null
         id ---> 402
         is_reminder ---> false
         label ---> null
         lead_id ---> 17236
         name ---> "GGG"
         */
        if (task.lead_id.toString() === this.props.lead.id.toString()) {
          rows.push(
            <LeadTasksRow
              key={task.id}
              task={task}
              users={this.props.users}
              handleToggleCompleted={this.props.handleToggleCompleted}
            />
          );
        }
      });
    }

    return (
      <ScrollView
        refreshControl={
            <RefreshControl
              refreshing={this.props.tasks.loading}
              onRefresh={this.props.handleRefresh}
            />
          }
        style={{flex: 1, padding: 12}}
      >
        <View style={{height: 12}}></View>
        {
          rows.length > 0 ? rows :
            <View>
              <Text style={{textAlign: 'center', color: colors.text_disabled, fontSize: 16, paddingTop: 48}}>
                No tasks to show
              </Text>
            </View>
        }
        <View style={{height: 150}}></View>
      </ScrollView>
    );
  }
}

LeadTasksList.propTypes = {
  tasks: React.PropTypes.object.isRequired,
  lead: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  handleRefresh: React.PropTypes.func.isRequired,
  handleToggleCompleted: React.PropTypes.func.isRequired,
};

