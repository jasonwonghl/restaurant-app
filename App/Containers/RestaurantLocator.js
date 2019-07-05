import React, { PureComponent } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { connect } from 'react-redux'

// Constants
const latitude = 1.308584,
      longitude = 103.8388484,
      latitudeDelta = 0.0922,
      longitudeDelta = 0.0421;

class RestaurantLocator extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        region: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        }
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

        this.onRegionChange(region);
      }
    }

    onRegionChange(region) {
      this.setState({ region });
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
            coordinate: {
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng
            }
          });
       })

      return (
        <View style={{width:'100%', height:'100%'}}>
          <MapView
            zoomEnabled={true} scrollEnabled={true}
            style={{flex:1}}
            region={this.state.region}
            onRegionChangeComplete={() => {this.markerRefs[this.props.restaurantId] && this.markerRefs[this.props.restaurantId].showCallout()}}
          >
            {
              markers.map((marker)=>(
                <Marker
                  id={marker.id}
                  {...marker}
                  key={marker.id} 
                  ref={(ref) => (this.markerRefs[marker.id] = ref)}
                />
              ))
            }
          </MapView>
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    restaurantList: state.restaurants.restaurantList
  }
}

export default connect(mapStateToProps)(RestaurantLocator)