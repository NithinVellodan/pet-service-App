import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

const BorderButton = ({
    lowLabel,
    label,
    icon,
    onPress,
    onButtonHAndler,
    id,
    setActiveTab,
    activeTab,
    hidden,
    fireBaseLogin,
    loginSection,
    buttonLoader,
    buttonDisabled,
}) => {
    const [selected, setSelected] = useState(1);

    return (
        !hidden && (
            <TouchableOpacity
                disabled={buttonDisabled}
                activeOpacity={0.8}
                style={[
                    styles.buttonStyle,
                    {
                        borderColor:
                            activeTab === label ? '#009FD3' : '#003459',
                        flexDirection: buttonLoader ? 'column' : 'row',
                    },
                ]}
                onPress={() => {
                    if (activeTab) {
                        setActiveTab(id);
                    }
                    if (loginSection && id !== 3) {
                        onButtonHAndler && onButtonHAndler(id);
                    }
                    if (loginSection && id == 3) {
                        fireBaseLogin();
                    }
                    onPress();
                }}>
                {buttonLoader === true ? (
                    <ActivityIndicator size="small" color="#009FD3" />
                ) : (
                    <>
                        {icon && (
                            <View style={styles.iconContainer}>{icon}</View>
                        )}
                        <Text
                            style={[
                                styles.buttonText,
                                {
                                    alignItems: icon ? null : 'center',
                                    width: icon ? SIZE(264) : '100%',
                                    justifyContent: icon ? null : 'center',
                                },
                            ]}>
                            {
                                <Text
                                    style={[
                                        styles.buttonText,
                                        {fontFamily: FONTS.regular},
                                    ]}>
                                    {lowLabel}
                                </Text>
                            }
                            {label}
                        </Text>
                    </>
                )}
            </TouchableOpacity>
        )
    );
};

export default BorderButton;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#F7F7F7',
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#003459',
        paddingHorizontal: SIZE(32),
    },
    buttonText: {
        color: '#003459',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
        width: SIZE(264),
    },
    iconContainer: {
        width: SIZE(24),
        height: SIZE(24),
    },
    buttonLoad: {
        borderWidth: 1,
    },
});
