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
import LeadTab from './LeadTab';
import LeadProfile from './LeadProfile';
import LeadWorkflows from './LeadWorkflows';
import LeadNotes from './LeadNotes';
import LeadTasks from './LeadTasks';

export default class LeadUi extends Component {

  render() {

    let content = null;
    switch (this.props.active_tab) {
      case 'profile':
        content =
          <LeadProfile
            lead={this.props.lead}
            loading={this.props.leads_loading}
            handleRefresh={this.props.handleRefreshLeads}
            handleSaveProfile={this.props.handleSaveProfile}
          />;
        break;
      case 'workflows':
        content =
          <LeadWorkflows
            lead={this.props.lead}
            stages={this.props.stages}
            instances={this.props.instances}
            workflows={this.props.workflows}
            users={this.props.users}
            loading={this.props.leads_loading}
            handleRefresh={this.props.handleRefreshLeads}
            handleAddWorkflow={this.props.handleAddWorkflow}
            handleSaveWorkflow={this.props.handleSaveWorkflow}
          />;
        break;
      case 'notes':
        content =
          <LeadNotes
            lead={this.props.lead}
            users={this.props.users}
            notes={this.props.notes}
            handleRefresh={this.props.handleRefreshNotes}
            handleAddNote={this.props.handleAddNote}
            handleUpdateNote={this.props.handleUpdateNote}
          />;
        break;
      case 'tasks':
        content =
          <LeadTasks
            users={this.props.users}
            lead={this.props.lead}
            tasks={this.props.tasks}
            handleSaveEdit={this.props.handleLeadSaveEdit}
            handleSaveAdd={this.props.handleLeadSaveAdd}
            handleRefresh={this.props.handleTasksRefresh}
            handleToggleCompleted={this.props.handleToggleCompleted}
          />;
        break;
    }

    return (
      <View style={{flex: 1}}>
        <View style={{height: 80}}></View>
        {content}
        <View style={{height: 56, flexDirection: 'row', elevation: 5,
        backgroundColor: colors.background,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset: {
          height: 1,
          width: 0
        }}}>
          <View style={{flexDirection:'row', flex: 1, justifyContent: 'space-around'}}>
            <LeadTab
              active={this.props.active_tab === 'profile'}
              onPress={() => this.props.handleClickTab('profile')}
              title={'Profile'}
            />
            <LeadTab
              active={this.props.active_tab === 'workflows'}
              onPress={() => this.props.handleClickTab('workflows')}
              title={'Workflows'}
            />
            <LeadTab
              active={this.props.active_tab === 'notes'}
              onPress={() => this.props.handleClickTab('notes')}
              title={'Notes'}
            />
            <LeadTab
              active={this.props.active_tab === 'tasks'}
              onPress={() => this.props.handleClickTab('tasks')}
              title={'Tasks'}
            />
          </View>
        </View>
      </View>
    );
  }
}

LeadUi.propTypes = {
  lead: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.object.isRequired,
  instances: React.PropTypes.array.isRequired,
  workflows: React.PropTypes.object.isRequired,
  stages: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  notes: React.PropTypes.object.isRequired,
  leads_loading: React.PropTypes.bool.isRequired,
  active_tab: React.PropTypes.string.isRequired,
  handleClickTab: React.PropTypes.func.isRequired,
  handleRefreshNotes: React.PropTypes.func.isRequired,
  handleRefreshLeads: React.PropTypes.func.isRequired,
  handleAddWorkflow: React.PropTypes.func.isRequired,
  handleSaveWorkflow: React.PropTypes.func.isRequired,
  handleAddNote: React.PropTypes.func.isRequired,
  handleUpdateNote: React.PropTypes.func.isRequired,
  handleSaveProfile: React.PropTypes.func.isRequired,
  handleTasksRefresh: React.PropTypes.func.isRequired,
  handleToggleCompleted: React.PropTypes.func.isRequired,
  handleLeadSaveEdit: React.PropTypes.func.isRequired,
  handleLeadSaveAdd: React.PropTypes.func.isRequired,
};
