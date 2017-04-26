import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Picker,
} from 'react-native';
import LeadsAddWorkflowCheckbox from './LeadsAddWorkflowCheckbox';
import LeadsAddInputsMain from './LeadsAddInputsMain';
import InputsWorkflow from './helpers/InputsWorkflow';
import CancelSave from './helpers/CancelSave';
import {colors} from './../styles/styles';
const validator = require('validator');

export default class LeadsAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      company: '',
      phone: '',
      add_to_workflow: false,
      workflow: '',
      stage: '',
      assign_to: '',
      deal_value: '',
      error: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.create_loading === true && nextProps.create_loading === false) {
      if (nextProps.create_error_message !== '') {
        this.setState({error: nextProps.create_error_message});
      } else {
        this.props.handleCancel();
      }
    }
  }

  handleSave() {

    if (this.props.create_loading) {
      return;
    }
    let error = '';
    if (this.state.email === '' && this.state.phone === '') {
      error = 'Enter email or phone';
    } else if (this.state.email !== '' && !validator.isEmail(this.state.email)) {
      error = 'Incorrect email';
    } else if (this.state.add_to_workflow === true && this.state.workflow === '') {
      error = 'Select workflow';
    }

    if (error !== '') {
      this.setState({error});
    } else {
      this.props.handleSave(
        this.state.name,
        this.state.email,
        this.state.phone,
        this.state.company,
        this.state.add_to_workflow,
        this.state.workflow,
        this.state.stage,
        this.state.assign_to,
        this.state.deal_value
      );
    }

  }

  render() {

    return (
      <ScrollView
        style={{padding: 16, paddingTop: 86, flexDirection: 'column', flex: 1,
        elevation: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {
          height: -1,
          width: 0
        }}}
        automaticallyAdjustContentInsets={false}
      >
        <LeadsAddInputsMain
          email={this.state.email}
          name={this.state.name}
          company={this.state.company}
          phone={this.state.phone}
          onChangeEmail={email => this.setState({email})}
          onChangeName={name => this.setState({name})}
          onChangeCompany={company => this.setState({company})}
          onChangePhone={phone => this.setState({phone})}
        />
        {
          /*
           <LeadsAddWorkflowCheckbox
           style={{margin: 12, marginTop: 24, marginBottom: 0}}
           checked={this.state.add_to_workflow}
           onPress={() => this.setState({
           add_to_workflow: !this.state.add_to_workflow,
           workflow: '',
           assignTo: '',
           value: '',
           })}
           />

           {
           this.state.add_to_workflow ?
           <InputsWorkflow
           workflows={this.props.workflows}
           stages={this.props.stages}
           users={this.props.users}
           workflow={this.state.workflow ? this.state.workflow.toString() : ''}
           assignTo={this.state.assignTo ? this.state.assignTo.toString() : ''}
           value={this.state.value ? this.state.value.toString() : ''}
           workflowStage={this.state.stage ? this.state.stage.toString() : ''}
           onChangeStageTo={stage => this.setState({stage: stage ? stage.trim() : ''})}
           onChangeWorkflow={workflow => this.setState({workflow: workflow ? workflow.trim() : ''})}
           onChangeAssignTo={assignTo => this.setState({assignTo: assignTo ? assignTo.trim() : ''})}
           onChangeValue={value => this.setState({value: value ? value.trim() : ''})}
           />
           : null

           }
           */
        }

        {
          this.state.error ?
            <View style={{marginTop: 24}}>
              <Text style={{textAlign: 'center', color: colors.red}}>{this.state.error}</Text>
            </View> : null
        }

        <CancelSave
          handleSave={this.handleSave.bind(this)}
          handleCancel={this.props.handleCancel}
          loading={this.props.create_loading}
          title_save={'Add Lead'}
        />


        <View style={{height: 300}}></View>
      </ScrollView>
    );

  }

}

LeadsAdd.propTypes = {
  // workflows: React.PropTypes.array.isRequired,
  // stages: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  create_loading: React.PropTypes.bool.isRequired,
  create_error_message: React.PropTypes.string.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
  handleSave: React.PropTypes.func.isRequired,
};
