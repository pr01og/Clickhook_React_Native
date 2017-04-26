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

const validator = require('validator');

export default class LeadTasksEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {note: false}
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.note === false) {
      this.setState({note: nextProps.note});
    }
  }

  render() {

    const styles = {
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

    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.visible}
      >
        <View style={{flex: 1}}>
          <View style={styles.top}>
            <Text style={styles.top_text}>
              Edit Task
            </Text>
          </View>
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1, padding: 12}}>
              <View style={{height: 12}}></View>
              <Text>Edit task form goes here</Text>
            </ScrollView>
          </View>
          <View style={styles.bottom}>
            <CancelSave
              handleSave={() => {
                this.props.handleSave();
                this.setState({note: false});
              }}
              handleCancel={() => {
                this.props.handleCancel();
                this.setState({note: false});
              }}
              loading={false}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

LeadTasksEdit.propTypes = {
  users: React.PropTypes.array.isRequired,
  visible: React.PropTypes.bool.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
  handleSave: React.PropTypes.func.isRequired,
};
