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
import LeadWorkflowsRow from './LeadWorkflowsRow';


export default class LeadWorkflowsList extends Component {

  render() {

    let {instance_ids, instaces_id_2_obj, lead, loading, handleRefresh, workflows, stages} = this.props;

    let rows = [];
    instance_ids.forEach((instance_id, n) => {
      rows.push(
        <LeadWorkflowsRow
          key={n}
          instance_id={instance_id.toString()}
          workflows={workflows}
          stages={stages}
          workflow_id={instaces_id_2_obj[instance_id].workflow_id.toString()}
          workflow_name={lead.instance_assigned_to[n].workflow_name || '-'}
          stage={instaces_id_2_obj[instance_id].stage_name || '-'}
          lost_reason={instaces_id_2_obj[instance_id].lost_reason || ''}
          deal_value={instaces_id_2_obj[instance_id].deal_value.toString() || '-'}
          assigned_to={instaces_id_2_obj[instance_id].assigned_to_name || '-'}
          created_at={new Date(instaces_id_2_obj[instance_id].created_at)}
          handleSaveWorkflow={this.props.handleSaveWorkflow}
          onPressEdit={this.props.onPressItem}
          onPressHistory={() => {}}
        />
      );
    });

    return (
      <ScrollView
        style={{flex: 1, padding: 12, paddingLeft: 0}}
        refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
            />
          }
      >
        <View style={{height: 12}}></View>
        {
          rows.length > 0 ? rows :
            <View>
              <Text style={{textAlign: 'center', color: colors.text_disabled, fontSize: 16, paddingTop: 48}}>
                No workflows to show
              </Text>
            </View>
        }
      </ScrollView>
    );
  }
}


/*

 */

LeadWorkflowsList.propTypes = {
  instance_ids: React.PropTypes.array.isRequired,
  workflows: React.PropTypes.array.isRequired,
  instaces_id_2_obj: React.PropTypes.object.isRequired,
  lead: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  handleRefresh: React.PropTypes.func.isRequired,
  handleAddWorkflow: React.PropTypes.func.isRequired,
  onPressItem: React.PropTypes.func.isRequired,
  handleSaveWorkflow: React.PropTypes.func.isRequired,
};
