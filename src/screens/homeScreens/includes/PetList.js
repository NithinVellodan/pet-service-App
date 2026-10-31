import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

//packages
import {useNavigation} from '@react-navigation/native';

//components
import Location from '../../../assets/icons/booking/location.svg';

//constants
import {FONTS} from '../../../theme/fonts';
import {SIZE} from '../../../theme/theme';

const PetList = ({petData, petsAvailable, petimage}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            key={petData.id}
            onPress={() => {
                navigation.navigate('ServiceProviderSinglePage', {
                    type: 'Place_ToStay',
                    pk: petData.id,
                });
            }}
            activeOpacity={0.8}
            style={styles.listItem}>
            <View style={styles.listleftImage}>
                {petData.image && (
                    <Image
                        style={{height: '100%', width: '100%'}}
                        source={{uri: petData.image}}
                        resizeMode="cover"
                    />
                )}
            </View>
            <View style={styles.listDetails}>
                <View style={styles.listDetailsTop}>
                    <Text
                        allowFontScaling={false}
                        style={styles.listDetailsName}>
                        {petData.title}
                    </Text>
                </View>
                <View style={styles.recentLocationIcon}>
                    <Location width={20} height={20} />
                    <Text
                        allowFontScaling={false}
                        style={styles.recentLocationName}>
                        {petData.location}
                    </Text>
                </View>
                <Text
                    allowFontScaling={false}
                    style={styles.listDetailsDescription}>
                    {petData.description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default PetList;

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 10,
        marginBottom: SIZE(16),
    },
    listleftImage: {
        width: SIZE(136),
        height: SIZE(122),
        overflow: 'hidden',
        borderTopLeftRadius: SIZE(10),
        borderBottomLeftRadius: SIZE(10),
    },
    listDetails: {
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: SIZE(12),
    },
    listDetailsTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listDetailsName: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        color: '#242424',
    },
    listDetailsNotify: {
        backgroundColor: '#42A7EF26',
        color: '#003459',
        paddingHorizontal: 5,
        borderRadius: 100,
        fontSize: SIZE(12),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
    disable: {
        backgroundColor: '#CF29291A',
        color: '#CF2929',
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(15),
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(4),
        borderRadius: SIZE(4),
    },
    recentLocationIcon: {
        flexDirection: 'row',
        marginVertical: SIZE(8),
    },
    recentLocationName: {
        marginLeft: SIZE(4),
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(18),
        color: '#757575',
    },
    listDetailsDescription: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(16),
        color: '#757575',
    },
});
