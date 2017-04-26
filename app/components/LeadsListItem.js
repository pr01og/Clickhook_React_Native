import React, {Component} from 'react';
const moment = require('moment');
import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  View,
  Text,
  ListView,
  TextInput,
  Image,
  AsyncStorage,
  RecyclerViewBackedScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LeadsListItem extends Component {

  render() {
    let lead = this.props.lead;

    if (!lead.id) {
      return null;
    }

    let first_line = null;
    let second_line = null;
    let title = '';

    if (lead.name) {
      first_line =
        <Text style={{fontSize: 16, paddingTop: 8, color: '#000', opacity: .9}}>
          {lead.name}
          {lead.company ? <Text>, {lead.company}</Text> : null}
        </Text>;
      title = `${lead.name} ${lead.company ? ` ${lead.company}` : ''}`
    } else if (lead.company) {
      first_line =
        <Text style={{fontSize: 16, paddingTop: 8, color: '#000', opacity: .9}}>
          {lead.company}
        </Text>;
      title = lead.company;
    }

    if (lead.email) {
      if (first_line === null) {
        first_line =
          <Text style={{fontSize: 16, paddingTop: 8, color: '#000', opacity: .9}}>
            {lead.email}
            {lead.phone ? <Text>, {lead.phone}</Text> : null}
          </Text>;
        title = `${lead.email} ${lead.phone ? ` ${lead.phone}` : ''}`
      } else {
        second_line =
          <Text style={{fontSize: 14, paddingTop: 4, color: '#000', opacity: .65}}>
            {lead.email}
            {lead.phone ? <Text>, {lead.phone}</Text> : null}
          </Text>;
      }
    } else {
      if (first_line === null) {
        first_line =
          <Text style={{fontSize: 16, paddingTop: 8, color: '#000', opacity: .9}}>
            {lead.phone}
          </Text>;
        title = lead.phone;
      } else {
        second_line =
          <Text style={{fontSize: 14, paddingTop: 4, color: '#000', opacity: .65}}>
            {lead.phone}
          </Text>;
      }
    }

    let date_row = lead.created_at ?
      <Text style={{paddingTop: 10, fontSize: 11, textAlign: 'right', flex: 1, opacity: 0.65}}>
        {moment(lead.created_at).format('ddd, MMM D')}
      </Text> : null;

    const style = {
      flex: 1,
      marginLeft: 16,
      marginRight: 16,
      paddingTop: 20,
      paddingBottom: 20,
      height: Platform.OS === 'ios' ? 80 : 95
    };
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableWithoutFeedback onPress={() => {
          this.props.onUpdateFavorited(lead.id, !lead.favorited)
        }}>
          <View
            style={{width: 28, height: 28, justifyContent: 'center', marginLeft: 12, marginTop: 12 }}>
            {
              lead.favorited ?
                <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-star`} size={28} color={'#FFEB3B'}/>
                :
                <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-star-outline`} size={28} color={'#9E9E9E'}/>
            }
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          this.props.onPress(lead.id, title);
        }}>
          <View style={style}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{maxWidth: 280}}>{first_line}</View>
              {date_row}
            </View>
            <View style={{maxWidth: 330}}>{second_line}</View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

LeadsListItem.propTypes = {
  lead: React.PropTypes.object.isRequired,
  onPress: React.PropTypes.func.isRequired,
  onUpdateFavorited: React.PropTypes.func.isRequired,
};
