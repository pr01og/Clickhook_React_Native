import React, {Component} from 'react';
import {
  View,
  Platform,
  Text,
  ActivityIndicator,
  ScrollView,
  BackAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '../styles/styles';

import LeadsList from './LeadsList';
import Fab from './Fab';
import Icon from 'react-native-vector-icons/Ionicons';
import TextField from 'react-native-md-textinput';

const _ = require('lodash');

export default class LeadsUi extends Component {

  constructor(props) {
    super(props);
    this.state = {page_loading: props.loading, show_additional: false};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.setState({page_loading: true});
    } else {
      this.setState({page_loading: false});
    }
  }

  render() {

    console.log('#dfklsdflk leads ui:', this.props);

    return (
      <View style={{paddingTop: 60, flex: 1}}>
        <View style={{flex: 1}}>
          {
            this.state.page_loading ?
              <ActivityIndicator
                animating={true}
                style={{height: 80, paddingTop: 50}}
                size="large"
              />
              :
              <LeadsList
                show_search={this.props.show_search}
                page={this.props.page}
                total={this.props.total}
                leads={this.props.leads}
                loading={this.props.loading}
                handleRefresh={this.props.handleRefresh}
                handleShowSingleLead={this.props.handleShowSingleLead}
                onUpdateFavorited={this.props.onUpdateFavorited}
              />
          }
        </View>

        {this.props.show_search ? this.renderSearch() : null}

        {this.renderPagination()}
        <Fab onPress={this.props.handleClickAdd}/>
      </View>
    );
  }

  renderAdditionalOptions() {

    const workflows_filters = [];
    const styles = {
      active: {padding: 6, backgroundColor: '#2d65ca', borderRadius: 3, margin: 3},
      inactive: {padding: 6, backgroundColor: '#ccc', borderRadius: 3, margin: 3}
    };

    if (this.props.workflows && this.props.workflows.length > 0) {
      this.props.workflows.forEach(wf => {
        let active = this.props.filter_workflows.indexOf(wf.id) !== -1;
        workflows_filters.push(
          <TouchableWithoutFeedback
            key={wf.id}
            onPress={() => {
              let filter_workflows = this.props.filter_workflows;
              if(filter_workflows.indexOf(wf.id) !== -1){
                filter_workflows = _.without(filter_workflows, wf.id);
              } else {
                filter_workflows.push(wf.id);
              }
              this.props.handleChangeSearch(
                this.props.search,
                this.props.search_important_only,
                filter_workflows,
                this.props.filter_tags,
                this.props.filter_sources,
              )
            }}
          >
            <View style={active ? styles.active : styles.inactive}>
              <Text style={{color: active ? '#fff' : '#333'}}>
                {wf.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      });
    }

    let sources = [];
    this.props.user.accounts.forEach(account => {
      console.log('#jkjfkd accounts: ', account);
      account.sources.forEach(source => {
        if (sources.indexOf(source) === -1) {
          sources.push(source);
        }
      });
    });

    sources = sources.map(source => {
      let active = this.props.filter_sources.indexOf(source) !== -1;
      return (
        <TouchableWithoutFeedback
          key={source}
          onPress={() => {
              let filter_sources = this.props.filter_sources;
              if(filter_sources.indexOf(source) !== -1){
                filter_sources = _.without(filter_sources, source);
              } else {
                filter_sources.push(source);
              }
              this.props.handleChangeSearch(
                this.props.search,
                this.props.search_important_only,
                this.props.filter_workflows,
                this.props.filter_tags,
                filter_sources,
              )
            }}
        >
          <View
            style={active ? styles.active : styles.inactive}
          >
            <Text style={{color: active ? '#fff' : '#333'}}>
              {source}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });

    let tags = [];
    this.props.leads.forEach(lead => {
      lead.tags.forEach(tag => {
        if (tags.indexOf(tag) === -1) {
          tags.push(tag);
        }
      });
    });

    tags = tags.map(tag => {
      let active = this.props.filter_tags.indexOf(tag) !== -1;
      return (
        <TouchableWithoutFeedback
          key={tag}
          onPress={() => {
              let filter_tags = this.props.filter_tags;
              if(filter_tags.indexOf(tag) !== -1){
                filter_tags = _.without(filter_tags, tag);
              } else {
                filter_tags.push(tag);
              }
              this.props.handleChangeSearch(
                this.props.search,
                this.props.search_important_only,
                this.props.filter_workflows,
                filter_tags,
                this.props.filter_sources,
              )
            }}
        >
          <View
            style={active ? styles.active : styles.inactive}
          >
            <Text style={{color: active ? '#fff' : '#333'}}>
              {tag}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return (
      <ScrollView style={{maxHeight: 270}}>
        <TouchableWithoutFeedback
          onPress={() => this.props.handleChangeSearch(
            this.props.search,
            !this.props.search_important_only,
            this.props.filter_workflows,
            this.props.filter_tags,
            this.props.filter_sources,
            )}
        >
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
            <Icon
              name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-${this.props.search_important_only ? 'checkbox' : 'square'}-outline`}
              size={25}
              color="#131313"
            />
            <Text style={{marginBottom: 3, marginLeft: 12}}>Important only</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={{paddingTop: 12}}>
          <Text style={{fontWeight: 'bold'}}>Filter by workflows</Text>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', paddingTop: 12, paddingBottom: 12}}>
            {workflows_filters}
          </View>
        </View>

        <View style={{paddingTop: 12}}>
          <Text style={{fontWeight: 'bold'}}>Filter by tags</Text>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', paddingTop: 12, paddingBottom: 12}}>
            {tags}
          </View>
        </View>

        {
          sources.length > 0 ?
            <View style={{paddingTop: 12}}>
              <View style={{marginBottom: 12}}>
                <Text style={{fontWeight: 'bold', }}>Filter by sources</Text>
              </View>
              {sources}
            </View> : null
        }
        <View style={{margin: 50}}></View>
      </ScrollView>
    );
  }

  renderSearch() {

    console.log('#klflkdfs props: ', this.props);

    return (
      <View style={{
          top: 0,
          position: 'absolute',
          padding: Platform.OS === 'ios' ? 12 : 16,
          paddingRight: 0,
          flex: 1,
          borderBottomWidth: Platform.OS === 'ios' ? 0 : 1,
          borderBottomColor: Platform.OS === 'ios' ? '#fff' : '#949494',
          shadowColor: "#000000",
          shadowOpacity: 0.4,
          shadowRadius: 3,
          shadowOffset: {
            height: 3,
            width: 0,
          },
          flexDirection: 'row',
        }}
      >
        <View style={{flex: 1}}>
          <TextField
            style={{flex: 1}}
            label={'Search'}
            ref={'search'}
            height={40}
            autoFocus={true}
            highlightColor={colors.brand}
            value={this.props.search || ''}
            onChangeText={search => this.props.handleChangeSearch(search, this.props.search_important_only)}
          />
          <View>
            <TouchableWithoutFeedback
              onPress={() => this.setState({show_additional: !this.state.show_additional})}
            >
              <View style={{paddingTop: 24, paddingBottom: 6, opacity: 0.6}}>
                <Text style={{textAlign: 'center'}}>
                  {this.state.show_additional ? 'Hide options' : 'Show options'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          {this.state.show_additional ? this.renderAdditionalOptions() : null}
        </View>
        <View style={{width: 48}}>
          <TouchableWithoutFeedback onPress={() => {
            this.state.show_additional ? this.setState({show_additional: false}) : this.props.handleHideSearch();
          }}>
            <View
              style={{paddingLeft: 12, paddingRight: 0, paddingTop: Platform.OS === 'ios' ? 24 : 31}}
            >
              <Icon
                name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-close`}
                size={Platform.OS === 'ios' ? 45 : 30}
                color="#131313"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  renderPagination() {

    let currentPage = this.props.page;
    let totalLeads = this.props.total;
    let max_page = Math.round(Math.ceil(totalLeads / 50));

    let btn_forward =
      <TouchableWithoutFeedback
        onPress={() => {
          if(max_page > currentPage){
            this.props.handleClickNextPage();
          }
        }}
      >
        <View style={{padding: 9, paddingRight: 20}}>
          <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-arrow-forward`} size={30} color="#131313"/>
        </View>
      </TouchableWithoutFeedback>;

    let btn_back =
      <TouchableWithoutFeedback onPress={this.props.handleClickPreviousPage}>
        <View style={{padding: 9}}>
          <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-arrow-back`} size={30} color="#131313"/>
        </View>
      </TouchableWithoutFeedback>;

    let txt_current =
      <Text style={{fontSize: 16, padding: 14, paddingLeft: 8, paddingRight: 8, color: '#131313'}}>
        Page {currentPage}
      </Text>;

    let txt_next =
      <TouchableWithoutFeedback
        onPress={() => {
          if(max_page > currentPage){
            this.props.handleClickNextPage();
          }
        }}
      >
        <View>
          <Text style={{fontSize: 16, padding: 14, paddingLeft: 8, paddingRight: 8, color: '#131313'}}>
            Next page
          </Text>
        </View>
      </TouchableWithoutFeedback>;

    // console.log('currentPage, totalLeads, max_page', currentPage, totalLeads, max_page);

    if (currentPage === 1) {
      btn_back = null;
      txt_current = null;
    }
    if (currentPage < max_page && currentPage !== 1) {
      txt_next = null;
    }
    if (currentPage === max_page) {
      txt_next = null;
      btn_forward = null;
    }

    return (
      <View style={{
        backgroundColor: colors.background,
        height: 48,
        paddingLeft: 12,
        flexDirection: 'row',
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowOffset: {
          height: 1,
          width: 0
        }
        }}>
        {btn_back}
        {txt_current}
        {txt_next}
        {btn_forward}
      </View>
    );
  }

}

LeadsUi.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  loading_error: React.PropTypes.bool.isRequired,
  leads: React.PropTypes.array.isRequired,
  workflows: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  instances: React.PropTypes.array.isRequired,
  total: React.PropTypes.number.isRequired,
  page: React.PropTypes.number.isRequired,
  search_important_only: React.PropTypes.bool.isRequired,
  filter_workflows: React.PropTypes.array.isRequired,
  filter_tags: React.PropTypes.array.isRequired,
  filter_sources: React.PropTypes.array.isRequired,
  search: React.PropTypes.string.isRequired,
  show_search: React.PropTypes.bool.isRequired,
  handleRefresh: React.PropTypes.func.isRequired,
  handleShowSingleLead: React.PropTypes.func.isRequired,
  onUpdateFavorited: React.PropTypes.func.isRequired,
  handleHideSearch: React.PropTypes.func.isRequired,
  handleChangeSearch: React.PropTypes.func.isRequired,
  handleClickAdd: React.PropTypes.func.isRequired,
  handleClickNextPage: React.PropTypes.func.isRequired,
  handleClickPreviousPage: React.PropTypes.func.isRequired,
};
