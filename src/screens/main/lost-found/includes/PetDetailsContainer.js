import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import CalendarBlueIcon from '../../../../assets/icons/calendarblue.svg';
import LocationBlue from '../../../../assets/icons/trainers/location-blue.svg';

import Call from '../../../../assets/icons/profile-icons/call.svg';

const PetDetailsContainer = ({item, location, phone, lost_date}) => {
    const navigation = useNavigation();
    const formatDate = dateString => {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'short', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    };

    const loopItem = [
        {id: 1, content: location, icon: <LocationBlue />},
        {id: 2, content: '(+971) ' + phone, icon: <Call />},
        {id: 3, content: formatDate(lost_date), icon: <CalendarBlueIcon />},
    ];

    return (
        <View style={styles.mainContentBox}>
            {loopItem.map(item => (
                <View key={item.id} style={styles.containerBox}>
                    {item?.icon}
                    <Text style={styles.contentStyle}>{item?.content}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    containerBox: {
        flexDirection: 'row',
        padding: SIZE(10),
        alignItems: 'center',
    },
    mainContentBox: {
        borderWidth: 1,
        borderRadius: SIZE(12),
        backgroundColor: '#FFFFFF',
        borderColor: '#EDEDED',
        padding: SIZE(10),
    },
    contentStyle: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '500',
        fontFamily: FONTS.semiBold,
        marginLeft: SIZE(10),
    },
});

export default PetDetailsContainer;
