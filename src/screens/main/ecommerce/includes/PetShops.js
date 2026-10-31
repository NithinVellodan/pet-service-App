import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import {React} from 'react';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
//svg
import StarIcon from '../../../../assets/icons/star.svg';
import StarDot from '../../../../assets/icons/map-view/starDot.svg';
import Avatar from '../../../../assets/icons/avatar-new.svg';

export default function PetShops({item}) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('ShopDetail', {
                    id: item?.id,
                })
            }
            key={item.id}
            activeOpacity={0.8}
            style={[styles.mainContainer]}>
            <View style={styles.shopContainer}>
                <View>
                    <Text style={styles.shopName}>
                        {item?.name?.length > 16
                            ? item?.name?.substring(0, 16) + '...'
                            : item?.name}
                    </Text>
                </View>
            </View>
            <View style={[styles.imageFood, {borderRadius: SIZE(12)}]}>
                <ImageBackground
                    source={{
                        uri: item?.image,
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'flex-end',
                    }}>
                    <View style={styles.ratingContainer}>
                        <View style={styles.starContainer}>
                            {item?.rating > 0 ? (
                                <StarIcon width={'100%'} height={'100%'} />
                            ) : (
                                <StarDot width={'100%'} height={'100%'} />
                            )}
                        </View>
                        <Text allowFontScaling={false} style={styles.starText}>
                            {item?.rating > 0
                                ? parseFloat(item?.rating?.toFixed(1))
                                : 'New'}
                        </Text>
                    </View>
                </ImageBackground>
            </View>

            <View
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: SIZE(16),
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={styles.avatarImageContainer}>
                        {item?.provider_details?.image ? (
                            <Image
                                source={{
                                    uri: item?.provider_details?.image,
                                }}
                                style={{width: '100%', height: '100%'}}
                            />
                        ) : (
                            <Avatar width={'100%'} height={'100%'} />
                        )}
                    </View>
                    <View style={{marginRight: SIZE(3)}}>
                        <Text style={styles.avatarName}>
                            {item?.provider_details?.name?.length > 7
                                ? item?.provider_details?.name.substring(0, 7) +
                                  '..'
                                : item?.provider_details?.name}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(12),
        backgroundColor: '#fff',
        borderRadius: SIZE(12),
        width: '46%',
        margin: 8,
    },
    shopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shopName: {
        color: '#00171F',
        fontFamily: FONTS.bold,
    },
    imageContainer: {
        width: SIZE(166),
        borderRadius: SIZE(20),
        borderWidth: SIZE(1),
    },
    imageFood: {
        width: SIZE(160),
        height: SIZE(160),
        borderRadius: SIZE(12),
        marginTop: SIZE(16),
        overflow: 'hidden',
        alignItems: 'flex-end',
    },
    avatarImageContainer: {
        borderRadius: SIZE(32),
        width: SIZE(32),
        height: SIZE(32),
        overflow: 'hidden',
    },
    avatarImage: {
        width: SIZE(32),
        height: SIZE(32),
        borderRadius: SIZE(32),
    },
    avatarName: {
        fontSize: SIZE(14),
        color: '#969696',
        fontFamily: FONTS.regular,
        marginLeft: SIZE(8),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(5),
        borderRadius: SIZE(30),
        backgroundColor: '#009FD3',
        width: SIZE(60),
        margin: SIZE(10),
    },
    starContainer: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
    starText: {
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#fff',
    },
});
