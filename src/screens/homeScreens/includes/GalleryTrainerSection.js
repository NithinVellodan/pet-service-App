import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import React from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const GalleryTrainerSection = ({gallery}) => {
    const ImageSection = [
        {
            id: 1,
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROS9xihwFLG58QP1W-gIpjYa3xv3FMWKi0NeMOS8CfyS8giXpCpI5V_Xxn_VTZ8obJzNU&usqp=CAU',
        },
        {
            id: 1,
            src: 'https://w0.peakpx.com/wallpaper/399/929/HD-wallpaper-spy-dog-in-garden-pet-sweet-animal-dog.jpg',
        },
        {
            id: 1,
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtV0oi6jHk50Db5IjNnls2bLKjV-xLpj8VjKsSxYOfXegjMj46ZfnBmZ4MGmTke9Q-57c&usqp=CAU',
        },
        {
            id: 1,
            src: 'https://c4.wallpaperflare.com/wallpaper/11/736/1021/dogs-shetland-sheepdog-dog-flower-wallpaper-preview.jpg',
        },
        {
            id: 1,
            src: 'https://st2.depositphotos.com/4568481/11839/i/950/depositphotos_118391156-stock-photo-red-shetland-sheepdog-on-blooming.jpg',
        },
        {
            id: 1,
            src: 'https://images4.alphacoders.com/938/938896.jpg',
        },
        {
            id: 1,
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh2U5RpMQHePDwGPDVWVQAaar0mBHy93jh_Udq8AWtZ459zQhmdirNlvOVklBEyhmvUi8&usqp=CAU',
        },
        {
            id: 1,
            src: 'https://cdn.wallpapersafari.com/56/32/Deptgi.jpg',
        },
        {
            id: 1,
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQreMcSd9G-EUBaGkdQ_IuyflrCiUiKT7QkErtz_xWHib_nZmw_zwzVsluYZSqRs3wyCtE&usqp=CAU',
        },
    ];

    return (
        <View
            style={{
                borderColor: '#E2E2E2',
                backgroundColor: '#F7F7F7',
            }}>
            <Text style={styles.header}>Images</Text>
            <FlatList
                bounces={false}
                data={gallery}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <View
                        style={{
                            width: SIZE(119),
                            height: SIZE(100),
                            borderRadius: SIZE(6),
                            margin: SIZE(5),
                        }}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: SIZE(6),
                            }}
                            source={{uri: item.image}}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default GalleryTrainerSection;

const styles = StyleSheet.create({
    aboutServices: {
        paddingVertical: SIZE(20),
    },
    header: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        marginBottom: SIZE(10),
    },
});
