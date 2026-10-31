import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';

//
import {FONTS} from '../../../../theme/fonts';
import {SIZE, SIZES} from '../../../../theme/theme';

const AlsoLikes = ({
    similar_products,
    setSizevarientSelection,
    setSingleItemPk,
}) => {
    const likeData = [
        {
            id: 1,
            image: require('../../../../assets/images/ecommerce/customer/food4.png'),
            title: 'Cat Collars ',
            descriptions: 'Min. 50% Off',
            status: 'Shop now',
        },
        {
            id: 2,
            image: require('../../../../assets/images/ecommerce/customer/food5.png'),
            title: 'Cat Collars ',
            descriptions: 'Min. 50% Off',
            status: 'Shop now',
        },
        {
            id: 3,
            image: require('../../../../assets/images/ecommerce/customer/food2.png'),
            title: 'Cat Collars ',
            descriptions: 'Min. 50% Off',
            status: 'Shop now',
        },
        {
            id: 4,
            image: require('../../../../assets/images/ecommerce/customer/food3.png'),
            title: 'Cat Collars ',
            descriptions: 'Min. 50% Off',
            status: 'Shop now',
        },
    ];

    const renderItem = ({item, index}) => (
        <View
            style={[
                styles.subContainer,
                {
                    marginRight: index === likeData.length - 1 ? 0 : SIZE(16),
                },
            ]}>
            <View style={styles.renderContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: item.image}} style={styles.petImage} />
                </View>
                <View>
                    <View style={{marginBottom: SIZE(8), width: SIZE(100)}}>
                        <Text numberOfLines={1} style={styles.headingText}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{width: SIZE(100)}}>
                        <Text numberOfLines={1} style={styles.descriptions}>
                            {item.description}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setSingleItemPk(item.id);
                            setSizevarientSelection(null);
                        }}
                        activeOpacity={0.8}
                        style={styles.shopButton}>
                        <Text style={styles.shopText}>Shop now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <FlatList
            bounces={false}
            data={similar_products}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            style={styles.mainContainer}
            contentContainerStyle={{
                paddingHorizontal: SIZE(16),
                marginBottom: SIZE(32),
            }}
        />
    );
};

export default AlsoLikes;

const styles = StyleSheet.create({
    subContainer: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        width: SIZE(260),
        borderWidth: 1,
        borderColor: '#eee',
    },
    renderContainer: {
        flexDirection: 'row',
    },
    imageContainer: {
        width: SIZE(100),
        height: SIZE(100),
        marginRight: SIZE(16),
    },
    petImage: {
        width: SIZE(100),
        height: SIZE(100),
        borderRadius: SIZE(8),
    },
    headingText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
    },
    descriptions: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        width: SIZES.width * 0.25,
    },
    shopButton: {
        marginTop: SIZE(16),
        borderRadius: SIZE(4),
        backgroundColor: '#009FD3',
        paddingHorizontal: SIZE(24),
        paddingVertical: SIZE(8),
    },
    shopText: {
        fontSize: SIZE(12),
        color: '#fff',
        fontFamily: FONTS.bold,
    },
});
