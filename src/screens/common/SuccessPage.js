import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

// components
import DescriptionHeading from '../../components/headings/DescriptionHeading';

// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

//svg
import VerifiedTick from '../../assets/icons/tick-circle.svg';

const SuccessPage = ({label, isSmall, setOpen, isOpen}) => {
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setOpen(false);
            }, 2000);
        }
    }, [isOpen]);
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <VerifiedTick width={'100%'} height={'100%'} />
            </View>
            <Text style={styles.successLabel}>Verified</Text>

            <DescriptionHeading
                isCenter={true}
                text={'Your OTP Verification Successfully Completed'}
                isSmall={isSmall}
            />
        </View>
    );
};

export default SuccessPage;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(32),
        alignItems: 'center',
    },
    iconContainer: {
        width: SIZE(120),
        height: SIZE(120),
    },
    successLabel: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(32),
        color: '#009FD3',
        paddingTop: SIZE(32),
    },
});
