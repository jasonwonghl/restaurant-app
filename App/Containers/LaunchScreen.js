import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import RestaurantListScreen from '../Containers/RestaurantListScreen';
import RestaurantLocator from './RestaurantLocator';

// Styles
import styles from './Styles/LaunchScreenStyles'

const pageStyles = StyleSheet.create({
  container: {
    flex: 1
  },  
  page: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Restaurants' },
        { key: 'second', title: 'Locations' },
      ],
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      restaurantId: ''
    };  
  }

  handleChangeTab = (index, item) => {
    const { lat, lng } = item.geometry.location;

    this.setState({
      index,
      restaurantId: item.id,
      coordinate: { latitude: lat, longitude: lng}
    });
  }

  _renderHeader = (props) => {
    return <TabBar {...props} />;
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <RestaurantListScreen handleChangeTab={this.handleChangeTab} />
      case 'second':
        return <RestaurantLocator coordinate={this.state.coordinate} restaurantId={this.state.restaurantId} />
      default:
        return null;
      }
  }

  render () {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    )
  }
}
