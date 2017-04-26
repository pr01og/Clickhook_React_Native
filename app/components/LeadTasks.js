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
  Modal,
  ScrollView
} from 'react-native';
import {colors} from '../styles/styles';
import Fab from './Fab';
import LeadTasksList from './LeadTasksList';
import LeadTasksEdit from './LeadTasksEdit';
import LeadTasksAdd from './LeadTasksAdd';
const validator = require('validator');
export default class LeadTasks extends Component {

  constructor(props) {
    super(props);
    this.state = {add_task: false, edit_task: false};
  }

  render() {

    return (
      <View style={{flex: 1}}>
        <LeadTasksList
          lead={this.props.lead || {}}
          tasks={this.props.tasks || {}}
          users={this.props.users || {}}
          handleRefresh={this.props.handleRefresh}
          handleToggleCompleted={this.props.handleToggleCompleted}
        />
        <Fab style={{bottom: 16}} onPress={() => this.setState({add_task: true})}/>
        <LeadTasksEdit
          users={this.props.users}
          visible={this.state.edit_task}
          handleCancel={() => this.setState({edit_task: false})}
          handleSave={this.props.handleSaveEdit}
        />
        <LeadTasksAdd
          users={this.props.users}
          visible={this.state.add_task}
          handleCancel={() => this.setState({add_task: false})}
          handleSave={this.props.handleSaveAdd}
        />
      </View>
    );

  }
}

LeadTasks.propTypes = {
  lead: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  handleSaveEdit: React.PropTypes.func.isRequired,
  handleSaveAdd: React.PropTypes.func.isRequired,
  handleRefresh: React.PropTypes.func.isRequired,
  handleToggleCompleted: React.PropTypes.func.isRequired,
};
