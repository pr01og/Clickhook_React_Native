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

export default class LeadTaskLabel extends Component {

  render() {


    let labels = ['urgent', 'meeting', 'call', 'follow up'];

    let rows = [];

    labels.forEach(label => {
      let color = null;
      switch (label) {
        case 'urgent':
          color = colors.red;
          break;
        case 'meeting':
          color = colors.orange;
          break;
        case 'call':
          color = colors.green;
          break;
        case 'follow up':
          color = colors.blue;
          break;
      }

      rows.push(
        <TouchableWithoutFeedback key={label} onPress={() => {
          if(this.props.selected !== label){
            this.props.onChange(label);
          }
        }}>
          <View style={{...this.props.style, flexDirection: 'row', alignItems: 'flex-start', height: 42, width: 120}}>
            {
              this.props.selected === label ?
                <Icon
                  name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-on`}
                  size={30}
                  color={color}
                />
                :
                <Icon
                  name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-radio-button-off`}
                  size={30}
                  color={color}
                />
            }
            <Text style={{marginLeft: 12, marginTop: 3, fontSize: 16, color}}>{label}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return (
      <View style={{marginTop: 24, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {rows}
      </View>
    );
  }

}

LeadTaskLabel.propTypes = {
  selected: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
};
