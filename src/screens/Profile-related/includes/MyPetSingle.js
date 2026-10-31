import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

//packages
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const MyPetSingle = ({petData, route}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('MyPetsSingleCustomer', {
                    pk: petData.id,
                });
            }}
            activeOpacity={0.8}
            style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: petData.image}} />
                </View>
                <View style={styles.titleContainer}>
                    <Text allowFontScaling={false} style={styles.title}>
                        {petData.pet_name}
                    </Text>
                    <Text allowFontScaling={false} style={styles.subTitle}>
                        {petData.breed_name}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MyPetSingle;

const styles = StyleSheet.create({
    mainContainer: {
        width: SIZE(186),
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        overflow: 'hidden',
        marginBottom: SIZE(16),
        marginRight: SIZE(16),
        // elevation: 1,
    },
    subContainer: {},
    imageContainer: {
        width: SIZE(190),
        height: SIZE(184),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        paddingVertical: SIZE(12),
        paddingHorizontal: SIZE(16),
    },
    title: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        fontWeight: '600',
        textAlign: 'center',
    },
    subTitle: {
        color: '#757575',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '400',
        textAlign: 'center',
    },
});
