import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

//images and logos
import TickIcon from '../../assets/icons/tick-circle.svg';
import TickIconRed from '../../assets/icons/close-circle-red.svg';
import WarningIcon from '../../assets/icons/warning-icon.svg';

const CustomToast = ({toastOptions}) => {
    return (
        <View
            style={[
                styles.toastMain,
                {
                    backgroundColor:
                        toastOptions?.type === 'danger' ? 'red' : '#009FD3',
                },
            ]}>
            <View style={styles.toastSub}>
                <View style={styles.toastTop}>
                    <View style={styles.toastTickIcon}>
                        {toastOptions?.type === 'warning' ? (
                            <WarningIcon width={'100%'} height={'100%'} />
                        ) : toastOptions?.type === 'danger' ? (
                            <TickIconRed width={'100%'} height={'100%'} />
                        ) : (
                            <TickIcon width={'100%'} height={'100%'} />
                        )}
                    </View>
                    <Text style={styles.toastTextOne}>
                        {toastOptions?.type === 'warning'
                            ? 'Warning'
                            : toastOptions?.type === 'danger'
                            ? 'Failed'
                            : 'Successful'}
                    </Text>
                </View>
                <View style={styles.toastBottom}>
                    <Text style={styles.toastTextTwo}>
                        {toastOptions.message}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CustomToast;

const styles = StyleSheet.create({
    toastMain: {
        paddingLeft: SIZE(5),
        backgroundColor: '#009FD3',
        borderRadius: SIZE(16),
    },
    toastSub: {
        paddingHorizontal: SIZE(24),
        paddingVertical: SIZE(8),
        backgroundColor: '#fff',
        borderRadius: SIZE(12),
        ...Platform.select({
            ios: {
                shadowColor: '#E9E9E9',
                shadowOffset: {width: 0.8, height: 0.8},
                shadowOpacity: 0.8,
                shadowRadius: SIZE(1),
            },
            android: {
                elevation: 1,
            },
        }),
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5
    },
    toastTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZE(9),
    },
    toastTickIcon: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(8),
    },
    toastTextOne: {
        color: '#3E3E53',
        fontSize: SIZE(14),
        fontWeight: FONTS.semiBold,
        fontWeight: '600',
    },
    toastBottom: {},
    toastTextTwo: {
        color: '#3E3E53',
        fontSize: SIZE(12),
        fontWeight: FONTS.regular,
        fontWeight: '400',
    },
});
