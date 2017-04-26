import React, {Component} from 'react';
import {connect} from 'react-redux';
import FCM from 'react-native-fcm';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  Platform,
  Alert,
  AsyncStorage,
  StatusBar,
} from 'react-native';
import {Actions, Scene, Router, ActionConst} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/styles';
import {authLogout} from '../actions/authActions';
import {
  leadsShowSearch,
} from './../actions/leadsActions';
import Login from './Login';
import Lead from './Lead';
import Leads from './Leads';
import LeadsAdd from './LeadsAdd';

class AppHelper extends Component {

  componentDidMount() {
    /*
     // FCM.requestPermissions(); // for iOS
     FCM.getFCMToken().then(token => {
     console.warn(`token #1: ${token}`);
     // store fcm token in your server
     });
     this.notificationUnsubscribe = FCM.on('notification', (notif) => {
     // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
     if (notif.local_notification) {
     //this is a local notification
     }
     if (notif.opened_from_tray) {
     //app is open/resumed because user clicked banner
     }
     });
     this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
     console.warn(`token #2: ${token}`)
     // fcm token may not be available on first load, catch it here
     });
     */
  }

  componentWillUnmount() {
    /*
     // prevent leaking
     this.refreshUnsubscribe();
     this.notificationUnsubscribe();
     */
  }

  constructor(props) {
    super(props);
  }

  render() {

    const styles = {
      navigation: {
        backgroundColor: colors.brand,
        height: 80,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset: {
          height: 3,
          width: 0
        }
      },
      title: {
        paddingTop: 9,
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',

      }
    };

    const btn_logout =
        <TouchableWithoutFeedback
          onPress={() => {
              Alert.alert(
              "Confirm logout",
              "",
              [
                {
                  text: "Cancel",
                  style: 'cancel',
                },
                {
                  text: "Logout",
                  onPress: () => {
                    AsyncStorage.removeItem('email');
                    AsyncStorage.removeItem('password');
                    this.props.dispatch(authLogout());
                    Actions.login({type: ActionConst.REPLACE});
                  }
                },
              ]
            )
          }}
        >
          <View style={{marginTop: 9, height: 30}}>
            <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-exit`} size={30} color="#fff"/>
          </View>
        </TouchableWithoutFeedback>
      ;

    const btn_search =
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.dispatch(leadsShowSearch());
            Actions.search({type: ActionConst.REPLACE});
          }}
          style={{paddingTop: 9}}
        >
          <View style={{marginTop: 9, height: 30}}>
            <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-search`} size={30} color="#fff"/>
          </View>
        </TouchableWithoutFeedback>
      ;

    // const lead_title = `Lead / ${this.props.single_tab.charAt(0).toUpperCase() + this.props.single_tab.slice(1)}`;
    // would be cool to update title to show breadcrumbs, but it's not working with current version.
    // issue: https://github.com/aksonov/react-native-router-flux/issues/1307

    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={colors.brand}
          barStyle="light-content"
        />
        <Router>
          <Scene
            key="root"
            titleStyle={styles.title}
            navigationBarStyle={styles.navigation}
            leftButtonIconStyle={{tintColor:'#fff', marginTop: 9}}
          >
            <Scene key="login" component={Login} hideNavBar={true}/>
            <Scene
              key="leads"
              component={Leads}
              hideNavBar={false}
              title="Leads"
              renderLeftButton={() => btn_logout}
              renderRightButton={() => btn_search}
            />
            <Scene
              key="search"
              component={Leads}
              hideNavBar={true}
              renderLeftButton={() => btn_logout}
              renderRightButton={() => btn_search}
            />

            <Scene
              key="leadsAdd"
              component={LeadsAdd}
              direction={'vertical'}
              hideNavBar={false}
              panHandlers={null}
              title="Add new lead"
            />

            <Scene
              key="lead"
              hideNavBar={false}
              component={Lead}
              title={'Lead / Profile'}
            />
          </Scene>
        </Router>
      </View>
    );
  }
}


export default connect(state => {
  return {
    leads: state.leads,
    single_tab: state.leads.single_view_tab,
  };
})(AppHelper);