import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Rating } from 'react-native-ratings'
import { Images } from '../../ignite/DevScreens/DevTheme'

// Styles
import styles from '../../ignite/DevScreens/Styles/PresentationScreenStyles'

export default class RestaurantDetailScreen extends React.Component {
  render () {
    const { item, imageURI } = this.props;

    return (
      <View style={[styles.mainContainer, {backgroundColor: '#3e243f'}]}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 10,
          zIndex: 10
        }}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.container}>
          <View style={styles.centered}>
            <Image source={{ uri: imageURI }} style={{width: '100%'}} />
          </View>

          <Text style={styles.titleText}>{item.name}</Text>
          <Text>{`Price:` + ('$').repeat(item.price)}</Text>
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
          <Text>{item.formatted_address}</Text>
        </ScrollView>
      </View>
    )
  }
}

