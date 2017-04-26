import React, {Component} from 'react';
const moment = require('moment');
import {
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from './../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Fab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }

  render() {

    let icon = <Text style={{ color: '#fff', fontSize: 30, fontWeight: '300', marginTop:6}}>+</Text>;

    switch (this.props.icon) {
      case 'edit':
        icon =
          <Icon
            name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-create`}
            style={{marginLeft: 5, marginTop: 12}}
            size={29}
            color={'#fff'}
          />;
        break;
    }

    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.setState({pressed: true})}
        onPressOut={() => this.setState({pressed: false})}
        onPress={e => this.props.onPress(e)}
      >
        <View
          style={{
              borderRadius: 56,
              flexDirection: 'column-reverse',
              position: 'absolute',
              right: 16,
              bottom: 65,
              elevation: this.state.pressed ? 5 : 10,
              shadowColor: "#000000",
              shadowOpacity: 0.4,
              shadowRadius: 5,
              shadowOffset: {
                height: this.state.pressed ? 2 : 5,
                width: 0
              },
              ...this.props.style
            }}
        >
          <View style={{
              backgroundColor: colors.brand,
              width: 56,
              height: 56,
              borderRadius: 56,
              alignItems: 'center',
            }}
          >
            {icon}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Fab.propTypes = {
  style: React.PropTypes.object,
  icon: React.PropTypes.string,
  onPress: React.PropTypes.func.isRequired,
};
