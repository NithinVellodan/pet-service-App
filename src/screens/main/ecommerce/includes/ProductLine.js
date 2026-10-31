import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const ProductLine = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: SIZE(16),
                marginTop: SIZE(40),
            }}>
            <View
                style={{
                    width: SIZE(153.5),
                    borderColor: '#D3D3D3',
                    borderBottomWidth: SIZE(1),
                }}></View>
            <View>
                <Text
                    style={{
                        color: '#242424',
                        fontSize: SIZE(12),
                        fontFamily: FONTS.bold,
                    }}>
                    Product
                </Text>
            </View>

            <View
                style={{
                    width: SIZE(153.5),
                    borderColor: '#D3D3D3',
                    borderBottomWidth: SIZE(1),
                }}></View>
        </View>
    );
};

export default ProductLine;

const styles = StyleSheet.create({});
