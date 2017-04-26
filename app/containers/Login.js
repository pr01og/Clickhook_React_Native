import React, {Component} from 'react';
import LoginUi from '../components/LoginUi';
import {connect} from 'react-redux';
import {authTry, authRegisterTry} from '../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <LoginUi
        authTry={(login, password) => {
          this.props.dispatch(authTry(login, password));
        }}
        authRegisterTry={(login, password, name) => {
          this.props.dispatch(authRegisterTry(login, password, name));
        }}
        loading={this.props.auth.loading}
        error={this.props.auth.error}
        logged_in={this.props.auth.token !== ''}
      />
    );
  }
}

export default connect(state => {
  return {
    auth: state.auth
  };
})(Login);
