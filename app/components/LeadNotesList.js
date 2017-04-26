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

export default class LeadNotesList extends Component {

  render() {
    let rows = [];
    let notes = this.props.notes.notes || [];

    notes.forEach(note => {
      rows.push(<LeadNotesRow key={note.id} note={note} handlePress={this.props.handleShowEditNote}/>);
    });

    return (
      <ScrollView
        style={{flex: 1, padding: 12}}
        refreshControl={
            <RefreshControl
              refreshing={this.props.notes.loading}
              onRefresh={this.props.handleRefresh}
            />
          }
      >
        <View style={{height: 12}}></View>

        {
          rows.length > 0 ? rows :
            <Text style={{textAlign: 'center', color: colors.text_disabled, fontSize: 16, paddingTop: 48}}>
              No notes to show
            </Text>
        }
        <View style={{height: 150}}></View>
      </ScrollView>
    );
  }
}

LeadNotesList.propTypes = {
  notes: React.PropTypes.object.isRequired,
  handleRefresh: React.PropTypes.func.isRequired,
  handleShowEditNote: React.PropTypes.func.isRequired,
};
