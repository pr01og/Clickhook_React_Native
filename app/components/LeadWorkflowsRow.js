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
const numeral = require('numeral');
const moment = require('moment');

export default class LeadWorkflowsRow extends Component {
  render() {
    let
      {
        deal_value,
        workflow_name,
        stage,
        lost_reason,
        assigned_to,
        created_at,
      }
        = this.props;

    if (parseInt(deal_value, 10) > 0) {
      deal_value = `$${numeral(deal_value).format('0,0')}`;
    } else {
      deal_value = '-'
    }

    let stages = [];

    this.props.workflows.forEach(wf => {
      if (wf.id.toString() === this.props.workflow_id) {
        wf.stage_ids.forEach(stage_id => {
          stages.push(stage_id);
        });
      }
    });

    let current_stage = null;
    Object.keys(this.props.stages.stages).forEach(stage_id => {
      if (
        this.props.stages.stages[stage_id].workflow_id.toString() === this.props.workflow_id.toString()
        && this.props.stages.stages[stage_id].name.toLowerCase().trim() === this.props.stage.toLowerCase().trim()
      ) {
        current_stage = parseInt(stage_id, 10);
      }
    });

    let next_stage = stages.indexOf(current_stage) + 1;
    if (stages.length > next_stage) {
      next_stage = stages[next_stage];
    } else {
      next_stage = null; // end of stages cycle
    }
    // console.warn('#ksjfk next_stage; ', next_stage);

    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableWithoutFeedback onPress={() => this.props.onPressEdit(this.props.instance_id)}>
          <View>
            <Icon
              name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-create`}
              style={{paddingTop: 16, paddingBottom: 16, paddingRight: 16, paddingLeft: 16}}
              size={29}
              color={colors.text_icon}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={{paddingBottom: 24, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: colors.text_primary, fontSize: 16}}>{workflow_name}</Text>
            <Text style={{color: colors.text_secondary, fontSize: 14}}>
              Deal value: {deal_value}
            </Text>
            <Text style={{color: colors.text_secondary, fontSize: 12}}>
              Assigned to {assigned_to}
            </Text>
            <Text style={{color: colors.text_secondary, fontSize: 12}}>
              Added {moment(created_at).format('D, MMM YYYY')}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              if(next_stage){
                this.props.handleSaveWorkflow(
                  this.props.instance_id,
                  this.props.deal_value,
                  next_stage,
                  this.props.workflow_id,
                  this.props.lost_reason,
                  this.props.assigned_to,
                )
              }
            }}
          >
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 12}}>Stage: {stage}</Text>
              {stage === 'Lost' ? <Text style={{fontSize: 12}}>{lost_reason}</Text> : null}
              {
                next_stage !== null ?
                  <Text
                    style={{color: colors.text_disabled, fontSize: 12, marginTop: 2}}>Click to proceed</Text>
                  : null
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

LeadWorkflowsRow.propTypes = {
  instance_id: React.PropTypes.string.isRequired,
  workflow_id: React.PropTypes.string.isRequired,
  workflow_name: React.PropTypes.string.isRequired,
  stage: React.PropTypes.string.isRequired,
  lost_reason: React.PropTypes.string,
  deal_value: React.PropTypes.string.isRequired,
  assigned_to: React.PropTypes.string.isRequired,
  created_at: React.PropTypes.instanceOf(Date).isRequired,
  stages: React.PropTypes.array.isRequired,
  workflows: React.PropTypes.array.isRequired,
  onPressEdit: React.PropTypes.func.isRequired,
  onPressHistory: React.PropTypes.func.isRequired,
};