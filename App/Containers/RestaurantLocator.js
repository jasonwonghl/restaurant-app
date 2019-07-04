import React, { Component } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

export default class RestaurantLocator extends Component {
    constructor(props) {
      super(props);

      this.state = {
        region: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      }
    }

    onRegionChange(region) {
      this.setState({ region });
    }
    
    

    render() {
      let markers = [
        {
          title: 'San Francisco',
          description: 'Street 123',
          coordinate: {
            latitude: 37.78825,
            longitude: -122.4324,
          }
        }
      ];

      return (
        <View style={{width:'100%', height:'100%'}}>
          <MapView
              zoomEnabled={true} scrollEnabled={true}
              style={{flex:1}}
              region={this.state.region}>
                {
                  markers.map((marker)=>(
                    <Marker id={marker.title} {...marker} />
                  ))
                }
          </MapView>
        </View>
      );
    }
}
