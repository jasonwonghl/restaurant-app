import React, { PureComponent } from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { connect } from 'react-redux'
import RestaurantDetailScreen from '../Containers/RestaurantDetailScreen'

// Styles
import styles from '../Containers/Styles/RestaurantListStyle'

// Redux
import { toggleFavourite } from '../Redux/RestaurantsRedux'

// Constants
const latitude = 1.308584,
      longitude = 103.8388484,
      latitudeDelta = 0.0922,
      longitudeDelta = 0.0421;

const CustomCalloutView = (props) => {
  return (
    <View style={{width: 250, padding: 5}}>
      <Text style={[styles.boldLabel, {color: 'black'}]} numberOfLines={1}>{props.title}</Text>
      <Text style={{color: 'black'}} numberOfLines={1}>{props.description}</Text>
    </View>
  )
}

class RestaurantLocator extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        region: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        },
        showModal: false,
        selectedItem: null,
        restaurantId: null
      }

      this.markerRefs = {};
    }

    componentDidUpdate = (prevProps) => {
      // Change region
      if (prevProps.coordinate.latitude != this.props.coordinate.latitude) {

        const region = {
          latitude: this.props.coordinate.latitude,
          longitude: this.props.coordinate.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        }

        this.onRegionChange(region, this.props.restaurantId);
      }
    }

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

    toggleModal = (selectedItem) => {
      this.setState({ 
        showModal: !this.state.showModal,
        selectedItem
      })
    }

    onRegionChange(region, restaurantId) {
      this.setState({ region, restaurantId });
    }

    render() {
      console.log('LENGTH', this.props.restaurantList.length)
      
       // Update markers
       let markers = [];
       
       this.props.restaurantList.forEach((item) => {
          markers.push({
            id: item.id,
            title: item.name,
            description: item.formatted_address,
            metadata: item,
            coordinate: {
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta
            }
          });
       })

      return (
        <View style={{width:'100%', height:'100%'}}>
          <MapView
            zoomEnabled={true} scrollEnabled={true}
            style={{flex:1}}
            region={this.state.region}
            onRegionChangeComplete={() => {
              if (this.markerRefs[this.state.restaurantId]) {
                this.markerRefs[this.state.restaurantId].showCallout()
              }
            }}
          >
            {
              markers.map((marker)=>(
                <Marker
                  id={marker.id}
                  {...marker}
                  key={marker.id} 
                  ref={(ref) => (this.markerRefs[marker.id] = ref)}
                  onPress={() => this.onRegionChange(marker.coordinates, marker.id)}
                  onCalloutPress={() => this.toggleModal(marker.metadata)}
                >
                  <Callout>
                    <CustomCalloutView {...marker} />
                  </Callout>
                </Marker>
              ))
            }
          </MapView>
          <Modal
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}>
            <RestaurantDetailScreen
                item={this.state.selectedItem}
                onFavourite={this.onFavourite}
                favourites={this.props.favourites}
                screenProps={{ toggle: this.toggleModal }}
            />
          </Modal>
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps)(RestaurantLocator)