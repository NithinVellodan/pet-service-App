import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

//images and logos
import CalendarIcon from '../../../../../assets/icons/calendarblue.svg';

const AvailabilityButton = ({setModalScreens, setModalVisible, setUpdate}) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                onPress={() => {
                    setModalScreens('AddAvailableDates');
                    setUpdate(true);
                    setModalVisible(true);
                }}
                activeOpacity={0.8}
                style={styles.buttonContainer}>
                <CalendarIcon width={SIZE(20)} height={SIZE(20)} />
                <Text style={styles.buttonText}>Update Availability</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AvailabilityButton;

const styles = StyleSheet.create({
    mainContainer: {},
    buttonContainer: {
        height: SIZE(42),
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZE(32),
    },
    buttonText: {
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#009FD3',
        textAlign: 'center',
        marginLeft: SIZE(16),
    },
});
