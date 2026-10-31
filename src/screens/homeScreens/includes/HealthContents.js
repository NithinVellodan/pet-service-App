import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
//images and logos
import InfoIcon from '../../../assets/icons/info-circle2.svg';
import BlueIcon from '../../../assets/icons/blue-icon.svg';
import ToolTip from '../../../assets/icons/tooltip.svg';

const HealthSection = ({singleItem}) => {
    const [isShow, setIsShow] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);
    const facilitiesData = [
        {
            id: 1,
            name: singleItem?.is_vaccinated
                ? 'Fully Vaccinated'
                : 'Not Vaccinated',
            info: singleItem?.is_vaccinated
                ? 'Fully Vaccinated'
                : 'Not Vaccinated',
        },
        {
            id: 2,
            name: singleItem?.is_insured ? 'Insurance' : 'Not Insured',
            info: singleItem?.is_insured ? 'Insurance' : 'Not Insured',
        },
    ];

    // Function to handle pressing in and out
    const handlePress = itemId => {
        clearTimeout(timeoutId);
        setIsShow(itemId);
        const newTimeoutId = setTimeout(() => {
            setIsShow(null);
        }, 1000);
        setTimeoutId(newTimeoutId);
    };
    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    return (
        <View style={styles.facilitiesContainer}>
            <View style={styles.facilitiesHeading}>
                <Text allowFontScaling={false} style={styles.commonHeadingText}>
                    Health
                </Text>
            </View>
            {facilitiesData.map((item, index) => {
                const isLastChild = index === facilitiesData.length - 1;
                return (
                    <View
                        key={item.id}
                        style={[
                            styles.facilitiesListContainer,
                            isLastChild && {marginBottom: 0},
                        ]}>
                        <View style={styles.facilitiesLeft}>
                            <View style={styles.facilityIcon}>
                                <BlueIcon width={SIZE(24)} height={SIZE(24)} />
                            </View>
                            <View style={styles.facilityTitle}>
                                <Text
                                    style={styles.facilityTitleText}
                                    allowFontScaling={false}>
                                    {item.name}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                handlePress(item.id);
                            }}
                            hitSlop={10}
                            activeOpacity={0.8}
                            style={styles.infoIcon}>
                            <InfoIcon width={'100%'} height={'100%'} />
                        </TouchableOpacity>
                        {isShow === item.id && (
                            <View
                                style={{
                                    borderWidth: 0.6,
                                    borderColor: '#E2E2E2',
                                    position: 'absolute',
                                    left: SIZE(130),
                                    width: SIZE(180),
                                    height: SIZE(70),
                                    zIndex: 100,
                                    backgroundColor: '#fff',
                                    borderRadius: SIZE(8),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: SIZE(10),
                                }}>
                                <View
                                    style={{
                                        position: 'absolute',
                                        transform: [{rotate: '90deg'}],
                                        left: SIZE(178.5),
                                        zIndex: -100,
                                        // top:
                                    }}>
                                    <ToolTip
                                        width={SIZE(18)}
                                        height={SIZE(18)}
                                    />
                                </View>

                                <Text
                                    style={{
                                        color: '#969696',
                                        fontFamily: FONTS.medium,
                                        fontSize: SIZE(12),
                                    }}>
                                    {item.info}
                                </Text>
                            </View>
                        )}
                    </View>
                );
            })}
        </View>
    );
};

export default HealthSection;

const styles = StyleSheet.create({
    facilitiesContainer: {
        padding: SIZE(16),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
    },
    facilitiesListContainer: {
        paddingHorizontal: SIZE(4),
        paddingVertical: SIZE(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(8),
    },
    facilitiesHeading: {
        paddingBottom: SIZE(12),
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: SIZE(1),
        marginBottom: SIZE(16),
    },
    commonHeadingText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    facilityIcon: {
        width: SIZE(24),
        height: SIZE(24),
        marginRight: SIZE(10),
    },
    facilityTitle: {},
    facilityTitleText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    infoIcon: {
        alignSelf: 'center',
        width: SIZE(20),
        height: SIZE(20),
    },
    facilitiesLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
