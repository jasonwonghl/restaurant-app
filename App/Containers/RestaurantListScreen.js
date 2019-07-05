import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

// Redux
import RestaurantsActions, { fetchRestaurants } from '../Redux/RestaurantsRedux'

// Components
import RestaurantItem from '../Components/RestaurantItem'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/RestaurantListStyle'

// Constants
const onEndReachedThreshold = .7;

class RestaurantListScreen extends React.PureComponent {
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 10

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  componentDidMount = () => {
    //this.props.fetchRestaurants(this.props.NextPageToken);
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          windowSize={11}
          contentContainerStyle={styles.listContent}
          data={this.props.restaurantList}
          renderItem={({ item }) => <RestaurantItem item={item} handleChangeTab={this.props.handleChangeTab} />}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          onEndReached={() => this.props.fetchRestaurants(this.props.nextPageToken)}
          onEndReachedThreshold={onEndReachedThreshold}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nextPageToken: state.restaurants.nextPageToken,
    restaurantList: state.restaurants.restaurantList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRestaurants: nextPageToken => {dispatch(fetchRestaurants(nextPageToken))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListScreen)
