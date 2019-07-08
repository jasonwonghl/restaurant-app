import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import Secrets from 'react-native-config'
import { Rating } from 'react-native-ratings'
import { Images, Colors } from '../Themes'
import FavouriteButton from '../Components/FavouriteButton'

// Styles
import styles from '../Themes/ApplicationStyles'

export default class RestaurantDetailScreen extends React.Component {
  render () {
    const { item } = this.props;

    const imageURI = Secrets.PHOTO_URL + '?maxwidth=400&photoreference=' + item.photos[0].photo_reference + '&key=' + Secrets.GOOGLE_MAPS_API_KEY;

    return (
      <View style={[styles.screen.mainContainer, {backgroundColor: Colors.purple}]}>
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={styles.screen.closeButton}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.screen.container}>
          <FavouriteButton 
            onFavourite={ () => this.props.onFavourite(item.id)} 
            favourite={this.props.favourites.includes(item.id)}
            styles={{top: 25}}
          />

          <View style={styles.screen.fullWidthImagePlaceholder}>
            <Image
              source={{ uri: imageURI }}
              style={styles.screen.fullWidthImage}
              resizeMode="cover"
            />
          </View>

          <View>
            <Text style={[styles.screen.sectionText, styles.screen.titleText, { textAlign: 'center'}]}>{item.name.toUpperCase()}</Text>

            <Text style={[styles.screen.titleText, {textAlign: 'center'}]}>{`Price:` + ('$').repeat(item.price_level)}</Text>

            <Rating
              startingValue={item.rating}
              ratingCount={5}
              showRating={true}
              fractions={2}
              imageSize={20}
              type='custom'
              ratingBackgroundColor={Colors.yellow}
              tintColor={Colors.yellow}
            />
            
            <Text style={{color: 'white', padding: 40, textAlign: 'center'}}>{item.formatted_address}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

