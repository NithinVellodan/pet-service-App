import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

export default function ProductImage({
    SwiperFlatList,
    currentIndex,
    setCurrentIndex,
    gallery,
}) {
    const spotlightData = [
        {
            id: 1,
            image: require('../../../../assets/images/loaderGallery.jpeg'),
        },
    ];
    return (
        <View style={styles.topImageContainer}>
            <SwiperFlatList
                onChangeIndex={index => setCurrentIndex(index.index)}
                data={gallery ? gallery : spotlightData}
                renderItem={({item}) => (
                    <View style={styles.swiperMain}>
                        {gallery ? (
                            <Image
                                source={{uri: item.image}}
                                style={styles.swiperSub}
                            />
                        ) : (
                            <Image
                                source={item.image}
                                style={styles.swiperSub}
                            />
                        )}
                    </View>
                )}
            />
            {gallery?.length > 1 && (
                <View style={styles.swiperNumberMain}>
                    <View style={styles.swiperNumber}>
                        <Text style={styles.swiperNumberText}>
                            {currentIndex + 1}/{gallery?.length}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    topImageContainer: {
        marginBottom: SIZE(24),
        width: SIZES.width,
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
        width: SIZE(72),
        alignItems: 'center',
    },
    swiperNumberText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
});
