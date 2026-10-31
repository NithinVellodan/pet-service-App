import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {SIZE, SIZES} from '../../../../theme/theme';

const Banner = ({spotlightData, navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigateTo = item => {
        if (item?.banner_type == '20') {
            navigation.navigate('ShopDetail', {
                id: item?.store,
            });
        } else if (item?.banner_type == '30') {
            navigation.navigate('ProductDetail', {
                id: item?.product_variant,
            });
        } else if (item?.banner_type == '40') {
            navigation.navigate('ProductCustomer', {
                id: item?.product_category,
            });
        }
    };

    const renderDots = () => {
        return (
            <View style={styles.dotsContainer}>
                {spotlightData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                width:
                                    index === currentIndex ? SIZE(10) : SIZE(8),
                                height:
                                    index === currentIndex ? SIZE(10) : SIZE(8),
                                borderRadius:
                                    index === currentIndex
                                        ? SIZE(6.5)
                                        : SIZE(5),
                                backgroundColor:
                                    index === currentIndex
                                        ? '#009FD3'
                                        : '#98C1D9',
                            },
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <View>
            <SwiperFlatList
                onChangeIndex={index => setCurrentIndex(index.index)}
                data={spotlightData}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigateTo(item);
                        }}
                        activeOpacity={0.8}
                        style={styles.swiperMain}>
                        <Image
                            source={{uri: item.image}}
                            style={styles.swiperSub}
                        />
                    </TouchableOpacity>
                )}
            />
            {renderDots()}
        </View>
    );
};

export default Banner;

const styles = StyleSheet.create({
    swiperMain: {
        flex: 1,
        overflow: 'hidden',
        width: SIZES.width,
        height: SIZE(161),
    },
    swiperSub: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZE(15),
    },
    dot: {
        borderRadius: SIZE(5),
        marginHorizontal: SIZE(5),
    },
});
