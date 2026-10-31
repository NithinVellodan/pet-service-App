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
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';

//svg

const LostBannerSection = ({state, setUserModal, setScreen}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                if (state.userData.is_login) {
                    navigation.navigate('LostAndFoundListPage');
                } else {
                    setUserModal(true);
                    setScreen('login');
                }
            }}
            activeOpacity={0.8}
            style={styles.mainContainer}>
            <View>
                <ImageBackground
                    source={require('../../../assets/images/banner@1.png')}
                    style={styles.subContainer}>
                    <View style={{justifyContent: 'flex-end'}}>
                        <Text style={styles.donateText}>Explore Lost Pets</Text>
                        <Text
                            style={[
                                styles.descriText,
                                {marginBottom: SIZE(10), width: SIZE(200)},
                            ]}>
                            Seen a lost pet? Help reunite them with their
                            families today.{' '}
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('LostAndFoundListPage')
                            }
                            activeOpacity={0.8}
                            style={styles.shopNowContainer}>
                            <Text style={styles.shopText}>Explore</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

export default LostBannerSection;

const styles = StyleSheet.create({
    mainContainer: {},
    subContainer: {
        padding: SIZE(20),
        borderRadius: SIZE(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        height: SIZE(150),
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
        backgroundColor: '#003459',
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
        color: '#FFFFFF',
        fontFamily: FONTS.bold,
    },
});
