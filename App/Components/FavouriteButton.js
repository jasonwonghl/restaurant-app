import React, { PureComponent } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/FavouriteButtonStyles'

class FavouriteButton extends PureComponent {
  render () {
    return (
      <TouchableOpacity style={[styles.button, this.props.styles ? this.props.styles : null]} onPress={this.props.onFavourite}>
        <Image style={styles.buttonImage} source={this.props.favourite ? Images.favouriteSelectedIcon : Images.favouriteIcon} resizeMode="contain" />
      </TouchableOpacity>
    )
  }
}

export default FavouriteButton
