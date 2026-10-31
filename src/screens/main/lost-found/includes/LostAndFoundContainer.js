import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
// constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import LocationBlack from '../../../../assets/icons/locationblack.svg';

const LostAndFoundContainer = ({item}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('LostAndFoundSinglePage', {id: item?.id});
            }}
            activeOpacity={0.8}
            style={styles.mainContainer}>
            <View style={[styles.imageFood]}>
                <ImageBackground
                    source={{uri: item?.image}}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}></ImageBackground>
            </View>
            <View style={styles.subTextContainer}>
                <Text style={styles.name}>{item?.pet_name}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        marginTop: SIZE(10),
                    }}>
                    <LocationBlack />
                    <Text style={styles.avatarName}>{item?.location}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        borderRadius: SIZE(12),
        width: '48%',
        // padding: SIZE(10),
    },
    subTextContainer: {
        padding: SIZE(10),
    },
    shopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shopName: {
        color: '#00171F',
        fontFamily: FONTS.bold,
        fontSize: SIZE(16), // Ensure a font size is specified
    },
    imageContainer: {
        width: SIZE(166),
        borderWidth: SIZE(1),
    },
    imageFood: {
        width: '100%',
        height: SIZE(160),
        borderTopLeftRadius: SIZE(12),
        borderTopRightRadius: SIZE(12),
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
        fontSize: SIZE(12),
        color: '#242424',
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
    name: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        marginTop: SIZE(5),
    },
});

export default LostAndFoundContainer;
