import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'

import RestaurantListScreen from '../Containers/RestaurantListScreen';
import RestaurantLocator from './RestaurantLocator';

const FirstRoute = () => (
  <RestaurantListScreen />
);

const SecondRoute = () => (
  <RestaurantLocator />
);

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
        { key: 'first', title: 'List' },
        { key: 'second', title: 'Map' },
      ],
    };  
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  }

  _renderHeader = (props) => {
    return <TabBar {...props} />;
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <View style={[ pageStyles.page, { backgroundColor: '#ff4081' } ]}>
          <Text>Hello from Tab View 1</Text>
        </View>
      case '2':
        return <View style={[ pageStyles.page, { backgroundColor: '#673ab7' } ]}>
          <Text>Hello from Tab View 2</Text>
        </View>
      default:
        return null;
      }
  }

  render () {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    )
  }
}
