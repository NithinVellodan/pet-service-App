import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
const ProductSpecification = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.specificationContainer}>
                <View>
                    <Text style={styles.heading}>Quantity</Text>
                </View>
                <View>
                    <Text style={styles.dot}>:</Text>
                </View>
                <View>
                    <Text style={styles.type}>1</Text>
                </View>
            </View>
            <View
                style={[
                    styles.specificationContainer,
                    {marginVertical: SIZE(16)},
                ]}>
                <View>
                    <Text style={styles.heading}>Size</Text>
                </View>
                <View>
                    <Text style={styles.dot}>:</Text>
                </View>
                <View>
                    <Text style={styles.type}>3kg</Text>
                </View>
            </View>
            <View style={styles.specificationContainer}>
                <View>
                    <Text style={styles.heading}>Flavor</Text>
                </View>
                <View>
                    <Text style={styles.dot}>:</Text>
                </View>
                <View>
                    <Text style={styles.type}> Ocean Fish</Text>
                </View>
            </View>
        </View>
    );
};

export default ProductSpecification;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: SIZE(16),
        marginBottom: SIZE(32),
    },
    specificationContainer: {
        flexDirection: 'row',
    },
    heading: {fontSize: SIZE(16), fontFamily: FONTS.semiBold, color: '#00171F'},
    dot: {
        fontFamily: FONTS.semiBold,
        color: '#00171F',
        marginHorizontal: SIZE(3),
    },
    type: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        color: '#009FD3',
    },
});
