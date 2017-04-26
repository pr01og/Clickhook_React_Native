// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {leadsCreate} from './../actions/leadsActions';
import LeadsAddUi from './../components/LeadsAddUi';
import {Actions, ActionConst} from 'react-native-router-flux';
import {View} from 'react-native';

class LeadsAdd extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <LeadsAddUi
          workflows={this.props.workflows}
          users={this.props.users}
          create_loading={this.props.create_loading}
          create_error_message={this.props.create_error_message}
          handleCancel={() => Actions.leads({type: ActionConst.BACK})}
          handleSave={(name: string, email: string, phone: string, company: string) => {
            this.props.dispatch(leadsCreate(
              this.props.token,
              name,
              email,
              phone,
              company,
              this.props.leads.page,
              this.props.leads.search,
              this.props.leads.search_important_only,
              this.props.leads.filter_workflows,
              this.props.leads.filter_tags,
              this.props.leads.filter_sources,
              ));
          }}
        />
      </View>
    );
  }
}

export default connect(state => {
  return {
    workflows: state.workflows.workflows,
    users: state.user.users,
    create_loading: state.leads.create_loading || false,
    create_error_message: state.leads.create_error_message || '',
    token: state.auth.token,
    leads: state.leads,
  };
})(LeadsAdd);
