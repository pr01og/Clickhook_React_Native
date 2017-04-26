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
import TextField from 'react-native-md-textinput';
import CancelSave from './helpers/CancelSave';
import {Actions, ActionConst} from 'react-native-router-flux';

const validator = require('validator');

const defaultState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  street: '',
  city: '',
  state: '',
  tags: '',
  zip: '',
};

export default class LeadProfileEdit extends Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentWillReceiveProps(nextProps) {

    if (
      this.state.name !== nextProps.name
      || this.state.email !== nextProps.email
      || this.state.phone !== nextProps.phone
      || this.state.company !== nextProps.company
      || this.state.website !== nextProps.website
      || this.state.street !== nextProps.street
      || this.state.zip !== nextProps.zip
      || this.state.city !== nextProps.city
      || this.state.state !== nextProps.state
    // || this.state.tags.split(', ').join(',') !== nextProps.tags.join(',')
    ) {
      this.setState({
        name: nextProps.name,
        email: nextProps.email,
        phone: nextProps.phone,
        company: nextProps.company,
        website: nextProps.website,
        street: nextProps.street,
        city: nextProps.city,
        zip: nextProps.zip,
        state: nextProps.state,
        // tags: nextProps.tags,
      });
    }

  }

  render() {

    const styles = this.getStyles();

    let email_is_valid = this.state.email ? validator.isEmail(this.state.email) : true;

    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.visible}
      >
        <View style={{flex: 1}}>
          <View style={styles.top}>
            <Text style={styles.top_text}>
              Edit profile
            </Text>
          </View>
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1, padding: 12}}>
              <View style={{height: 12}}></View>
              <TextField
                height={40}
                label={'Name'}
                ref={'name'}
                highlightColor={colors.brand}
                value={this.state.name || ''}
                onChangeText={name => this.setState({name})}
              />
              <TextField
                height={40}
                label={'Email'}
                keyboardType={'email-address'}
                labelColor={email_is_valid === false ? colors.red : undefined}
                borderColor={email_is_valid === false ? colors.red : undefined}
                textColor={email_is_valid === false ? colors.red : undefined}
                ref={'email'}
                highlightColor={colors.brand}
                value={this.state.email || ''}
                onChangeText={email => this.setState({email})}
              />
              <TextField
                height={40}
                label={'Phone'}
                ref={'phone'}
                keyboardType={'phone-pad'}
                highlightColor={colors.brand}
                value={this.state.phone || ''}
                onChangeText={phone => this.setState({phone})}
              />
              <TextField
                height={40}
                label={'Company'}
                ref={'company'}
                highlightColor={colors.brand}
                value={this.state.company || ''}
                onChangeText={company => this.setState({company})}
              />
              <TextField
                height={40}
                label={'Website'}
                ref={'website'}
                keyboardType={'url'}
                highlightColor={colors.brand}
                value={this.state.website || ''}
                onChangeText={website => this.setState({website})}
              />
              {
                /*
                 <TextField
                 label={'Street'}
                 ref={'street'}
                 highlightColor={colors.brand}
                 value={this.state.street || ''}
                 onChangeText={street => this.setState({street})}
                 />
                 */
              }
              <TextField
                height={40}
                label={'City'}
                ref={'city'}
                highlightColor={colors.brand}
                value={this.state.city || ''}
                onChangeText={city => this.setState({city})}
              />
              <TextField
                height={40}
                label={'State'}
                ref={'state'}
                highlightColor={colors.brand}
                value={this.state.state || ''}
                onChangeText={state => this.setState({state})}
              />
              <TextField
                height={40}
                label={'Postal code'}
                ref={'zip'}
                highlightColor={colors.brand}
                value={this.state.zip || ''}
                onChangeText={zip => this.setState({zip})}
              />

              <View style={{height: 150}}></View>
            </ScrollView>
          </View>
          <View style={styles.bottom}>
            <CancelSave
              save_disabled={email_is_valid === false}
              handleSave={() => {
                if(email_is_valid === false){
                  return;
                }
                this.props.handleSave({
                  id: this.props.lead_id,
                  name: this.state.name,
                  email: this.state.email,
                  phone: this.state.phone,
                  company: this.state.company,
                  website: this.state.website,
                  address: this.state.street,
                  city: this.state.city,
                  state: this.state.state,
                  zip: this.state.zip,
                  tags: this.state.tags.split(', ').join(',').split(','),
                });
                this.setState({defaultState});
                this.props.handleCancel();
              }}
              handleCancel={() => {
                this.setState({defaultState});
                this.props.handleCancel();
              }}
              handleCustom={() => {
                this.props.handleSave({
                  id: this.props.lead_id,
                  archived: true,
                  name: this.props.name,
                  email: this.props.email,
                  phone: this.props.phone,
                  company: this.props.company,
                  website: this.props.website,
                  address: this.props.street,
                  city: this.props.city,
                  state: this.props.state,
                  zip: this.props.zip,
                  tags: this.props.tags,
                });
                this.setState({defaultState});
                Actions.leads({type: ActionConst.REPLACE});
              }}
              title_custom={'Archive'}
              button_style={{width: 100, height: 42}}
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

LeadProfileEdit.propTypes = {
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  phone: React.PropTypes.string,
  company: React.PropTypes.string,
  website: React.PropTypes.string,
  street: React.PropTypes.string,
  city: React.PropTypes.string,
  state: React.PropTypes.string,
  tags: React.PropTypes.array,
  lead_id: React.PropTypes.number.isRequired,
  visible: React.PropTypes.bool.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
  handleSave: React.PropTypes.func.isRequired,
};
