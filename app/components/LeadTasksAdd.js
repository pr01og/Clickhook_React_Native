// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  View,
  RefreshControl,
  Text,
  TextInput,
  Image,
  AsyncStorage,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import {colors} from '../styles/styles';
import LeadNotesRow from './LeadNotesRow';
import Icon from 'react-native-vector-icons/Ionicons';
import TextField from 'react-native-md-textinput';
import Fab from './Fab';
import CancelSave from './helpers/CancelSave';
import DatePicker from './helpers/DatePicker';
import LeadTaskLabel from './helpers/LeadTaskLabel';
import LeadTaskAssignedTo from './helpers/LeadTaskAssignedTo';
import LeadTaskRemindBeforeDue from './helpers/LeadTaskRemindBeforeDue';

const validator = require('validator');
const moment = require('moment');
const defaultState = {
  task: '',
  due: null,
  label: null,
  assigned_to_id: null,
  notes: '',
  remind_me_before_due: false,
  show_change_due_date: false,
};

export default class LeadTasksAdd extends Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.note === false) {
      this.setState({note: nextProps.note});
    }
  }

  render() {

    const styles = this.getStyles();

    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.visible}
      >
        <View style={{flex: 1}}>
          <View style={styles.top}>
            <Text style={styles.top_text}>
              New Task
            </Text>
          </View>
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1, padding: 12}}>
              <View style={{height: 12}}></View>
              <TextField
                height={40}
                label={`What's the task?`}
                ref={'task'}
                autoFocus={true}
                highlightColor={colors.brand}
                value={this.state.task || ''}
                onChangeText={task => this.setState({task})}
              />

              {
                this.state.show_change_due_date ?
                  <DatePicker
                    date={this.state.due}
                    handleChange={date => this.setState({due: date, show_change_due_date: false})}
                  />
                  :
                  <TextField
                    height={40}
                    label={`Due (optional)`}
                    ref={'due'}
                    highlightColor={colors.brand}
                    value={this.state.due ? moment(this.state.due).format('MMM D') : ''}
                    onFocus={() => this.setState({show_change_due_date: true})}
                  />
              }

              <Text style={{fontSize: 16, color: colors.text_secondary, marginTop: 24}}>Label (optional):</Text>

              <LeadTaskLabel
                selected={this.state.label}
                onChange={label => this.setState({label})}
              />

              <Text style={{fontSize: 16, color: colors.text_secondary, marginTop: 24}}>Assigned to (optional):</Text>

              <LeadTaskAssignedTo
                users={this.props.users}
                selected={this.state.assigned_to_id}
                onChange={assigned_to_id => this.setState({assigned_to_id})}
              />

              <TextField
                height={40}
                label={`Any notes? (optional)`}
                ref={'notes'}
                highlightColor={colors.brand}
                value={this.state.notes || ''}
                onChangeText={notes => this.setState({notes})}
              />

              <View style={{height: 24}}></View>

              <LeadTaskRemindBeforeDue
                checked={this.state.remind_me_before_due}
                onPress={() => this.setState({remind_me_before_due: !this.state.remind_me_before_due})}
              />

              <View style={{height: 250}}></View>
            </ScrollView>
          </View>
          <View style={styles.bottom}>
            <CancelSave
              handleSave={() => {
                this.props.handleSave(
                  this.state.task, this.state.notes, this.state.assigned_to_id, this.state.label,
                  this.state.due, this.state.remind_me_before_due
                );
                this.setState({defaultState});
                this.props.handleCancel();
              }}
              handleCancel={() => {
                this.props.handleCancel();
                this.setState({defaultState});
              }}
              loading={false}
            />
          </View>
        </View>
      </Modal>
    );
  }

  getStyles() {
    return {
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
  }
}

LeadTasksAdd.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  users: React.PropTypes.array.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
  handleSave: React.PropTypes.func.isRequired,
};
