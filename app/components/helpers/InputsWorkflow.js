import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {colors} from '../../styles/styles';
import TextField from 'react-native-md-textinput';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalPicker from 'react-native-modal-picker'

export default class InputsWorkflow extends Component {

  constructor(props) {
    super(props);
    this.state = {show_why_lost: false};
  }

  render() {

    let workflows = [];
    let workflows_enabled = [];
    let workflows_disabled = [];
    this.props.workflows.forEach(wf => {

      let enabled = this.props.workflows_ids_used.indexOf(wf.id) === -1;

      let row =
        <TouchableWithoutFeedback style={{}} key={wf.id} onPress={() => {
          if(enabled && (wf.id.toString() !== this.props.workflow)) {
            this.props.onChangeWorkflow(wf.id.toString().trim());
            this.props.onChangeAssignTo('');
          }
        }}>
          <View style={{...this.props.style, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            {
              this.props.workflow === wf.id.toString() ?
                <Icon
                  name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-on`}
                  size={30}
                  color={enabled ? colors.brand : colors.text_disabled}
                />
                :
                <Icon
                  name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-off`}
                  size={30}
                  color={enabled ? colors.brand : colors.text_disabled}
                />
            }
            <Text style={{marginLeft: 12}}>{wf.name}</Text>
          </View>
        </TouchableWithoutFeedback>;

      if (enabled) {
        workflows_enabled.push(row);
      } else {
        workflows_disabled.push(row);
      }

    });

    workflows = workflows_enabled.concat(workflows_disabled);

    let user_id_to_user = {};
    this.props.users.forEach(user => {
      user_id_to_user[user.id] = user;
    });

    let assign_to = [];
    this.props.workflows.forEach(wf => {
      if (wf.id.toString() === this.props.workflow) {
        wf.accessible_ids.forEach(user_id => {
          if (user_id_to_user[user_id]) {
            let key = user_id;
            assign_to.push(
              <TouchableWithoutFeedback key={key} onPress={() => this.props.onChangeAssignTo(user_id.toString())}>
                <View
                  style={{...this.props.style, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  {
                    this.props.assignTo === user_id.toString() ?
                      <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-on`} size={30} color="#4F8EF7"/>
                      :
                      <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-off`} size={30}
                            color="#4F8EF7"/>
                  }
                  <Text style={{marginLeft: 12}}>{user_id_to_user[user_id].name}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }
        });
      }
    });

    let index = 0;
    const data = [
      {key: index++, section: true, label: 'Why lost?'},
      {key: index++, value: 'Lost (Chose a competitor)', label: 'Chose a competitor'},
      {key: index++, value: 'Lost (Price too high)', label: 'Price too high'},
      {key: index++, value: 'Lost (Not a right fit)', label: 'Not a right fit'},
      {key: index++, value: 'Lost (Wanted something else)', label: 'Wanted something else'},
      {key: index++, value: 'Lost (Lost interest)', label: 'Lost interest'},
      {key: index++, value: 'Lost (Other)', label: 'Other'},
    ];

    let select_stage = [];
    let select_stage_tmp = [];

    this.props.workflows.forEach(wf => {
      if (wf.id.toString() === this.props.workflow) {
        wf.stage_ids.forEach(stage_id => {

          let radio = this.props.workflowStage === stage_id.toString() ?
            <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-on`} size={30} color="#4F8EF7"/>
            :
            <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-off`} size={30} color="#4F8EF7"/>;

          select_stage_tmp[this.props.stages.stages[stage_id].sequence] =

            <View
              key={stage_id}
              style={{...this.props.style, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                if(this.props.stages.stages[stage_id].name.toLowerCase().trim() !== 'lost'){
                  this.props.onChangeStageTo(stage_id.toString());
                }
              }}
              >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {this.props.stages.stages[stage_id].name !== 'Lost' ? radio : null}
                  {
                    this.props.stages.stages[stage_id].name === 'Lost'
                      ?
                      <ModalPicker
                        ref={'modal_picker'}
                        selectStyle={{flex: 1, borderWidth: 0, padding: 0, borderRadius: 0, paddingLeft: 12}}
                        selectTextStyle={{textAlign: 'left', color: '#000'}}
                        cancelStyle={{opacity: 0}}
                        data={data}
                        initValue='Lost'
                        onChange={option => {
                          this.props.onChangeStageTo(stage_id.toString());
                          this.props.onChangeLostReason(option.label);
                        }}
                      >
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          {
                            this.props.workflowStage === stage_id.toString() ?
                              <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-on`} size={30}
                                    color="#4F8EF7"/>
                              :
                              <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-off`} size={30}
                                    color="#4F8EF7"/>
                          }
                          <Text style={{marginLeft: 12}}>
                            {this.props.stages.stages[stage_id].name}
                            {this.props.workflowStage === stage_id.toString() ?
                              <Text> ({this.props.lost_reason})</Text> : null}
                          </Text>
                        </View>
                      </ModalPicker>
                      :
                      <Text style={{marginLeft: 12}}>{this.props.stages.stages[stage_id].name}</Text>
                  }
                </View>
              </TouchableWithoutFeedback>
            </View>;
        });
      }
    });

    select_stage_tmp.forEach(item => {
      select_stage.push(item);
    });

    let optional = <Text style={{color: colors.light}}>(optional)</Text>;
    return (
      <View style={{marginTop: 24}}>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#000', marginRight: 24, opacity: .87, width: 70}}>Workflow:</Text>
          <View style={{flex: 1, alignItems: 'flex-start'}}>{workflows}</View>
        </View>

        {
          this.props.workflow ?
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
              <Text style={{color: '#000', marginRight: 24, opacity: .87, width: 70}}>Stage: {optional}</Text>
              <View style={{flex: 1, alignItems: 'flex-start'}}>{select_stage}</View>
            </View> : null
        }
        {
          this.props.workflow ?
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
              <Text style={{color: '#000', marginRight: 24, opacity: .87, width: 70}}>Assign to: {optional}</Text>
              <View style={{flex: 1, alignItems: 'flex-start'}}>{assign_to}</View>
            </View> : null
        }

        <TextField
          height={40}
          label={'Deal value (optional)'}
          highlightColor={colors.brand}
          keyboardType={'numeric'}
          value={this.props.value}
          onChangeText={value => this.props.onChangeValue(value ? value.toString().trim() : '')}
        />

      </View>
    );
  }

}

InputsWorkflow.propTypes = {
  stages: React.PropTypes.object.isRequired,
  workflows: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  workflows_ids_used: React.PropTypes.array.isRequired,

  workflow: React.PropTypes.string.isRequired,
  lost_reason: React.PropTypes.string,
  workflowStage: React.PropTypes.string.isRequired,
  assignTo: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,

  onChangeWorkflow: React.PropTypes.func.isRequired,
  onChangeAssignTo: React.PropTypes.func.isRequired,
  onChangeStageTo: React.PropTypes.func.isRequired,
  onChangeLostReason: React.PropTypes.func.isRequired,
  onChangeValue: React.PropTypes.func.isRequired,
};
