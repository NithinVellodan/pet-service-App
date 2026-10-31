import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//components
import ColoredButton from '../../../components/buttons/ColoredButton';

//images and icons
import CloseIcon from '../../../assets/icons/close-icon-blue.svg';

const AccessDenied = ({setTermsModal}) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    setTermsModal(false);
                }}
                style={styles.closeIcon}>
                <CloseIcon width={SIZE(15)} height={SIZE(15)} />
            </TouchableOpacity>
            <Text style={styles.mainText}>AccessDenied</Text>
            <Text style={styles.subText}>
                Access has been denied for entering as a service provider.
                Please contact the admin to inquire about the reason.
            </Text>
            <ColoredButton
                label={'Contact Us'}
                onPress={() => {
                    setTermsModal(false);
                }}
                dark={true}
            />
        </View>
    );
};

export default AccessDenied;

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: SIZE(40),
        paddingHorizontal: SIZE(32),
        width: SIZE(347),
    },
    closeIcon: {
        position: 'absolute',
        right: SIZE(15),
        top: SIZE(15),
    },
    mainText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        textAlign: 'center',
        fontWeight: '600',
        color: '#242424',
        marginBottom: SIZE(12),
    },
    subText: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(16),
        textAlign: 'center',
        fontWeight: '400',
        color: '#686868',
    },
});
