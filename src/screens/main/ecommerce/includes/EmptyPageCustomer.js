import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

//svg

export const EmptyPageCustomerProduct = ({image, heading, description}) => {
    return (
        <View style={[styles.mainContainer, {height: null}]}>
            <View style={[styles.imageContainer, {marginTop: SIZE(20)}]}>
                {image}
            </View>
            <View style={[styles.headingContainer, {marginTop: 10}]}>
                <Text style={[styles.headingText, {fontSize: SIZE(16)}]}>
                    {heading}
                </Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>
        </View>
    );
};

const EmptyPageCustomer = ({
    image,
    heading,
    description,
    button,
    shop_now_button,
}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>{image}</View>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>{heading}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>
            {shop_now_button !== false ? (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addStoreButton}
                    onPress={() => navigation.navigate('Shops')}>
                    <Text
                        allowFontScaling={false}
                        style={styles.addStoreButtonText}>
                        {button}
                    </Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

export default EmptyPageCustomer;

const styles = StyleSheet.create({
    mainContainer: {
        height: SIZE(500),
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {},
    headingContainer: {
        marginTop: SIZE(60),
    },
    headingText: {
        fontSize: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#000000',
    },
    descriptionContainer: {
        marginVertical: SIZE(12),
    },
    descriptionText: {
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        color: '#686868',
    },
    addStoreButton: {
        padding: SIZE(10),
        backgroundColor: '#009FD3',
        width: SIZE(145),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(6),
        marginTop: SIZE(20),
    },
    addStoreButtonText: {
        color: '#FFF',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
