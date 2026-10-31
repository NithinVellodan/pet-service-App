import React, {useState, useContext} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';

// theme
import {SIZE} from '../../theme/theme';
import DropDownItem from './includes/DropDownItem';
import {Context} from '../../contexts/Store';
import {FONTS} from '../../theme/fonts';
import SearchIcon from '../../assets/icons/search.svg';
import ArrowLeft from '../../assets/icons/arrow-left-black.svg';
import {useNavigation} from '@react-navigation/native';

const FaqSection = () => {
    const {state} = useContext(Context);
    const navigation = useNavigation();

    const [dropData, setDropData] = useState([
        {
            Header: 'How do I book a service for my pet through the app?',
            id: 1,
            answers:
                'Booking a service for your pet is easy! Simply open the app, navigate to the services section, choose the service you need (such as grooming, walking, or boarding), select your preferred date and time, and complete the booking process., Booking a service for your pet is easy! Simply open the app, navigate to the services section, choose the service you need (such as grooming, walking, or boarding), select your preferred date and time, and complete the booking process.',
        },
        {
            Header: 'What types of pet services are available on the app?',
            id: 2,
            answers:
                'Booking a service for your pet is easy! Simply open the app, navigate to the services section, choose the service you need (such as grooming, walking, or boarding).',
        },
        {
            Header: 'Can I schedule recurring appointments for my pet?',
            id: 3,
            answers:
                'Booking a service for your pet is easy! Simply open the app, ',
        },
        {
            Header: 'What types of pet services are available on the app?',
            id: 4,
            answers:
                'Booking a service for your pet is easy! Simply open the app, navigate to the services section, choose the service you need (such as grooming, walking, or boarding), select your preferred date and time, and complete the booking process.',
        },
        {
            Header: 'How do I pay for pet services booked through the app?',
            id: 5,
            answers:
                'Booking a service for your pet is easy! Simply open the app, navigate to the services section, choose the service you need (such as grooming, walking, or boarding), select your preferred date and time, and complete the booking process.',
        },
        {
            Header: 'What if I need to cancel or reschedule a booked appointment?',
            id: 6,
            answers:
                'Booking a service for your pet is easy! Simply open the app, navigate to the services section, choose the service you need (such as grooming, walking, or boarding), select your preferred date and time, and complete the booking process.',
        },
    ]);
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState({
        id: 1,
        type: 'Place to Stay',
        page_type: 'place-to-stay',
    });

    const handleFilterClick = item => {
        setSelectedFilter(item);
    };

    const FilterItemTwo = [
        {
            id: 4,
            type: 'All',
            page_type: 'All',
        },
        {
            id: 1,
            type: 'Place to Stay',
            page_type: 'place-to-stay',
        },
        {
            id: 2,
            type: 'Borrow a Pet',
            page_type: 'borrow-pet',
        },
        {
            id: 3,
            type: 'Trainer',
            page_type: 'trainer',
        },
    ];

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        navigation.goBack();
                    }}
                    activeOpacity={0.8}>
                    <ArrowLeft height={SIZE(24)} width={SIZE(24)} />
                </TouchableOpacity>
                <View
                    style={{
                        marginLeft: SIZE(20),
                        flexDirection: 'row',
                        alignItems: 'baseline',
                    }}>
                    <Text
                        numberOfLines={1}
                        allowFontScaling={false}
                        style={[styles.headerText]}>
                        {'FaQ'}
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <View
                    style={[
                        styles.headerRight,
                        {
                            borderColor: isFocused ? '#009FD3' : '#E2E2E2',
                            backgroundColor: isFocused ? '#FFF' : '#E2E2E2',
                        },
                    ]}>
                    <View style={styles.searchIconContainer}>
                        <SearchIcon width={'100%'} height={'100%'} />
                    </View>
                    <TextInput
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={styles.inputStyle}
                        placeholder="Search..."
                        placeholderTextColor={'#AAA'}
                    />
                </View>
                <FlatList
                    horizontal
                    data={FilterItemTwo}
                    keyExtractor={item => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => handleFilterClick(item)}
                            activeOpacity={0.8}
                            style={[
                                styles.filterItem,
                                selectedFilter.id === item.id && [
                                    styles.selectedFilterItem,
                                    {
                                        borderColor: !state.userData.is_service
                                            ? '#98C1D9'
                                            : '#003459',
                                    },
                                ],
                            ]}>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.filterItemText,
                                    selectedFilter.id === item.id && [
                                        styles.selectedFilterItemText,
                                        {
                                            color: !state.userData.is_service
                                                ? '#009FD3'
                                                : '#003459',
                                        },
                                    ],
                                ]}>
                                {item.type}
                            </Text>
                        </TouchableOpacity>
                    )}
                    style={styles.filterContainer}
                />
                <View style={{flex: 1}}>
                    <FlatList
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        data={dropData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => <DropDownItem item={item} />}
                        contentContainerStyle={styles.flatListContentContainer}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZE(16),
        backgroundColor: '#F7F7F7',
    },
    filterContainer: {
        flexGrow: 0,
        marginTop: SIZE(20),
        // backgroundColor: 'red',
        height: SIZE(60),
    },
    filterItem: {
        marginRight: SIZE(12),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        backgroundColor: '#FFFFFF',
        height: SIZE(35),
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedFilterItem: {
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        backgroundColor: '#EAF7FF',
    },
    filterItemText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
    selectedFilterItemText: {
        color: '#003459',
    },
    flatListContentContainer: {
        paddingBottom: SIZE(16),
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZE(8),
        paddingLeft: SIZE(16),
        paddingRight: SIZE(8),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        // flex: 1,
    },
    searchIconContainer: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(12),
    },
    inputStyle: {
        flex: 1,
        paddingVertical: 0,
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(16),
        borderBottomWidth: SIZE(1),
        borderBlockColor: '#d2d2d2',
        marginBottom: SIZE(20),
    },
    back: {
        backgroundColor: '#fff',
        height: SIZE(40),
        width: SIZE(40),
        borderRadius: SIZE(61),
        alignItems: 'center',
        padding: SIZE(5),
        justifyContent: 'center',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    headerText: {
        fontSize: SIZE(20),
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        lineHeight: SIZE(25),
        // width: SIZES.width * 0.5,
    },
});

export default FaqSection;
