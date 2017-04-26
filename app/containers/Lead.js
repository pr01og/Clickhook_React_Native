import React, {Component} from 'react';
import LeadUi from '../components/LeadUi';
import {connect} from 'react-redux';
import {leadsChangeSingleViewTab, leadsFetch, leadsUpdateSingle} from '../actions/leadsActions';
import {notesFetch, notesCreate, notesUpdate} from '../actions/notesActions';
import {workflowsAdd, workflowsUpdate} from '../actions/workflowsActions';
import {tasksFetch, taskToggleCompleted, tasksCreate} from '../actions/tasksActions';

class Lead extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let {
      selected_lead,
      instances,
      workflows,
      notes,
      single_view_tab,
      stages,
      dispatch,
      token,
      leads_loading,
      leads_page,
      leads_search,
      search_important_only,
      filter_workflows,
      filter_tags,
      filter_sources,
      users,
      tasks,
    }  = this.props;

    return (
      <LeadUi
        lead={selected_lead}
        instances={instances}
        stages={stages}
        tasks={tasks}
        workflows={workflows}
        users={users}
        notes={notes}
        active_tab={single_view_tab}
        leads_loading={leads_loading}
        handleClickTab={tab => dispatch(leadsChangeSingleViewTab(tab))}
        handleRefreshNotes={() => dispatch(notesFetch(token, selected_lead.id))}
        handleRefreshLeads={() => dispatch(leadsFetch(token, leads_page, leads_search, search_important_only, filter_workflows, filter_tags, filter_sources))}
        handleAddWorkflow={(lead_id, deal_value, stage_id, workflow_id, lost_reason, assigned_to_id) => {
          dispatch(workflowsAdd(token, lead_id, deal_value, stage_id, workflow_id, lost_reason, assigned_to_id, leads_page, leads_search, search_important_only, filter_workflows, filter_tags, filter_sources));
        }}
        handleSaveWorkflow={(instance_id, deal_value, stage_id, workflow_id, lost_reason, assigned_to_id) => {
          dispatch(workflowsUpdate(token, instance_id, deal_value, stage_id, workflow_id, lost_reason, assigned_to_id, leads_page, leads_search, search_important_only, filter_workflows, filter_tags, filter_sources));
        }}
        handleAddNote={text => dispatch(notesCreate(token, text, selected_lead.id))}
        handleUpdateNote={(text, note_id)=> dispatch(notesUpdate(token, text, selected_lead.id, note_id))}
        handleSaveProfile={({id, name, email, phone, source, company, city, website, archived,
              state, address, zip, tags, email_hash, custom_fields}) => {
          dispatch(
            leadsUpdateSingle({
              token, id, archived, name, email, phone, source, company, city, website,
              state, address, zip, tags, email_hash, custom_fields,
              page: leads_page, search: leads_search, search_important_only, filter_workflows, filter_tags, filter_sources
            })
          );
        }}
        handleTasksRefresh={() => dispatch(tasksFetch(token, selected_lead.id))}
        handleLeadSaveEdit={() => dispatch(tasksFetch(token, selected_lead.id))}
        handleLeadSaveAdd={(name, description, assigned_to_id, label, due, is_reminder) => {
          dispatch(tasksCreate(token, name, description, selected_lead.id, this.props.active_user.id, assigned_to_id,
            label, due, is_reminder));

        }}
        handleToggleCompleted={(task_id, completed) => {
          dispatch(taskToggleCompleted(token, task_id, completed, selected_lead.id));
        }}
      />
    );
  }
}

export default connect(state => {
  let selected_lead = {};

  state.leads.leads.forEach(lead => {
    if (lead.id.toString() === state.leads.show_single.toString()) {
      selected_lead = lead;
    }
  });

  return {
    leads_loading: state.leads.loading,
    leads_page: state.leads.page,
    tasks: state.tasks,
    stages: state.stages,
    leads_search: state.leads.show_search ? state.leads.search : '',
    search_important_only: state.leads.show_search ? state.leads.search_important_only === true : false,
    filter_workflows: state.leads.show_search ? state.leads.filter_workflows : [],
    filter_tags: state.leads.show_search ? state.leads.filter_tags : [],
    filter_sources: state.leads.show_search ? state.leads.filter_sources : [],
    selected_lead,
    leads: state.leads,
    users: state.user.users,
    active_user: state.user.user,
    notes: state.notes,
    token: state.auth.token,
    instances: state.leads.instances,
    workflows: state.workflows,
    single_view_tab: state.leads.single_view_tab,
  };
})(Lead);
