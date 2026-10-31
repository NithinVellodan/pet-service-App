import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import React from 'react';

//constant
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

//svg
import StarIcon from '../../../../assets/icons/star.svg';
import StarDot from '../../../../assets/icons/map-view/starDot.svg';

import {useNavigation} from '@react-navigation/native';

const Offer = ({item, index, length}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('ProductDetail', {
                    id: item.product_pk,
                })
            }
            activeOpacity={0.8}
            style={{
                marginRight: index === length - 1 ? 20 : 0,
                marginLeft: index === 0 ? 15 : 10,
            }}
            key={item.id}>
            <ImageBackground
                source={{uri: item.image}}
                // resizeMode="cover"
                style={styles.offerImage}>
                <View style={styles.overlay} />

                <View>
                    <Text numberOfLines={1} style={styles.mainHeading}>
                        {item?.title}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={{width: SIZE(178)}}>
                        <Text numberOfLines={1} style={[styles.subHeading]}>
                            {item?.product_variant_name}
                        </Text>
                    </View>
                    <View style={[styles.starIcon]}>
                        <View style={styles.dot}></View>
                        {item?.rating > 0 ? (
                            <StarIcon width={20} height={20} />
                        ) : (
                            <StarDot width={20} height={20} />
                        )}
                        <Text
                            style={[styles.subHeading, {marginLeft: SIZE(4)}]}>
                            {item?.rating > 0
                                ? parseFloat(item?.rating?.toFixed(1))
                                : 'New'}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default Offer;

const styles = StyleSheet.create({
    offerImage: {
        overflow: 'hidden',
        borderRadius: SIZE(12),
        width: SIZE(284),
        height: SIZE(170),
        // marginVertical: SIZE(30),
        justifyContent: 'flex-end',
        paddingVertical: SIZE(18),
        paddingHorizontal: SIZE(14),
    },
    mainHeading: {
        fontSize: SIZE(24),
        color: '#fff',
        fontFamily: FONTS.medium,
        fontWeight: '500',
    },
    subHeading: {
        color: '#fff',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontFamily: '400',
        lineHeight: SIZE(20),
        marginRight: SIZE(4),
    },
    dot: {
        width: SIZE(4),
        height: SIZE(4),
        borderRadius: SIZE(8),
        backgroundColor: '#F3F4F5',
        marginHorizontal: SIZE(6),
    },
    starIcon: {
        // width: SIZE(20),
        // height: SIZE(16),
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        padding: SIZE(14),
    },
});
