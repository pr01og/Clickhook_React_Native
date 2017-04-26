// @flow
import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  View,
  Text,
  Linking,
  TextInput,
  Image,
  AsyncStorage,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import {colors} from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import TextField from 'react-native-md-textinput';

const validator = require('validator');

export default class LoginUi extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password: '', name: '', register: false, error: '', auto_login: false};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({error: nextProps.error});
    }
  }

  componentDidMount() {

    let that = this;

    AsyncStorage.getItem('auto_login')
      .then(value => {
        if (value === 'yes') {
          that.setState({auto_login: true});
        } else if (value === 'no') {
          that.setState({auto_login: false});
        }
      })
      .catch(e => {
        console.log('#0d1fs error:', e);
      });

    AsyncStorage.getItem('email').then(email => {
      that.setState({email});
      if (that.state.password) {
        that.trySubmit();
      }
    });

    AsyncStorage.getItem('password').then(password => {
      that.setState({password});
      if (that.state.email) {
        that.trySubmit();
      }
    });

  }

  trySubmit() {

    const name = this.state.name.trim();

    if (this.state.register === true && (!this.state.name || this.state.name === '')) {
      this.refs.name.focus();
      this.setState({error: 'Enter correct name'});
    } else if (!this.state.email || validator.isEmail(this.state.email) === false) {
      this.refs.email.focus();
      this.setState({error: 'Enter correct email'});
    } else if (!this.state.password) {
      this.refs.password.focus();
      this.setState({error: 'Enter password'});
    } else {
      this.setState({error: ''});
      if(this.state.register === true){
        this.props.authRegisterTry(this.state.email, this.state.password, name);
      } else {
        this.props.authTry(this.state.email, this.state.password);
      }
    }

  }

  handleEmailChange(email) {
    email = email.trim();

    this.setState({email, error: ''});

    if (this.state.auto_login) {
      AsyncStorage.setItem('email', email || '')
        .then()
        .catch(e => {
          console.log('#1d4fds4 e ', e);
        })
      ;
    }
  }

  handleNameChange(name) {
    if (name.length < 25) {
      this.setState({name, error: ''});
    }
  }

  handlePasswordChange(password) {
    this.setState({password, error: ''});
    if (this.state.auto_login) {
      AsyncStorage.setItem('password', password || '');
    }
  }

  handleAutoLoginChange(do_auto_login) {
    if (do_auto_login) {
      this.setState({auto_login: true});
      AsyncStorage.setItem('auto_login', 'yes');
      AsyncStorage.setItem('email', this.state.email || '');
      AsyncStorage.setItem('password', this.state.password || '');
    } else {
      this.setState({auto_login: false});
      AsyncStorage.setItem('auto_login', 'no');
      AsyncStorage.removeItem('email');
      AsyncStorage.removeItem('password');
    }
  }

  renderAutoLogin() {
    if (this.state.register === true) {
      return null;
    }
    return (
      <TouchableWithoutFeedback onPress={() => this.handleAutoLoginChange(!this.state.auto_login)}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {
            this.state.auto_login ?
              <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-checkbox`} size={30} color="#4F8EF7"/>
              :
              <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-square-outline`} size={30} color="#4F8EF7"/>
          }
          <Text style={{marginLeft: 12}}>Auto login</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderLoggedIn() {
    return (
      <TouchableHighlight
        style={{flex: 1,flexDirection: 'row', margin: 24, alignItems: 'center'}}
        onPress={() => this.trySubmit()}
      >
        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-checkmark`} size={30} color="#4F8EF7"/>
          <Text style={{marginLeft: 12}}>Logged in</Text>
        </View>
      </TouchableHighlight>
    );
  }

  handleOpenLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.warn('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));

  }

  renderForm() {
    const {loading} = this.props;

    return (
      <ScrollView style={{flex: 1, padding: 12}}>
        <View style={{justifyContent: 'center', alignItems: 'center', height: 150}}>
          <Image
            source={require('./../assets/images/logo.png')}
          />
        </View>

        {
          this.state.register ?
            <View style={{marginRight: 24, marginLeft: 24}}>
              <TextField
                label={'Name'}
                ref={'name'}
                height={40}
                autoFocus={true}
                returnKeyType={'next'}
                onSubmitEditing={() => this.refs.email.focus()}
                highlightColor={colors.brand}
                value={this.state.name || ''}
                onChangeText={name => this.handleNameChange(name)}
              />
            </View> : null
        }
        <View style={{marginRight: 24, marginLeft: 24}}>
          <TextField
            label={'Email'}
            ref={'email'}
            height={40}
            autoFocus={true}
            returnKeyType={'next'}
            onSubmitEditing={() => this.refs.password.focus()}
            highlightColor={colors.brand}
            keyboardType={'email-address'}
            value={this.state.email || ''}
            onChangeText={email => this.handleEmailChange(email)}
          />
        </View>

        <View style={{marginRight: 24, marginLeft: 24}}>
          <TextField
            secureTextEntry={true}
            label={'Password'}
            height={40}
            ref={'password'}
            onSubmitEditing={() => this.trySubmit()}
            highlightColor={colors.brand}
            value={this.state.password || ''}
            onChangeText={password => this.handlePasswordChange(password)}
          />
        </View>

        {
          this.state.error
            ?
            <View style={{flexDirection: 'row', margin: 24, marginBottom: 0}}>
              <Text style={{color: colors.red, textAlign: 'center', flex: 1}}>
                {this.state.error}
              </Text>
            </View> : null
        }

        {loading ? <ActivityIndicator style={{margin: 24, marginBottom: 0}} size="large"/> : null}

        <View style={{flexDirection: 'row', margin: 24, alignItems: 'center'}}>
          <TouchableHighlight style={{flex: 1}} onPress={() => this.trySubmit()}>
            <View style={{backgroundColor: colors.brand, borderRadius: 3}}>
              <Text style={{flex: 1, color: '#fff', padding: 12, textAlign: 'center'}}>
                {this.state.register ? 'Register' : 'Login'}
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        {this.renderAutoLogin()}
        <View style={{height: 250, paddingTop: 48, flex: 1}}>
          <TouchableWithoutFeedback
            style={{flex: 1,flexDirection: 'row', margin: 24, alignItems: 'center'}}
            onPress={() => this.setState({register: !this.state.register})}
          >
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', color: colors.text_primary}}>
                {this.state.register ? 'Already registered?' : 'Don’t have an account?'}
              </Text>
              <View style={{width: 6}}></View>
              <Text style={{textAlign: 'center', color: colors.brand}}>
                {this.state.register ? 'Login here' : 'Sign up here'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{height: 24}}></View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableWithoutFeedback
              style={{flex: 1,flexDirection: 'row', margin: 24, alignItems: 'center'}}
              onPress={() => this.handleOpenLink('https://leads.clickhook.io/forgot')}
            >
              <View>
                <Text style={{textAlign: 'center', color: colors.brand}}>Forgot password?</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{width: 16}}></View>
            <TouchableWithoutFeedback
              style={{flex: 1,flexDirection: 'row', margin: 24, alignItems: 'center'}}
              onPress={() => this.handleOpenLink('https://leads.clickhook.io/privacy')}
            >
              <View>
                <Text style={{textAlign: 'center', color: colors.brand}}>Privacy</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

      </ScrollView>
    );
  }

  render() {
    return this.props.logged_in ? this.renderLoggedIn() : this.renderForm();
  }
}

LoginUi.propTypes = {
  authTry: React.PropTypes.func.isRequired,
  authRegisterTry: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  logged_in: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string.isRequired,
};
