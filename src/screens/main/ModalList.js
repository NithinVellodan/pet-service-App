import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
//packages
import {useNavigation, useRoute} from '@react-navigation/native';
// components
import MapHeader from '../../components/header/MapHeader';
import CommonListSingle from '../includes/commonlist/CommonListSingle';
//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';
//images and logos
import MapIcon from '../../assets/icons/map.svg';

const ModalList = ({}) => {
    const {state} = useContext(Context);
    const navigation = useNavigation();
    const route = useRoute();
    //states
    const [isNewArrival, setIsNewArrival] = useState(
        route?.params?.is_payment === true ? true : false,
    );
    const [wishlist, setWishlist] = useState({});
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(1);

    //demo array
    const filterArray = [
        {
            id: 1,
            name: 'Place to Stay',
        },
        {
            id: 2,
            name: 'Borrow a Pet',
        },
        {
            id: 3,
            name: 'Shop for your Pet',
        },
    ];
    const filterArrayTwo = [
        {
            id: 1,
            name: 'Place to Stay',
        },
        {
            id: 2,
            name: 'Borrow a Pet',
        },
        {
            id: 3,
            name: 'Trainer',
        },
    ];

    const modalList = [
        {
            id: 1,
            image: require('../../assets/images/list1.png'),
            name: 'Paw and Whiz Petcare',
            description: 'Mollis et et adipiscing adipiscing faucibus magna.',
            price: 60,
            rating: 4,
        },
        {
            id: 2,
            image: require('../../assets/images/list2.png'),
            name: 'Paw Shine',
            description: 'Mollis et et adipiscing adipiscing faucibus magna.',
            price: 60,
            rating: 4,
        },
        {
            id: 3,
            image: require('../../assets/images/list3.png'),
            name: 'Lora Pets',
            description: 'Mollis et et adipiscing adipiscing faucibus magna.',
            price: 60,
            rating: 4,
        },
        {
            id: 4,
            image: require('../../assets/images/list4.png'),
            name: 'Wolf N Pack Dog',
            description: 'Mollis et et adipiscing adipiscing faucibus magna.',
            price: 60,
            rating: 4,
        },
        {
            id: 5,
            image: require('../../assets/images/list5.png'),
            name: 'N Pack Dog',
            description: 'Mollis et et adipiscing adipiscing faucibus magna.',
            price: 60,
            rating: 4,
        },
    ];

    //handleFilterClick function
    const handleFilterClick = id => {
        setSelectedFilter(id === selectedFilter ? null : id);

        if (id === selectedFilter) {
            setFilteredResults([]);
        } else {
            const results = modalList.filter(
                item =>
                    item.description.toLowerCase() ===
                    filterArray
                        .find(filter => filter.id === id)
                        ?.name.toLowerCase(),
            );
            setFilteredResults(results);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.topContainer}>
                    <MapHeader
                        is_payment={route?.params?.is_payment}
                        isNewArrival={isNewArrival}
                        title={route?.params?.direction?.direction_of}
                    />
                </View>
                <View style={styles.filterMainContainer}>
                    {isNewArrival ? (
                        <ScrollView
                            horizontal={true}
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filterContainer}>
                            {(state?.userData?.is_service
                                ? filterArray
                                : filterArrayTwo
                            ).map(item => {
                                return (
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleFilterClick(item.id)
                                        }
                                        activeOpacity={0.8}
                                        key={item.id}
                                        style={[
                                            styles.filterSingleContainer,
                                            {
                                                borderColor:
                                                    selectedFilter === item.id
                                                        ? '#98C1D9'
                                                        : '#E2E2E2',
                                                backgroundColor:
                                                    selectedFilter === item.id
                                                        ? '#EAF7FF'
                                                        : '#fff',
                                            },
                                        ]}>
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.filterSingleText,
                                                {
                                                    color:
                                                        selectedFilter ===
                                                        item.id
                                                            ? '#009FD3'
                                                            : '#242424',
                                                },
                                            ]}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    ) : (
                        ''
                    )}
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={styles.listContainer}>
                    {modalList.map(item => {
                        return (
                            <CommonListSingle
                                item={item}
                                wishlist={wishlist}
                                setWishlist={setWishlist}
                                key={item.id}
                            />
                        );
                    })}
                </ScrollView>
                <View style={styles.mapButtonMain}>
                    {isNewArrival ? (
                        ''
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('BottomSheet');
                            }}
                            activeOpacity={0.8}
                            style={styles.mapButtonSub}>
                            <Text
                                allowFontScaling={false}
                                style={styles.mapText}>
                                Map
                            </Text>
                            <View style={styles.mapIconContainer}>
                                <MapIcon width={'100%'} height={'100%'} />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default ModalList;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        borderTopWidth: SIZE(1),
        borderTopColor: '#DFDFDF',
        backgroundColor: '#f7f7f7',
    },
    subContainer: {
        flex: 1,
    },
    topContainer: {
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#DFDFDF',
    },
    listContainer: {
        paddingHorizontal: SIZE(16),
        marginBottom: SIZE(16),
    },

    mapButtonMain: {
        position: 'absolute',
        bottom: SIZE(55),
        left: SIZES.width / 2.75,
        backgroundColor: '#009FD3',
        borderRadius: SIZE(40),
    },
    mapButtonSub: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(24),
        paddingVertical: SIZE(14),
    },
    mapText: {
        color: '#fff',
        marginRight: SIZE(12),
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    mapIconContainer: {
        width: SIZE(20),
        height: SIZE(20),
    },
    filterMainContainer: {
        marginLeft: SIZE(16),
    },
    filterContainer: {
        marginTop: SIZE(24),
    },
    filterSingleContainer: {
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(40),
        borderWidth: SIZE(1),
        marginRight: SIZE(12),
        backgroundColor: '#fff',
    },
    filterSingleText: {
        fontSize: SIZE(14),
        fontWeight: '600',
        color: '#242424',
        fontFamily: FONTS.medium,
    },
});
