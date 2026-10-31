import React from 'react';
import {StyleSheet, Image} from 'react-native';

import Thumb from '../../../assets/icons/thumb.svg';

class CustomMarker extends React.Component {
    render() {
        return (
            <Image
                style={styles.image}
                source={
                    this.props.pressed
                        ? require('../../../assets/icons/thumb.png')
                        : require('../../../assets/icons/thumb.png')
                }
                resizeMode="contain"
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 40,
        width: 40,
    },
});

export default CustomMarker;
