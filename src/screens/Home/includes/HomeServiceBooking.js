import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

//packages
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE} from '../../../theme/theme';
import ProviderBookingCard, {
    ProviderBorrowPet,
    ProviderPlaceToStay,
} from './ProviderBookingCard';
import {ApiSectionServiceProvider} from '../../main/ApiSectionServiceProvider';

//components
import NoBooking from '../../booking/NoBooking';
import TrainerBookingCard from '../../homeScreens/includes/TrainerBookingCard';

const HomeServiceBooking = ({selectedFilter, isFocused, state}) => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bookingListStay, setBookingListStay] = useState([]);
    const [bookingListTarin, setBookingListTrain] = useState([
        {
            id: '54f62e31-1962-4ffe-a6e8-b81eabc25074',
            services: 'Obedience Training',
            customer_name: 'John',
            total_amount: '86.00',
            start_date: '2024-06-01',
            end_date: '2024-06-02',
            booking_status: 'incoming',
        },
        {
            id: 'dffb7b62-0fcc-470f-928f-b9d5457489d6',
            services: 'Behavior Modification',
            customer_name: 'Doe',
            total_amount: '40.00',
            start_date: '2024-06-01',
            end_date: '2024-06-02',
            booking_status: 'accepted',
        },
    ]);
    const [refreshing, setRefreshing] = useState([]);

    ApiSectionServiceProvider(
        selectedFilter.page_type,
        setBookingListStay,
        '',
        'home-page',
        '',
        setRefreshing,
        isFocused,
    );

    const handleSnapToItem = index => {
        setCurrentIndex(index);
    };

    const renderItem = ({item}) => (
        <View style={styles.carouselItem}>
            <ProviderBookingCard detail={item} is_hide_Arrow={true} />
        </View>
    );

    const renderItem2 = ({item}) => (
        <View style={styles.carouselItem}>
            <ProviderBorrowPet detail={item} />
        </View>
    );

    const renderItem3 = ({item}) => (
        <View style={styles.carouselItem}>
            <TrainerBookingCard
                state={state}
                detail={item}
                home={true}
                navigation={navigation}
            />
        </View>
    );
    const renderDots = () => {
        return (
            <View style={styles.dotsContainer}>
                {bookingListStay.map((item, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor:
                                    index === currentIndex
                                        ? '#009FD3'
                                        : '#C4C4C4',
                            },
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.carouselContainer}>
            {selectedFilter.id === 1 && (
                <FlatList
                    bounces={false}
                    data={bookingListStay}
                    renderItem={renderItem2}
                    snapToAlignment="center"
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={event => {
                        const index = Math.floor(
                            event.nativeEvent.contentOffset.x / SIZE(378),
                        );
                        handleSnapToItem(index);
                    }}
                    ListEmptyComponent={<NoBooking />}
                />
            )}
            {selectedFilter.id === 2 && (
                <FlatList
                    bounces={false}
                    data={bookingListStay}
                    renderItem={renderItem}
                    snapToAlignment="center"
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={event => {
                        const index = Math.floor(
                            event.nativeEvent.contentOffset.x / SIZE(378),
                        );
                        handleSnapToItem(index);
                    }}
                    ListEmptyComponent={<NoBooking />}
                />
            )}
            {selectedFilter.id === 3 && (
                <FlatList
                    bounces={false}
                    data={bookingListStay}
                    renderItem={renderItem3}
                    snapToAlignment="center"
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={event => {
                        const index = Math.floor(
                            event.nativeEvent.contentOffset.x / SIZE(378),
                        );
                        handleSnapToItem(index);
                    }}
                    ListEmptyComponent={<NoBooking />}
                />
            )}

            {(selectedFilter.id === 1 ||
                selectedFilter.id === 2 ||
                selectedFilter.id === 3) &&
            bookingListStay?.length > 1
                ? renderDots()
                : null}
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
    },
    carouselItem: {
        width: SIZE(380),
        marginHorizontal: SIZE(5),
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SIZE(25),
    },
    dot: {
        width: SIZE(10),
        height: SIZE(10),
        borderRadius: SIZE(5),
        marginHorizontal: SIZE(5),
    },
});

export default HomeServiceBooking;
