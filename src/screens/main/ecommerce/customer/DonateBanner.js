import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import React from 'react';

// /constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';

//svg

const DonateBanner = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('ProductCustomer', {
                    tab: 'donatedProducts',
                })
            }
            activeOpacity={0.8}
            style={styles.mainContainer}>
            <View>
                <ImageBackground
                    source={require('../../../../assets/images/ecommerce/customer/vector-donate.png')}
                    style={styles.subContainer}>
                    <View>
                        <View>
                            <Text style={styles.donateText}>
                                Donated Products
                            </Text>
                        </View>
                        <View style={{paddingVertical: SIZE(16)}}>
                            <Text style={styles.descriText}>
                                A Ripple of Kindness.
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ProductCustomer', {
                                    tab: 'donatedProducts',
                                })
                            }
                            activeOpacity={0.8}
                            style={styles.shopNowContainer}>
                            <Text style={styles.shopText}>Shop now</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.giftBoxContainer}>
                        <Image
                            source={require('../../../../assets/images/ecommerce/customer/gift-box.png')}
                            style={styles.giftBox}
                        />
                        <View style={styles.shadow}></View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

export default DonateBanner;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(35),
    },
    subContainer: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(20),
        borderRadius: SIZE(12),
        backgroundColor: '#009FD3',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    giftBoxContainer: {
        width: SIZE(104),
        height: SIZE(104),
    },
    giftBox: {
        width: '100%',
        height: '100%',
    },
    shadow: {
        width: SIZE(54),
        height: SIZE(6),
        borderRadius: 100,
        shadowColor: '#242424',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 100,
        elevation: 5,
        alignSelf: 'center',
    },
    shopNowContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#EAF7FF',
        paddingHorizontal: SIZE(24),
        paddingVertical: SIZE(8),
        borderRadius: SIZE(4),
    },
    donateText: {
        fontSize: SIZE(18),
        color: '#F7F7F7',
        fontFamily: FONTS.semiBold,
    },
    descriText: {
        fontSize: SIZE(14),
        color: '#F7F7F7',
        fontFamily: FONTS.regular,
    },
    shopText: {
        fontSize: SIZE(12),
        color: '#009FD3',
        fontFamily: FONTS.bold,
    },
});
