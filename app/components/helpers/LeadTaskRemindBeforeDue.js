import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  Platform,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LeadTaskRemindBeforeDue extends Component {

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={{...this.props.style, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {
            this.props.checked ?
              <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-checkbox`} size={30} color="#4F8EF7"/>
              :
              <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-square-outline`} size={30} color="#4F8EF7"/>
          }
          <Text style={{marginLeft: 12}}>Remind me before this task is due (optional)</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

LeadTaskRemindBeforeDue.propTypes = {
  style: React.PropTypes.object,
  checked: React.PropTypes.bool.isRequired,
  onPress: React.PropTypes.func.isRequired,
};