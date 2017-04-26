import React, {Component} from 'react';
import {
  View,
  Text,
  ListView,
  RefreshControl,
} from 'react-native';
import LeadsListItem from './LeadsListItem';

export default class LeadsList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});

    this.state = {
      dataSource: props.leads && props.leads.length > 0 ? ds.cloneWithRows(props.leads) : null,
    };
  }

  componentWillReceiveProps(nextProps) {
    let leads = [];
    nextProps.leads.forEach(lead => {
      if (typeof lead.id !== 'undefined') {
        leads.push(lead);
      }
    });

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
    let dataSource = leads;

    if (this.props.total > 1) {
      dataSource.push({currentPage: this.props.page, total: this.props.total});
    }

    dataSource = ds.cloneWithRows(dataSource);
    this.state = {
      dataSource,
    };
  }

  render() {

    if (this.props.leads.length > 0) {
      return (
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.props.handleRefresh}
            />
          }
          enableEmptySections={true}
          style={{flex: 1, marginTop: this.props.show_search? 70 : 24}}
          dataSource={this.state.dataSource}
          renderRow={ lead =>
            <LeadsListItem
              lead={lead}
              onPress={this.props.handleShowSingleLead}
              onUpdateFavorited={this.props.onUpdateFavorited}
            />
          }
        />
      );
    } else if (this.props.loading === false) {
      return (
        <View style={{marginTop: 50}}>
          <Text style={{textAlign: 'center', color: '#999'}}>
            Welcome to ClickHook
          </Text>
          <Text style={{textAlign: 'center', color: '#999', marginTop: 20}}>
            Add your first lead to begin
          </Text>
        </View>
      );
    }

    return null;

  }

}

LeadsList.propTypes = {
  total: React.PropTypes.number.isRequired,
  show_search: React.PropTypes.bool.isRequired,
  page: React.PropTypes.number.isRequired,
  leads: React.PropTypes.array.isRequired,
  loading: React.PropTypes.bool.isRequired,
  handleRefresh: React.PropTypes.func.isRequired,
  handleShowSingleLead: React.PropTypes.func.isRequired,
  onUpdateFavorited: React.PropTypes.func.isRequired,
};
