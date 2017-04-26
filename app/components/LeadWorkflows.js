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
  ScrollView
} from 'react-native';

import {colors} from '../styles/styles';
const numeral = require('numeral');
const moment = require('moment');
import Fab from './Fab';

import LeadWorkflowsList from './LeadWorkflowsList';
import LeadWorkflowsAdd from './LeadWorkflowsAdd';
import LeadWorkflowsEdit from './LeadWorkflowsEdit';


export default class LeadWorkflows extends Component {

  constructor(props) {
    super(props);
    this.state = {add_workflow: false, edit_workflow: false}
  }

  render() {

    let instaces_id_2_obj = {};
    this.props.instances.forEach(instance => {
      instaces_id_2_obj[instance.id] = instance;
    });

    let workflows_ids_used = [];
    let instance_ids = this.props.lead.instance_ids || [];
    instance_ids.forEach((instance_id, n) => {
      workflows_ids_used.push(instaces_id_2_obj[instance_id].workflow_id);
    });


    return (
      <View style={{flex: 1}}>
        <LeadWorkflowsList
          instaces_id_2_obj={instaces_id_2_obj}
          instance_ids={instance_ids}
          stages={this.props.stages}
          workflows={this.props.workflows.workflows}
          lead={this.props.lead}
          loading={this.props.loading}
          handleRefresh={this.props.handleRefresh}
          handleAddWorkflow={this.props.handleAddWorkflow}
          handleSaveWorkflow={this.props.handleSaveWorkflow}
          onPressItem={id => this.setState({edit_workflow: id})}
        />
        <Fab style={{bottom: 16}} onPress={() => this.setState({add_workflow: true})}/>
        <LeadWorkflowsAdd
          workflows_ids_used={workflows_ids_used}
          lead={this.props.lead || {}}
          visible={this.state.add_workflow}
          workflows={this.props.workflows.workflows}
          stages={this.props.stages}
          users={this.props.users}
          handleCancel={() => this.setState({add_workflow: false})}
          handleSave={this.props.handleAddWorkflow}
        />
        <LeadWorkflowsEdit
          workflows_ids_used={workflows_ids_used}
          visible={this.state.edit_workflow !== false}
          handleCancel={() => this.setState({edit_workflow: false})}
          handleSave={this.props.handleSaveWorkflow}
          instanceId={this.state.edit_workflow}
          instance={this.state.edit_workflow ? instaces_id_2_obj[this.state.edit_workflow] : null}
          stages={this.props.stages}
          workflows={this.props.workflows.workflows}
          users={this.props.users}
        />
      </View>
    );
  }
}

LeadWorkflows.propTypes = {
  lead: React.PropTypes.object.isRequired,
  stages: React.PropTypes.object.isRequired,
  instances: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  workflows: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  handleRefresh: React.PropTypes.func.isRequired,
  handleSaveWorkflow: React.PropTypes.func.isRequired,
  handleAddWorkflow: React.PropTypes.func.isRequired,
};
