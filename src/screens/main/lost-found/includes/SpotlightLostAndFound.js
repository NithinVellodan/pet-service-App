import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import LocationIcon from '../../../../assets/icons/locationblue.svg';
import {useRoute} from '@react-navigation/native';

//images and logos
import MaleLogo from '../../../../assets/icons/male.svg';
import FemaleLogo from '../../../../assets/icons/female.svg';
const SpotlightLostAndFound = ({
    images,
    description,
    gender,
    name,
    pet_type,
}) => {
    const route = useRoute();
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View>
            <View style={styles.topImageContainer}>
                <SwiperFlatList
                    onChangeIndex={index => setCurrentIndex(index.index)}
                    data={images}
                    renderItem={({item}) => (
                        <View style={styles.swiperMain}>
                            <Image
                                source={{uri: item.image}}
                                style={styles.swiperSub}
                            />
                        </View>
                    )}
                />
                {images?.length > 1 ? (
                    <View style={styles.swiperNumberMain}>
                        <View style={styles.swiperNumber}>
                            <Text style={styles.swiperNumberText}>
                                {currentIndex + 1}/{images?.length}
                            </Text>
                        </View>
                    </View>
                ) : (
                    ''
                )}
            </View>

            <View style={styles.detailsSection}>
                <View style={styles.mainContainerPet}>
                    <View style={styles.headingContainer}>
                        <Text
                            allowFontScaling={false}
                            style={styles.headingText}>
                            {name}
                        </Text>
                        <View style={styles.typeContainer}>
                            <Text
                                style={styles.typeText}
                                allowFontScaling={false}>
                                {pet_type}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            alignSelf: 'center',
                            flexDirection: 'row',
                        }}>
                        {gender === '10' ? (
                            <MaleLogo
                                style={{marginRight: SIZE(10)}}
                                height={SIZE(24)}
                                width={SIZE(24)}
                            />
                        ) : (
                            <FemaleLogo
                                style={{marginRight: SIZE(10)}}
                                height={SIZE(24)}
                                width={SIZE(24)}
                            />
                        )}
                        <Text
                            style={[styles.genderText, {lineHeight: SIZE(20)}]}>
                            {parseInt(gender, 10) === 10
                                ? 'Male'
                                : parseInt(gender, 10) === 20
                                ? 'Female'
                                : 'Not specified'}
                        </Text>
                    </View>
                </View>

                <Text allowFontScaling={false} style={styles.descriptionText}>
                    {description}
                </Text>
            </View>
        </View>
    );
};

export default SpotlightLostAndFound;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    topImageContainer: {
        marginBottom: SIZE(24),
        width: SIZES.width,
        height: SIZE(316),
    },
    swiperMain: {
        flex: 1,
        overflow: 'hidden',
        width: SIZES.width,
        height: SIZE(316),
    },
    swiperSub: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    swiperNumberMain: {
        padding: SIZE(16),
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
        right: 0,
    },
    swiperNumber: {
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(6),
        borderRadius: SIZE(61),
        minWidth: SIZE(59),
        alignItems: 'center',
    },
    swiperNumberText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    detailsSection: {
        paddingHorizontal: SIZE(16),
    },
    mainContainerPet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headingText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    typeContainer: {
        borderWidth: SIZE(1),
        backgroundColor: '#fff',
        borderColor: '#ededed',
        borderRadius: SIZE(20),
        paddingVertical: SIZE(6),
        paddingHorizontal: SIZE(14),
        alignItems: 'center',
        marginLeft: SIZE(12),
    },
    typeText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },

    descriptionText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        marginTop: SIZE(13),
    },

    genderText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
});
