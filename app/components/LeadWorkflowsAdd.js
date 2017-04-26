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
import InputsWorkflow from './helpers/InputsWorkflow';

import {colors} from '../styles/styles';
const numeral = require('numeral');
const moment = require('moment');
import Fab from './Fab';
import CancelSave from './helpers/CancelSave';

export default class LeadWorkflowsAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {workflow: '', assignTo: '', stage: '', value: '', lost_reason: ''}
  }

  render() {

    const styles = {
      top: {
        marginBottom: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {height: 2, width: 0},
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

    let {visible, handleCancel, workflows_ids_used} = this.props;


    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={visible}
      >
        <View style={{flex: 1}}>
          <View style={styles.top}>
            <Text style={styles.top_text}>
              Add to workflow
            </Text>
          </View>
          <ScrollView style={{flex: 1, padding: 12}}>
            <View style={{height: 12}}></View>
            <InputsWorkflow
              stages={this.props.stages}
              workflows={this.props.workflows}
              workflows_ids_used={this.props.workflows_ids_used}
              users={this.props.users}
              workflow={this.state.workflow ? this.state.workflow.toString() : ''}
              lost_reason={this.state.lost_reason ? this.state.lost_reason.toString() : ''}
              assignTo={this.state.assignTo ? this.state.assignTo.toString() : ''}
              workflowStage={this.state.stage ? this.state.stage.toString() : ''}
              value={this.state.value ? this.state.value.toString() : ''}
              onChangeWorkflow={workflow => this.setState({workflow: workflow ? workflow.trim() : ''})}
              onChangeLostReason={reason => this.setState({lost_reason: reason ? reason.trim() : ''})}
              onChangeStageTo={stage => this.setState({stage: stage ? stage.trim() : ''})}
              onChangeAssignTo={assignTo => this.setState({assignTo: assignTo ? assignTo.trim() : ''})}
              onChangeValue={value => this.setState({value: value ? value.trim() : ''})}
            />
            <View style={{height: 250}}></View>
          </ScrollView>
          <View style={styles.bottom}>
            <CancelSave
              handleSave={() => {
                  this.props.handleSave(
                      this.props.lead.id,
                      this.state.value,
                      this.state.stage,
                      this.state.workflow,
                      this.state.lost_reason,
                      this.state.assignTo,
                    );
                  setTimeout(() => this.props.handleCancel(), 300);
                }}
              handleCancel={this.props.handleCancel}
              loading={false}
            />
          </View>
        </View>
      </Modal>
    );
  }
}


/*

 */

LeadWorkflowsAdd.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  lead: React.PropTypes.object.isRequired,
  workflows: React.PropTypes.array.isRequired,
  stages: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  workflows_ids_used: React.PropTypes.array.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
};
