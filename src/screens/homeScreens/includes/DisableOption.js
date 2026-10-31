import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import React, {useState} from 'react';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import ToggleSwitch from 'toggle-switch-react-native';

const DisableOption = ({route, isOn, setIsOn, togglePlace}) => {
    return (
        <View style={styles.disableContain}>
            <View style={styles.disableTop}>
                {route?.params?.type === 'BorrowAPet' ? (
                    <Text allowFontScaling={false} style={styles.disableText}>
                        Disable Pet
                    </Text>
                ) : route?.params?.type === 'Services' ? (
                    <Text allowFontScaling={false} style={styles.disableText}>
                        Disable Service
                    </Text>
                ) : (
                    <Text allowFontScaling={false} style={styles.disableText}>
                        Disable Place
                    </Text>
                )}

                <TouchableOpacity activeOpacity={0.8}>
                    <ToggleSwitch
                        isOn={!isOn}
                        onColor="#003459"
                        offColor="#E2E2E2"
                        size="medium"
                        animationSpeed={200}
                        onToggle={() => {
                            setIsOn(!isOn);
                            togglePlace();
                        }}
                    />
                </TouchableOpacity>
            </View>
            <Text allowFontScaling={false} style={styles.disableDescription}>
                Lectus volutpat at tincidunt aliquet. Elementum at sed vivamus
                quam. Rhoncus
            </Text>
        </View>
    );
};

export default DisableOption;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: SIZE(16),
        flex: 1,
    },
    disableContain: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E2E2',
        padding: SIZE(16),
        borderRadius: SIZE(15),
    },
    disableTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(8),
    },
    disableText: {
        fontSize: SIZE(18),
        fontWeight: '600',
        lineHeight: SIZE(22),
        fontFamily: FONTS.semiBold,
        color: '#232323',
    },
    disableDescription: {
        fontSize: SIZE(16),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(20),
        color: '#757575',
    },
});
