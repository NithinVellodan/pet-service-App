import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const LogoutSection = ({setLogoutModal, onPress, submitLoading, state}) => {
    return (
        <View style={styles.lgoutContainer}>
            <View style={styles.headText}>
                <Text
                    allowFontScaling={false}
                    style={[
                        styles.headText,
                        {
                            color: !state?.userData?.is_service
                                ? '#009FD3'
                                : '#003459',
                        },
                    ]}>
                    Are you sure ?
                </Text>
            </View>
            <Text allowFontScaling={false} style={styles.description}>
                Are you Sure you want to Logout?
            </Text>
            <View style={styles.logoutButtons}>
                <TouchableOpacity
                    style={[
                        styles.logoutCancel,
                        {
                            borderColor: state?.userData?.is_service
                                ? '#009FD3'
                                : '#003459',
                        },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                        setLogoutModal(false);
                    }}>
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.logoutCancelText,
                            {
                                color: state?.userData?.is_service
                                    ? '#009FD3'
                                    : '#003459',
                            },
                        ]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.logoutButton,
                        {
                            backgroundColor: !state?.userData?.is_service
                                ? '#009FD3'
                                : '#003459',
                        },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                        onPress && onPress();
                    }}>
                    {submitLoading ? (
                        <ActivityIndicator size={'small'} color={'#fff'} />
                    ) : (
                        <Text
                            allowFontScaling={false}
                            style={styles.logoutButtonText}>
                            Logout
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LogoutSection;

const styles = StyleSheet.create({
    lgoutContainer: {
        paddingVertical: SIZE(40),
        paddingHorizontal: SIZE(32),
        width: SIZE(347),
    },
    headText: {
        alignSelf: 'center',
        alignItems: 'center',
        fontSize: SIZE(20),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(25),
        color: '#003459',
    },
    description: {
        marginTop: SIZE(12),
        marginBottom: SIZE(32),
        alignSelf: 'center',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        lineHeight: SIZE(17.5),
        alignItems: 'center',
        color: '#686868',
    },
    logoutButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logoutCancel: {
        borderRadius: SIZE(6),
        paddingVertical: SIZE(10),
        width: SIZE(132),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#009FD3',
    },
    logoutCancelText: {
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
        color: '#009FD3',
    },
    logoutButton: {
        borderRadius: SIZE(6),
        paddingVertical: SIZE(10),
        width: SIZE(132),
        alignItems: 'center',
        backgroundColor: '#003459',
    },
    logoutButtonText: {
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
        color: '#FFF',
    },
});
