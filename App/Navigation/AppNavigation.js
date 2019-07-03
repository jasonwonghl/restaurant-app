import { createStackNavigator, createAppContainer } from 'react-navigation'
import RestaurantListScreen from '../Containers/RestaurantListScreen'
import RestaurantLocator from '../Containers/RestaurantLocator'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  RestaurantListScreen: { screen: RestaurantListScreen },
  RestaurantLocator: { screen: RestaurantLocator },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
