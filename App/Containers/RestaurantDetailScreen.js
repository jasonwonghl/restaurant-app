import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
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
            <Image source={{ uri: imageURI }} style={styles.logo} />
          </View>

          <Text style={styles.sectionText}>{item.name}</Text>
          <Text style={styles.sectionText}>Price: ('$').repeat({item.price})</Text>
          <Text style={styles.sectionText}>Rating: {item.rating}</Text>
          <Text style={styles.sectionText}>{item.formatted_address}</Text>
        </ScrollView>
      </View>
    )
  }
}

