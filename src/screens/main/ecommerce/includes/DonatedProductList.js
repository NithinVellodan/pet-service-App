import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {React} from 'react';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
//svg
import Avatar from '../../../../assets/icons/avatar-new.svg';

export default function DonatedProductList({item}) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('DonatedProductDetail', {item: item})
            }
            key={item.id}
            activeOpacity={0.8}
            style={[styles.mainContainer]}>
            <View style={styles.shopContainer}>
                <View>
                    <Text style={styles.shopName}>
                        {item?.product_name?.length > 16
                            ? item.product_name.substring(0, 16) + '...'
                            : item.product_name}
                    </Text>
                </View>
            </View>

            <Image
                source={{
                    uri: item?.image,
                }}
                style={styles.imageFood}
            />
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
                            {item?.product_name
                                ? item.product_name.slice(0, 12) + '...'
                                : ''}
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
        margin: SIZE(8),
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
        height: SIZE(171),
        borderRadius: SIZE(20),
        borderWidth: SIZE(1),
    },
    imageFood: {
        width: SIZE(166),
        height: SIZE(160),
        borderRadius: SIZE(12),
        marginTop: SIZE(16),
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
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(5),
        borderRadius: SIZE(4),
        backgroundColor: '#EDEDED',
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
        color: '#969696',
    },
});
