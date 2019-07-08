import React, { PureComponent } from 'react'
import { View, Text, Image } from 'react-native'
import Secrets from 'react-native-config'
import RoundedButton from '../../App/Components/RoundedButton'
import RestaurantDetailButton from '../Components/RestaurantDetailButton'
import FavouriteButton from '../Components/FavouriteButton'

// Styles
import styles from '../Containers/Styles/RestaurantListStyle'

export default class RestaurantItem extends PureComponent {
    render () {
        const { item } = this.props;

        imageURI = Secrets.PHOTO_URL + '?maxwidth=400&photoreference=' + item.photos[0].photo_reference + '&key=' + Secrets.GOOGLE_MAPS_API_KEY;
            
        return (
            <View style={styles.row}>
              <Image
                  style={styles.restaurantItemImage}
                  resizeMode="cover"
                  source={{ uri: imageURI }}
              />
              <View style={{flex: 3}}>
                <FavouriteButton 
                  onFavourite={ () => this.props.onFavourite(item.id)} 
                  favourite={this.props.favourites.includes(item.id)}
                />
                <View style={{marginLeft: 20, marginRight: 40}}>
                  <Text style={[styles.boldLabel, styles.titleText]} numberOfLines={1}>{item.name}</Text>
                </View>
                <View style={styles.row}>
                  <RestaurantDetailButton item={item} onFavourite={this.props.onFavourite} favourites={this.props.favourites} />
                  <RoundedButton onPress={() => this.props.handleChangeTab(1, item)}>View On Map</RoundedButton>
                </View>
              </View>
            </View>
        )
    }
}