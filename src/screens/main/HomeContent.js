import {StyleSheet, Text, View, TouchableOpacity, Image, Platform} from 'react-native';
import React, {useContext} from 'react';
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';

const HomeContent = ({navigation}) => {
    const {state} = useContext(Context);

    const petData = [
        {
            id: 1,
            image: require('../../assets/images/image1.png'),
            heading: 'Place to Stay',
            description: 'Leo vivamus auctor massa vitae id vel turpis.',
            redirect: () => {
                if (state.userData.is_service) {
                    navigation.navigate('PlaceToStay', {type: 'Place_ToStay'});
                } else if (!state.userData.is_service) {
                    navigation.navigate('BottomSheet', {
                        direction_of: 'Place_to_stay',
                        header: 'Place to Stay',
                    });
                }
            },
        },
        {
            id: 2,
            image: require('../../assets/images/image2.png'),
            heading: 'Borrow a Pet',
            description: 'Leo vivamus auctor massa vitae id vel turpis.',
            redirect: () => {
                if (state.userData.is_service) {
                    navigation.navigate('PlaceToStay', {type: 'BorrowAPet'});
                } else if (!state.userData.is_service) {
                    navigation.navigate('BottomSheet', {
                        direction_of: 'Borrow',
                        header: 'Borrow A Pet',
                    });
                }
            },
        },
        {
            id: 3,
            image: require('../../assets/images/image3.png'),
            heading: 'Shop for your Pet',
            description: 'Leo vivamus auctor massa vitae id vel turpis.',
            redirect: () => {
                if (state.userData.is_service) {
                    if (state.userData?.store_add) {
                        navigation.navigate('EcommerceTab');
                    } else {
                        navigation.navigate('ShopProvider');
                    }
                } else if (!state.userData.is_service) {
                    navigation.navigate('EcommerceTab');
                }
            },
        },
        {
            id: 4,
            image: require('../../assets/images/image4.png'),
            heading: 'Trainers',
            description: 'Leo vivamus auctor massa vitae id vel turpis.',
            redirect: () => {
                if (state.userData.is_service) {
                    navigation.navigate('TrainerSingle');
                } else if (!state.userData.is_service) {
                    navigation.navigate('BottomSheet', {
                        direction_of: 'Trainers',
                        header: 'Trainers',
                    });
                }
            },
        },
    ];

    return (
        <View style={styles.detailSection}>
            {petData.map((item, index) => (
                <View key={index} style={styles.imageMainContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            item.redirect();
                        }}>
                        <View style={styles.petImageContainer}>
                            <Image
                                style={styles.petImage}
                                source={item.image}
                            />
                        </View>
                        <View style={styles.sectionDetailContainer}>
                            <View style={styles.placeTextContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.placeText}>
                                    {item.heading}
                                </Text>
                            </View>
                            <View style={styles.spanContainer}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.spanText}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default HomeContent;

const styles = StyleSheet.create({
    detailSection: {
        paddingTop: SIZE(48),
        borderRadius: SIZE(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    imageMainContainer: {
        overflow: 'hidden',
        width: '48%',
        marginBottom: SIZE(16),
        borderRadius: SIZE(16),
        ...Platform.select({
            ios: {
                shadowColor: '#E9E9E9',
                shadowOffset: {width: 0.8, height: 0.8},
                shadowOpacity: 0.8,
                shadowRadius: SIZE(1),
            },
            android: {
                elevation: 1,
            },
        }),
        backgroundColor: '#FFFFFF',
        zIndex: 1,
    },
    sectionDetailContainer: {
        marginVertical: SIZE(16),
        marginHorizontal: SIZE(12),
        borderRadius: SIZE(16),
    },
    petImageContainer: {
        height: SIZE(127),
        borderTopRightRadius: SIZE(16),
    },
    petImage: {
        width: '100%',
        height: '100%',
    },
    placeText: {
        color: '#242424',
        fontWeight: '600',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
    },
    spanText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '10%',
        flexDirection: 'row',
    },
});
