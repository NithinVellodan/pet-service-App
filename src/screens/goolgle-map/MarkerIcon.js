import React from 'react';
import {View, Text} from 'react-native';

const MarkerIcon = () => {
    return (
        <View>
            <Text>Marker Icon</Text>
        </View>
    );
};
export const standardStyle = [
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
];

export default MarkerIcon;
