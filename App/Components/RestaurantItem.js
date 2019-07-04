import React, { PureComponent } from 'react'
import { View, Text, Image } from 'react-native'
import { Rating } from 'react-native-ratings'
import Secrets from 'react-native-config'
import RoundedButton from '../../App/Components/RoundedButton'
import RestaurantDetailButton from '../Components/RestaurantDetailButton'

// Styles
import styles from '../Containers/Styles/RestaurantListStyle'

export default class RestaurantItem extends PureComponent {
    render () {
        const { item } = this.props;

        let imageURI = 'https://via.placeholder.com/90';

        if(item.photos) {
            imageURI = Secrets.PHOTO_URL + '?maxwidth=400&photoreference=' + item.photos[0].photo_reference + '&key=' + Secrets.GOOGLE_MAPS_API_KEY;
        }
        
        return (
            <View style={styles.row}>
              <View style={{flex: 1, margin: 5}}>
                {item.photos && (
                    <Image
                        style={{width: 89, height: 90}}
                        resizeMode="cover"
                        source={{ uri: imageURI }}
                    />
                )}
                
              </View>
              <View style={{flex: 3}}>
                <Text style={styles.boldLabel}>{item.name}</Text>
                <Rating
                  startingValue={item.rating}
                  ratingCount={5}
                  showRating={true}
                  fractions={2}
                  imageSize={20}
                  type='custom'
                  ratingBackgroundColor='#3A233D'
                  tintColor='#3A233D'
                />
                <View style={styles.row}>
                  <RestaurantDetailButton item={item} imageURI={imageURI} />
                  <RoundedButton onPress={() => this.props.handleChangeTab(1, item.geometry.location)}>View On Map</RoundedButton>
                </View>
              </View>
            </View>
        )
    }
}