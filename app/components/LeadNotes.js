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

import LeadNotesList from './LeadNotesList';
import LeadNotesAdd from './LeadNotesAdd';
import LeadNotesEdit from './LeadNotesEdit';
import Icon from 'react-native-vector-icons/Ionicons';
import Fab from './Fab';

const validator = require('validator');

export default class LeadNotes extends Component {

  constructor(props) {
    super(props);
    this.state = {add_note: false, edit_note: false}
  }

  render() {
    let note_to_edit = '';
    if (this.state.edit_note !== false) {
      this.props.notes.notes.forEach(note => {
        if (note.id && this.state.edit_note && (note.id.toString() === this.state.edit_note.toString())) {
          note_to_edit = note.sanitized_text;
        }
      });
    }

    return (
      <View style={{flex: 1}}>
        <LeadNotesList
          notes={this.props.notes}
          handleRefresh={this.props.handleRefresh}
          handleShowEditNote={note_id => this.setState({edit_note: note_id})}
        />

        <Fab style={{bottom: 16}} onPress={() => this.setState({add_note: true})}/>

        <LeadNotesAdd
          visible={this.state.add_note !== false}
          users={this.props.users}
          handleCancel={() => this.setState({add_note: false})}
          handleSave={text => {
            this.props.handleAddNote(text);
            this.setState({add_note: false});
          }}
        />
        <LeadNotesEdit
          visible={this.state.edit_note !== false}
          users={this.props.users}
          note={note_to_edit}
          noteId={this.state.edit_note.toString()}
          handleCancel={() => this.setState({edit_note: false})}
          handleSave={(text, note_id) => {
            this.props.handleUpdateNote(text, note_id);
            setTimeout(() => this.setState({edit_note: false}), 300);
          }}
        />


      </View>
    );
  }
}

LeadNotes.propTypes = {
  notes: React.PropTypes.object.isRequired,
  users: React.PropTypes.array.isRequired,
  handleRefresh: React.PropTypes.func.isRequired,
  handleAddNote: React.PropTypes.func.isRequired,
  handleUpdateNote: React.PropTypes.func.isRequired,
};
