import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Headers from '../../includes/headers/Headers';
import React, {useContext, useState} from 'react';

//packages
import {useFocusEffect} from '@react-navigation/native';

//Constants
import {Context} from '../../../contexts/Store';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//components
import PetField from '../petField/PetField';
import EmptyNotification from '../../empty-pages/EmptyNotification';
import {
    getNotificationCustomer,
    getNotificationProvider,
} from '../../common/ApiGeneral';
import {usersConfigGeneral} from '../../../../axiosConfig';

export default function NotificationPage() {
    const {state, dispatch} = useContext(Context);
    const handleFilterClick = index => {
        setSelectedFilter(index);
    };
    //states
    const [selectedFilter, setSelectedFilter] = useState({
        id: 1,
        type: 'All',
        params: '',
    });
    const [selectedValue, setSelectedValue] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const FilterItem = [
        {
            id: 1,
            type: 'All',
            params: '',
        },
        {
            id: 2,
            type: 'Place to Stay',
            params: 'place_to_stay',
        },
        {
            id: 3,
            type: 'Borrow a Pet',
            params: 'borrow_pet',
        },
        {
            id: 4,
            type: 'Trainer',
            params: 'trainer',
        },
    ];

    if (state?.userData?.is_service) {
        getNotificationProvider(
            setNotifications,
            isLoading,
            selectedFilter?.params,
            setRefresh,
        );
    } else {
        getNotificationCustomer(
            setNotifications,
            isLoading,
            selectedFilter?.params,
            setRefresh,
        );
    }

    const markAsRead = async id => {
        try {
            const response = await usersConfigGeneral.post(
                `mark-as-read/`,
                {notification_id: id},
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(prev => !prev);
            return () => {};
        }, []),
    );

    const renderItem = ({item}) => (
        <PetField state={state} item={item} markAsRead={markAsRead} />
    );

    return (
        <View style={styles.container}>
            <Headers headText={'Notification'} />
            <View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    bounces={false}
                    contentContainerStyle={styles.filterContainer}>
                    {FilterItem.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                handleFilterClick(item);
                                setSelectedValue(item.id);
                            }}
                            activeOpacity={0.8}
                            key={item.id}
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
                                index === 0 && {marginLeft: SIZE(12)},
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
                    ))}
                </ScrollView>
            </View>
            {refresh ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size="large"
                    color={!state?.userData?.is_service ? '#007EA7' : '#003459'}
                />
            ) : (
                <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.notificationContainer}
                    data={notifications}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={<EmptyNotification />}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    filterContainer: {
        paddingTop: SIZE(20),
        marginBottom: SIZE(16),
    },
    filterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        backgroundColor: '#FFFFFF',
    },
    selectedFilterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        borderColor: '#003459',
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
        fontSize: SIZE(14),
        color: '#003459',
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
});
