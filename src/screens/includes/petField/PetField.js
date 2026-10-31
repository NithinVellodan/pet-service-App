import {Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';

// thems
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

// package
import {useNavigation} from '@react-navigation/native';

export default function PetField({item, state, markAsRead}) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            key={item.id}
            onPress={() => {
                markAsRead(item.id);
                if (state?.userData?.is_service) {
                    if (item?.notification_type === 'place_to_stay_booking') {
                        navigation.navigate('BookingItem', {
                            item_id: item.redirect_pk,
                        });
                    } else if (item?.notification_type === 'borrow_pet') {
                        navigation.navigate('BorrowBookingSinge', {
                            item_id: item.redirect_pk,
                        });
                    } else {
                        navigation.navigate('TrainerProviderBooking', {
                            item_id: item.redirect_pk,
                        });
                    }
                } else {
                    if (item?.notification_type === 'place_to_stay_booking') {
                        navigation.navigate('CustomerBookingPlace', {
                            item: item,
                            type: 'notification',
                        });
                    } else if (item?.notification_type === 'borrow_pet') {
                        navigation.navigate('BookingSectionStack', {
                            screen: 'Bookings',
                            params: {
                                selectedFilter: {
                                    id: 2,
                                    type: 'Borrow a Pet',
                                    page_type: 'borrow-pet',
                                },
                                item: item,
                                type: 'notification',
                            },
                        });
                    } else {
                        navigation.navigate('TrainerBookingSingle', {
                            item: item,
                            type: 'notification',
                        });
                    }
                }
            }}
            style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: item.notViewed ? '#98C1D9' : '#E2E2E2',
                paddingHorizontal: SIZE(18),
                paddingVertical: SIZE(24),
                backgroundColor: !item.is_read ? '#EAF7FF' : '#FFFFFF',
            }}>
            <View
                style={{
                    width: SIZE(80),
                    height: SIZE(80),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: SIZE(16),
                    borderRadius: SIZE(8),
                    overflow: 'hidden',
                    borderRadius: SIZE(6),
                }}>
                <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: item.image}}
                />
            </View>
            <View style={{flex: 1}}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <View>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontFamily: FONTS.medium,
                                fontSize: SIZE(14),
                                color: '#242424',
                                fontWeight: '500',
                            }}>
                            {item.subject}
                        </Text>
                    </View>
                    <View>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: SIZE(14),
                                color: '#757575',
                                fontFamily: FONTS.regular,
                                fontWeight: '400',
                            }}>
                            {item.time}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text
                        numberOfLines={3}
                        style={{
                            fontSize: SIZE(14),
                            color: '#757575',
                            fontFamily: FONTS.regular,
                        }}>
                        {item.message}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// const styles = StyleSheet.create({});
