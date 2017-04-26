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
import CancelSave from './helpers/CancelSave';
import InputsWorkflow from './helpers/InputsWorkflow';

export default class LeadWorkflowsEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workflow: props.instance ? props.instance.workflow_id : '',
      stage: props.instance ? props.instance.stage_id : '',
      lost_reason: props.instance ? props.instance.lost_reason : '',
      assignTo: props.instance ? props.instance.assigned_to_id : '',
      value: props.instance ? props.instance.deal_value : '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      workflow: nextProps.instance ? nextProps.instance.workflow_id : '',
      assignTo: nextProps.instance ? nextProps.instance.assigned_to_id : '',
      stage: nextProps.instance ? nextProps.instance.stage_id : '',
      lost_reason: nextProps.instance ? nextProps.instance.lost_reason : '',
      value: nextProps.instance ? nextProps.instance.deal_value : '',
    });
  }

  render() {

    const styles = {
      top: {
        marginBottom: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {height: 0, width: 0},
      },
      bottom: {
        marginTop: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {height: 0, width: 0},
      },
      top_text: {
        textAlign: 'center',
        fontSize: 24,
        height: 92,
        padding: 32,
      },
      btn: {
        backgroundColor: this.props.create_loading ? colors.light : colors.brand,
        borderRadius: 3,
        margin: 24,
        width: 120,
      },
      btn_text: {
        flex: 1,
        color: '#fff',
        padding: 12,
        fontSize: 16,
        textAlign: 'center'
      }
    };

    let {visible, handleCancel, workflows, users, stages, workflows_ids_used, lost_reason} = this.props;

    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={visible}
      >
        <View style={{flex: 1}}>
          <View style={styles.top}>
            <Text style={styles.top_text}>
              Edit workflow
            </Text>
          </View>
          <ScrollView style={{flex: 1, padding: 12}}>
            <View style={{height: 12}}></View>
            <InputsWorkflow
              stages={stages}
              workflows={workflows}
              workflows_ids_used={workflows_ids_used}
              users={users}
              workflow={this.state.workflow ? this.state.workflow.toString() : ''}
              lost_reason={this.state.lost_reason ? this.state.lost_reason.toString() : ''}
              workflowStage={this.state.stage ? this.state.stage.toString() : ''}
              assignTo={this.state.assignTo ? this.state.assignTo.toString() : ''}
              value={this.state.value ? this.state.value.toString() : ''}
              onChangeStageTo={stage => this.setState({stage: stage ? stage.trim() : ''})}
              onChangeLostReason={reason => this.setState({lost_reason: reason ? reason.trim() : ''})}
              onChangeWorkflow={workflow => this.setState({workflow: workflow ? workflow.trim() : ''})}
              onChangeAssignTo={assignTo => this.setState({assignTo: assignTo ? assignTo.trim() : ''})}
              onChangeValue={value => this.setState({value: value ? value.trim() : ''})}
            />
            <View style={{height: 250}}></View>
          </ScrollView>
          <View style={styles.bottom}>
            <CancelSave
              handleSave={() => {
                this.props.handleSave(
                  this.props.instanceId,
                  this.state.value,
                  this.state.stage,
                  this.state.workflow,
                  this.state.lost_reason,
                  this.state.assignTo,
                  );
                setTimeout(() => this.props.handleCancel(), 300);
              }}
              handleCancel={handleCancel}
              loading={false}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

LeadWorkflowsEdit.propTypes = {
  instanceId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]).isRequired,
  stages: React.PropTypes.object.isRequired,
  workflows: React.PropTypes.array.isRequired,
  workflows_ids_used: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  instance: React.PropTypes.object,
  visible: React.PropTypes.bool.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
  handleSave: React.PropTypes.func.isRequired,
};
