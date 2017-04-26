import React, {Component} from 'react';
const moment = require('moment');
import {
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from './../../styles/styles';

export default class CancelSave extends Component {

  render() {

    let {
      handleCancel,
      handleSave,
      handleCustom,
      title_custom,
      loading,
      title_cancel,
      title_save,
      save_disabled,
    } = this.props;

    let btn_style = Object.assign({}, {
      borderRadius: 6,
      borderWidth: 1,
      width: 120,
      height: 48,
    }, this.props.button_style || {});

    return (
      <View style={{flexDirection: 'row', margin: 24, alignItems: 'center', justifyContent: 'space-between'}}>

        <TouchableWithoutFeedback style={{flex: 1}} onPress={handleCancel}>
          <View
            style={Object.assign({}, btn_style, {backgroundColor: colors.background, borderColor: colors.background})}
          >
            <Text style={{flex: 1, color: colors.brand, padding: 10, fontSize: 16, textAlign: 'center'}}>
              {title_cancel || 'Cancel'}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        {handleCustom && title_custom ?
          <TouchableWithoutFeedback style={{flex: 1}} onPress={handleCustom}>
            <View
              style={Object.assign({}, btn_style, {backgroundColor: colors.background, borderColor: colors.background})}
            >
              <Text style={{flex: 1, color: colors.brand, padding: 10, fontSize: 16, textAlign: 'center'}}>
                {title_custom || ''}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          : null
        }

        <TouchableWithoutFeedback style={{flex: 1}} onPress={handleSave}>
          <View
            style={Object.assign({}, btn_style, {
              backgroundColor: loading || save_disabled ? colors.light : colors.brand,
              borderColor: loading || save_disabled ? colors.light : colors.brand,
            })}
          >
            <Text style={{flex: 1, color: '#fff', padding: 10, fontSize: 16, textAlign: 'center'}}>
              {title_save || 'Save'}
            </Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );
  }
}

CancelSave.propTypes = {
  handleCancel: React.PropTypes.func.isRequired,
  handleSave: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  save_disabled: React.PropTypes.bool,
  title_cancel: React.PropTypes.string,
  title_save: React.PropTypes.string,
  button_style: React.PropTypes.object,
};

