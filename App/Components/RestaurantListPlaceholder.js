import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Placeholder, { Line, Media } from 'rn-placeholder'
import { Colors } from '../Themes'

class RestaurantListPlaceholder extends PureComponent {
  renderPlaceholders = () => {

    let placeholders = [];

    for (var i = 0; i < this.props.numPlaceholders; i++) {
      placeholders.push(
        <Placeholder
          isReady={this.isReady}
          animation="fade"
          renderLeft={() => <Media style={{ width: 90, height: 90, marginHorizontal: 10,  backgroundColor: Colors.eggplant}} />}
        >
          <Line width="70%" style={{ backgroundColor: Colors.eggplant }} />
          <Line style={{ backgroundColor: Colors.eggplant }} />
          <Line style={{ backgroundColor: Colors.eggplant }} />
          <Line width="30%" style={{ marginBottom: 20, backgroundColor: Colors.eggplant }} />
        </Placeholder>
      );
    }

    return placeholders;
  }
  
  render () {
    return (
      <View style={{opacity:0.8}}>
        {this.renderPlaceholders()}
      </View>
    )
  }
}

export default RestaurantListPlaceholder
