import React from 'react'
import { View, Modal, FlatList } from 'react-native'
import { connect } from 'react-redux'
import RestaurantDetailScreen from './RestaurantDetailScreen'
import RestaurantListPlaceholder from '../Components/RestaurantListPlaceholder'

// Redux
import { fetchRestaurants, toggleFavourite } from '../Redux/RestaurantsRedux'

// Components
import RestaurantItem from '../Components/RestaurantItem'

// Styles
import styles from './Styles/RestaurantListStyle'

// Constants
const onEndReachedThreshold = .7;
const ITEM_HEIGHT = 200;
const numPlaceholders = 5;

class RestaurantListScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      modalItem: null
    }
  }

  renderEmpty = () => <RestaurantListPlaceholder numPlaceholders={numPlaceholders} />

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

  toggleModal = (modalItem) => {
    this.setState({ showModal: !this.state.showModal, modalItem })
  }

  componentDidMount = () => {
    this.props.fetchRestaurants(this.props.nextPageToken);
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.restaurantList}
          renderItem={({ item }) => <RestaurantItem item={item} handleChangeTab={this.props.handleChangeTab} favourites={this.props.favourites} onFavourite={this.onFavourite} toggleModal={this.toggleModal} />}
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
        <Modal
          visible={this.state.showModal}
          onRequestClose={this.toggleModal}>
          <RestaurantDetailScreen
              item={this.state.modalItem}
              onFavourite={this.onFavourite}
              favourites={this.props.favourites}
              screenProps={{ toggle: this.toggleModal }}
          />
        </Modal>
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
