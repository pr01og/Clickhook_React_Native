import React, {Component} from 'react';
import {
  View,
} from 'react-native';
import {colors} from './../styles/styles';
import TextField from 'react-native-md-textinput';

export default class LeadsAddInputsMain extends Component {

  render() {
    return (
      <View>
        <TextField
          label={`Email${this.props.phone ? ' (optional)' : ''}`}
          highlightColor={colors.brand}
          keyboardType={'email-address'}
          height={40}
          value={this.props.email}
          onChangeText={value => this.props.onChangeEmail(value ? value.toString().trim() : '')}
        />
        <TextField
          label={'Name (optional)'}
          highlightColor={colors.brand}
          height={40}
          value={this.props.name}
          onChangeText={value => this.props.onChangeName(value ? value.toString() : '')}
        />
        <TextField
          label={'Company (optional)'}
          highlightColor={colors.brand}
          height={40}
          value={this.props.company}
          onChangeText={value => this.props.onChangeCompany(value ? value.toString() : '')}
        />
        <TextField
          label={`Phone${this.props.email ? ' (optional)' : ''}`}
          highlightColor={colors.brand}
          height={40}
          keyboardType={'phone-pad'}
          value={this.props.phone}
          onChangeText={value => this.props.onChangePhone(value ? value.toString().trim() : '')}
        />
      </View>
    );
  }

}

LeadsAddInputsMain.propTypes = {
  email: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  company: React.PropTypes.string.isRequired,
  phone: React.PropTypes.string.isRequired,

  onChangeEmail: React.PropTypes.func.isRequired,
  onChangeName: React.PropTypes.func.isRequired,
  onChangeCompany: React.PropTypes.func.isRequired,
  onChangePhone: React.PropTypes.func.isRequired,
};
