import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Secrets from 'react-native-config'
import RoundedButton from '../../App/Components/RoundedButton'
import DevScreensButton  from '../../ignite/DevScreens/DevscreensButton'
import RestaurantDetailButton from '../Components/RestaurantDetailButton'

import RestaurantsActions, { fetchRestaurants } from '../Redux/RestaurantsRedux'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/RestaurantListStyle'

class RestaurantListScreen extends React.PureComponent {

  renderRow ({item}) {
    //console.log(Secrets.PHOTO_URL + '?maxwidth=400&photoreference=' + item.photos[0].photo_reference + '&key=' + Secrets.GOOGLE_MAPS_API_KEY)

    const imageURI = Secrets.PHOTO_URL + '?maxwidth=400&photoreference=' + item.photos[0].photo_reference + '&key=' + Secrets.GOOGLE_MAPS_API_KEY;

    return (
      <View style={styles.row}>
        <View style={{flex: 1, margin: 5}}>
          <Image
          style={{width: 89, height: 90}}
          resizeMode="cover"
          source={{ uri: imageURI }}
        />
        </View>
        <View style={{flex: 3}}>
          <Text style={styles.boldLabel}>{item.name}</Text>
          <Text style={styles.label}>{item.formatted_address}</Text>
          <View style={styles.row}>
            <RestaurantDetailButton item={item} imageURI={imageURI} />
            <RoundedButton>View On Map</RoundedButton>
          </View>
        </View>
      </View>
    )
  }
  
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

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
    //this.props.fetchRestaurants();
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.restaurantList}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    params: state.restaurants.params,
    restaurantList: state.restaurants.restaurantList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRestaurants: params => {dispatch(fetchRestaurants(params))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListScreen)
