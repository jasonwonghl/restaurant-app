import React from 'react'
import { View, Modal } from 'react-native'
import RoundedButton from './RoundedButton'
import RestaurantDetailScreen from '../Containers/RestaurantDetailScreen'

export default class RestaurantDetailButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render () {
    return (
        <View>
          <RoundedButton onPress={this.toggleModal}>
            View Details
          </RoundedButton>
          <Modal
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}>
            <RestaurantDetailScreen
                item={this.props.item}
                imageURI={this.props.imageURI}
                screenProps={{ toggle: this.toggleModal }}
            />
          </Modal>
        </View>
      )
  }
}
