// @flow

import React, {Component} from 'react';
import LeadsUi from '../components/LeadsUi';
import {connect} from 'react-redux';
import {
  leadsCreate,
  leadsFetch,
  leadsUpdateSingle,
  leadsHideSearch,
  leadsShowSingle,
} from './../actions/leadsActions';
import {Actions, ActionConst} from 'react-native-router-flux';

class Leads extends Component {
  render() {
    return (
      <LeadsUi
        loading={this.props.is_loading}
        create_loading={this.props.leads.create_loading}
        create_error_message={this.props.leads.create_error_message || ''}
        loading_error={this.props.leads.error !== ''}
        leads={this.props.leads.leads}
        workflows={this.props.workflows}
        user={this.props.user}
        users={this.props.users}
        instances={this.props.leads.instances}
        total={this.props.leads.meta.total_count || -1}
        page={this.props.page}
        search_important_only={this.props.leads.search_important_only}
        filter_workflows={this.props.leads.filter_workflows}
        filter_tags={this.props.leads.filter_tags}
        filter_sources={this.props.leads.filter_sources}
        search={this.props.leads.search}
        show_search={this.props.leads.show_search}
        handleHideSearch={() => {
          this.props.dispatch(leadsHideSearch());
          Actions.leads({type: ActionConst.REPLACE});
          this.props.dispatch(leadsFetch(this.props.token, 1, '', false, [], [], []));
        }}
        handleChangeSearch={(search, important_only, filter_workflows, filter_tags, filter_sources) => {
          this.props.dispatch(leadsFetch(this.props.token, 1, search, important_only, filter_workflows, filter_tags, filter_sources));
        }}
        handleRefresh={() => {
          this.props.dispatch(leadsHideSearch());
          Actions.leads({type: ActionConst.REPLACE});
          this.props.dispatch(leadsFetch(this.props.token, this.props.page, '', false));
        }}
        handleShowSingleLead={(lead_id, title) => {
          this.props.dispatch(leadsShowSingle(this.props.token, lead_id.toString(), title));
          Actions.lead({type: ActionConst.PUSH});
        }}
        onUpdateFavorited={(lead_id, favorited) => {
          this.props.dispatch(leadsUpdateSingle({
            token: this.props.token,
            id: lead_id.toString(),
            favorited,
            page:this.props.page,
            search:this.props.search
          }));
        }}
        handleClickAdd={() => {
          Actions.leadsAdd({type: ActionConst.PUSH});
        }}
        handleClickNextPage={() => {
          this.props.dispatch(leadsFetch(this.props.token, this.props.page + 1, this.props.search, this.props.search_important_only,this.props.filter_workflows,this.props.filter_tags,this.props.filter_sources));
        }}
        handleClickPreviousPage={() => {
          this.props.dispatch(leadsFetch(this.props.token, this.props.page - 1, this.props.search, this.props.search_important_only,this.props.filter_workflows,this.props.filter_tags,this.props.filter_sources));
        }}
      />
    );
  }
}

export default connect(state => {
  let is_loading = state.leads.loading || state.workflows.loading;

  return {
    is_loading,
    token: state.auth.token,
    search: state.leads.search || '',
    search_important_only: state.leads.search_important_only === true,
    filter_workflows: state.leads.filter_workflows || [],
    filter_tags: state.leads.filter_tags || [],
    filter_sources: state.leads.filter_sources || [],
    page: state.leads.page || -1,
    leads: state.leads,
    workflows: state.workflows.workflows,
    user: state.user,
    users: state.user.users,
  };
})(Leads);
