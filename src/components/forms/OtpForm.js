import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
// packages
import OTPTextView from 'react-native-otp-textinput';

const OtpForm = ({isSmall, otp, setOtp, setError, darkTin}) => {
    useEffect(() => {
        if (otp?.length > 0) {
            setError('');
        }
    }, [otp]);

    return (
        <View>
            <OTPTextView
                containerStyle={styles.otpContainer}
                textInputStyle={[
                    styles.textInputContainer,
                    {
                        width: isSmall ? SIZE(53) : SIZE(73),
                        height: isSmall ? SIZE(53) : SIZE(73),
                    },
                ]}
                tintColor={darkTin === 'dark' ? '#003459' : '#009FD3'}
                offTintColor="#D3D3D3"
                handleTextChange={setOtp}
                defaultValue={otp}
                inputCount={4}
                keyboardType="numeric"
            />
        </View>
    );
};

export default OtpForm;

const styles = StyleSheet.create({
    otpContainer: {
        marginTop: SIZE(48),
        justifyContent: 'space-between',
    },
    textInputContainer: {
        width: SIZE(73),
        height: SIZE(73),
        fontFamily: FONTS.regular,
        color: '#000',
        fontSize: SIZE(20),
        borderColor: '#009FD3',
        borderBottomWidth: 1,
        borderWidth: 1,
        borderRadius: SIZE(8),
        marginHorizontal: 0,
    },
});
