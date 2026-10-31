import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import ToggleSwitch from 'toggle-switch-react-native';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const Disable = ({
    DisableText,
    setIsOn,
    isOn,
    toggleProduct,
    DefaultVariant,
}) => {
    return (
        <View style={styles.disableContain}>
            <View style={styles.disableTop}>
                <Text allowFontScaling={false} style={styles.disableText}>
                    {DisableText}
                </Text>
                <TouchableOpacity activeOpacity={0.8}>
                    {DefaultVariant ? (
                        <ToggleSwitch
                            isOn={isOn}
                            onColor="#003459"
                            offColor="#E2E2E2"
                            size="medium"
                            animationSpeed={200}
                            onToggle={() => {
                                if (!isOn) {
                                    setIsOn(!isOn);
                                    toggleProduct();
                                }
                            }}
                        />
                    ) : (
                        <ToggleSwitch
                            isOn={!isOn}
                            onColor="#003459"
                            offColor="#E2E2E2"
                            size="medium"
                            animationSpeed={200}
                            onToggle={() => {
                                setIsOn(!isOn);
                                toggleProduct();
                            }}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Disable;

const styles = StyleSheet.create({
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
});
