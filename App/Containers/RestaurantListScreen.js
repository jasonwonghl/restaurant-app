import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Placeholder, { Line, Media } from "rn-placeholder";

// Redux
import { fetchRestaurants, toggleFavourite } from '../Redux/RestaurantsRedux'

// Components
import RestaurantItem from '../Components/RestaurantItem'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/RestaurantListStyle'
import { Colors } from '../Themes'

// Constants
const onEndReachedThreshold = .7;
const ITEM_HEIGHT = 200;

class RestaurantListScreen extends React.PureComponent {
  renderEmpty = () =>
    <View>
      <Placeholder
        isReady={this.isReady}
        animation="fade"
        renderLeft={() => <Media style={{ width: 90, height: 90, marginHorizontal: 10,  backgroundColor: Colors.eggplant}} />}
      >
        <Line width="70%" style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line width="30%" style={{ marginBottom: 20, backgroundColor: Colors.eggplant }} />
      </Placeholder>

      <Placeholder
        isReady={this.isReady}
        animation="fade"
        renderLeft={() => <Media style={{ width: 90, height: 90, marginHorizontal: 10,  backgroundColor: Colors.eggplant}} />}
      >
        <Line width="70%" style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line width="30%" style={{ marginBottom: 20, backgroundColor: Colors.eggplant }} />
      </Placeholder>

      <Placeholder
        isReady={this.isReady}
        animation="fade"
        renderLeft={() => <Media style={{ width: 90, height: 90, marginHorizontal: 10,  backgroundColor: Colors.eggplant}} />}
      >
        <Line width="70%" style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line width="30%" style={{ marginBottom: 20, backgroundColor: Colors.eggplant }} />
      </Placeholder>

      <Placeholder
        isReady={this.isReady}
        animation="fade"
        renderLeft={() => <Media style={{ width: 90, height: 90, marginHorizontal: 10,  backgroundColor: Colors.eggplant}} />}
      >
        <Line width="70%" style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line width="30%" style={{ marginBottom: 20, backgroundColor: Colors.eggplant }} />
      </Placeholder>

      <Placeholder
        isReady={this.isReady}
        animation="fade"
        renderLeft={() => <Media style={{ width: 90, height: 90, marginHorizontal: 10,  backgroundColor: Colors.eggplant}} />}
      >
        <Line width="70%" style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line width="30%" style={{ marginBottom: 20, backgroundColor: Colors.eggplant }} />
      </Placeholder>

      <Placeholder
        isReady={this.isReady}
        animation="fade"
        renderLeft={() => <Media style={{ width: 90, height: 90, marginHorizontal: 10,  backgroundColor: Colors.eggplant}} />}
      >
        <Line width="70%" style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line style={{ backgroundColor: Colors.eggplant }} />
        <Line width="30%" style={{ marginBottom: 20, backgroundColor: Colors.eggplant }} />
      </Placeholder>
    </View>

  isReady = false;

  keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 11;

  onFavourite = (id) => {
    let arr = [...this.props.favourites];

    // Unfavourite
    if(arr.includes(id)) {
      arr = arr.filter(favourite => favourite !== id);
    // Favourite
    } else {
      arr.push(id);
    }

    this.props.toggleFavourite(arr);
  }

  componentDidMount = () => {
    this.props.fetchRestaurants(this.props.NextPageToken);
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.restaurantList}
          renderItem={({ item }) => <RestaurantItem item={item} handleChangeTab={this.props.handleChangeTab} favourites={this.props.favourites} onFavourite={this.onFavourite} />}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          onEndReached={() => this.props.fetchRestaurants(this.props.nextPageToken)}
          onEndReachedThreshold={onEndReachedThreshold}
          getItemLayout={(data, index) => (
            {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          )}
          removeClippedSubviews={true}
          scrollEventThrottle={16}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nextPageToken: state.restaurants.nextPageToken,
    restaurantList: state.restaurants.restaurantList,
    favourites: state.restaurants.favourites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRestaurants: nextPageToken => dispatch(fetchRestaurants(nextPageToken)),
    toggleFavourite: favourites => dispatch(toggleFavourite(favourites))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListScreen)
