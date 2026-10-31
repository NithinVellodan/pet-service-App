import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    FlatList,
} from 'react-native';
//
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';

const shopData = [
    {
        key: '1',
        imageSource: require('../../../../assets/images/ecommerce/customer/pet-food.png'),
        text: 'Pet Food',
    },
    {
        key: '2',
        imageSource: require('../../../../assets/images/ecommerce/customer/pet-cage.png'),
        text: 'Pet Cages',
    },
    {
        key: '3',
        imageSource: require('../../../../assets/images/ecommerce/customer/pet-food.png'),
        text: 'Pet Food',
    },
];

const ShopItem = () => {
    const navigation = useNavigation();
    const renderItem = ({item, index}) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('ProductCustomer')}
            activeOpacity={0.8}
            style={[
                styles.mainContainer,
                index === shopData.length - 1 && {marginRight: SIZE(0)},
            ]}>
            <ImageBackground style={styles.petImage} source={item.imageSource}>
                <View>
                    <Text style={styles.petText}>{item.text}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                bounces={false}
                data={shopData}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: SIZE(16),
        marginHorizontal: SIZE(16),
        marginBottom: SIZE(40),
    },

    mainContainer: {
        marginRight: SIZE(16),
    },
    petImage: {
        overflow: 'hidden',
        borderRadius: SIZE(12),
        width: SIZE(186),
        height: SIZE(234),
        paddingTop: SIZE(32),
        paddingHorizontal: SIZE(14),
        alignItems: 'center',
    },
    petText: {
        color: '#fff',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
});

export default ShopItem;
