// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  View,
  Text,
  TextInput,
  Linking,
  Image,
  RefreshControl,
  AsyncStorage,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  ScrollView
} from 'react-native';
import {colors} from '../styles/styles';
import LeadTab from './LeadTab';
import LeadProfileRow from './LeadProfileRow';
import LeadProfileEdit from './LeadProfileEdit';
import Icon from 'react-native-vector-icons/Ionicons';
import Fab from './Fab';

const validator = require('validator');

export default class LeadProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {edit_profile: false, can_call: false, can_email: false};
  }

  componentDidMount() {
    Linking.canOpenURL('tel:123').then(can_call => {
      if (this.state.can_call !== can_call) {
        this.setState({can_call});
      }
    });
    Linking.canOpenURL('mailto:hey@gmail.com').then(can_email => {
      if (this.state.can_email !== can_email) {
        this.setState({can_email});
      }
    });
  }

  handleLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        console.warn('unsupported link');
      }
    }).catch(err => console.error('#f4f3 An error occurred', err));
  }

  handleCall(phone) {
    if (phone && this.state.can_call) {
      return this.handleLink(`tel:${phone}`);
    }
  }

  handleEmail(email) {
    if (email && this.state.can_email) {
      return this.handleLink(`mailto:${email}`);
    }
  }

  render() {

    let address = [];
    if (this.props.lead.street) {
      address.push(this.props.lead.street);
    }
    if (this.props.lead.city) {
      address.push(this.props.lead.city);
    }
    if (this.props.lead.state) {
      address.push(this.props.lead.state);
    }

    let tags = this.props.lead.tags || [];
    let other_info = [];
    let custom_fields = this.props.lead.custom_fields || {};

    if (typeof custom_fields === 'object') {
      Object.keys(custom_fields).forEach(key => {
        other_info.push(`${key} ${custom_fields[key] ? custom_fields[key].toString() : custom_fields[key]}`);
      });
    }

    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{flex: 1, paddingTop: 25, paddingBottom: 12}}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.props.handleRefresh}
            />
          }
        >

          <LeadProfileRow
            onPress={() => console.log('edit name')}
            primary={'Name'}
            no_value={'No name'}
            secondary={this.props.lead.name}
          />
          <LeadProfileRow
            onPress={() => this.handleEmail(this.props.lead.email)}
            primary={'Email'}
            icon={'mail'}
            icon_disabled={this.state.can_email === false || Boolean(this.props.lead.email) === false}
            no_value={'No email'}
            secondary={this.props.lead.email}
          />
          <LeadProfileRow
            onPress={() => this.handleCall(this.props.lead.phone)}
            primary={'Phone'}
            icon={'call'}
            icon_disabled={this.state.can_call === false || Boolean(this.props.lead.phone) === false}
            no_value={'No phone'}
            secondary={this.props.lead.phone}
          />
          <LeadProfileRow
            onPress={() => console.log('edit company')}
            primary={'Company'}
            no_value={'No company'}
            secondary={this.props.lead.company}
          />
          <LeadProfileRow
            onPress={() => console.log('edit Website')}
            primary={'Website'}
            no_value={'No website'}
            secondary={this.props.lead.website}
          />
          <LeadProfileRow
            onPress={() => console.log('edit Address')}
            primary={'Address'}
            secondary={address.join(', ')}
            no_value={'No address'}
          />
          <LeadProfileRow
            onPress={() => console.log('edit Postal')}
            primary={'Postal code'}
            secondary={this.props.lead.zip}
            no_value={'No postal code'}
          />
          <LeadProfileRow
            onPress={() => console.log('edit Tags')}
            primary={'Tags'}
            no_value={'No tags'}
            secondary={tags.join(', ')}
          />
          <LeadProfileRow
            onPress={() => console.log('edit Other information')}
            primary={'Other information'}
            no_value={'No other information'}
            secondary={other_info.join('\n\n')}
          />

          <View style={{height: 200}}></View>

        </ScrollView>

        <Fab icon="edit" style={{bottom: 16}} onPress={() => this.setState({edit_profile: true})}/>


        <LeadProfileEdit
          lead_id={this.props.lead.id}
          name={this.props.lead.name}
          email={this.props.lead.email}
          phone={this.props.lead.phone}
          company={this.props.lead.company}
          website={this.props.lead.website}
          zip={this.props.lead.zip}
          street={this.props.lead.street}
          city={this.props.lead.city}
          state={this.props.lead.state}
          tags={this.props.lead.tags}
          other_information={this.props.lead.other_information}

          visible={this.state.edit_profile}
          handleCancel={() => this.setState({edit_profile: false})}
          handleSave={this.props.handleSaveProfile}
        />

      </View>
    );
  }
}

LeadProfile.propTypes = {
  lead: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  handleRefresh: React.PropTypes.func.isRequired,
  handleSaveProfile: React.PropTypes.func.isRequired,
};
