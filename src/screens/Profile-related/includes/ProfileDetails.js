import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

// theme
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import Call from '../../../assets/icons/profile-icons/call.svg';
import CallDark from '../../../assets/icons/profile-icons/calldark.svg';
import Sms from '../../../assets/icons/profile-icons/sms.svg';
import SmsDark from '../../../assets/icons/profile-icons/smsdark.svg';

const boxWidth = SIZES.width - SIZE(32);

const ProfileDetails = ({state, phone, mail}) => {
    return (
        <View
            style={[
                styles.mainContent,
                {
                    borderBottomWidth: 0,
                    paddingBottom: 0,
                    paddingTop: SIZE(15),
                },
            ]}>
            <View
                style={[
                    {
                        backgroundColor: '#fff',
                        width: boxWidth * 0.75,
                        paddingBottom: 0,
                    },
                ]}>
                <View style={[styles.flexBox, {marginBottom: SIZE(15)}]}>
                    {!state?.userData?.is_service ? (
                        <Call width={SIZE(20)} height={SIZE(20)} />
                    ) : (
                        <CallDark width={SIZE(20)} height={SIZE(20)} />
                    )}
                    <Text
                        allowFontScaling={false}
                        style={[styles.subName, {marginLeft: SIZE(10)}]}>
                        {state.userData.is_login ? phone : ''}
                    </Text>
                </View>
                <View style={styles.flexBox}>
                    {!state?.userData?.is_service ? (
                        <Sms width={SIZE(20)} height={SIZE(20)} />
                    ) : (
                        <SmsDark width={SIZE(20)} height={SIZE(20)} />
                    )}
                    <Text
                        allowFontScaling={false}
                        style={[styles.subName, {marginLeft: SIZE(10)}]}>
                        {state.userData.is_login ? mail : ''}
                    </Text>
                </View>
            </View>
            <View
                style={[
                    styles.rightContent,
                    {
                        justifyContent: 'flex-end',
                        backgroundColor: '#fff',
                        width: boxWidth * 0.14,
                    },
                ]}></View>
        </View>
    );
};

export default ProfileDetails;

const styles = StyleSheet.create({
    mainContent: {
        flexDirection: 'row',
        borderBottomWidth: SIZE(1),
        paddingBottom: SIZE(16),
        borderColor: '#E2E2E2',
    },
    subName: {
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(20),
        fontWeight: '600',
        color: '#969696',
    },
    flexBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    veryfyButton: {
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        fontWeight: '600',
        marginBottom: SIZE(6),
        color: '#009FD3',
        letterSpacing: SIZE(1.7),
    },
    rightContent: {
        backgroundColor: '#fff',
        width: boxWidth * 0.1,
        alignItems: 'flex-end',
    },
});
