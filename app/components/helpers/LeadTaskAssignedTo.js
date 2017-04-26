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

export default class LeadTaskAssignedTo extends Component {

  render() {

    let rows = [];

    this.props.users.forEach(user => {

      rows.push(
        <TouchableWithoutFeedback key={user.id} onPress={() => {
          if(this.props.selected !== user.id){
            this.props.onChange(user.id);
          }
        }}>
          <View style={{...this.props.style, flexDirection: 'row', alignItems: 'flex-start', height: 42, width: 120}}>
            {
              this.props.selected === user.id ?
                <Icon
                  name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-on`}
                  size={30}
                  color={colors.brand}
                />
                :
                <Icon
                  name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-off`}
                  size={30}
                  color={colors.brand}
                />
            }
            <Text style={{marginLeft: 12, marginTop: 3, fontSize: 16, color: colors.text_primary}}>{user.username}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return (
      <View style={{marginTop: 24, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center'}}>
        {rows}
      </View>
    );
  }

}

LeadTaskAssignedTo.propTypes = {
  users: React.PropTypes.array,
  selected: React.PropTypes.number,
  onChange: React.PropTypes.func.isRequired,
};
