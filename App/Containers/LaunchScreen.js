import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'

import { Images } from '../Themes'

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
        { key: '1', title: 'List' },
        { key: '2', title: 'Map' },
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
      <View style={styles.mainContainer}>
        <TabViewAnimated
          style={pageStyles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        />
      </View>
    )
  }
}
