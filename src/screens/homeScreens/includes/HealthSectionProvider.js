import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import InfoIcon from '../../../assets/icons/info-circle2.svg';

export const Characteristics = ({route, characteristics}) => {
    const facilitiesData = [
        {
            id: 1,
            count: 1,
            name: 'Good Manner',
        },
        {
            id: 2,
            count: 2,
            name: 'Good with Kids',
        },
        {
            id: 3,
            count: 3,
            name: 'Very Empathetic',
        },
    ];

    return (
        <View style={styles.facilitiesContainer}>
            <View style={styles.facilitiesHeading}>
                <Text allowFontScaling={false} style={styles.commonHeadingText}>
                    Characteristics
                </Text>
            </View>
            {characteristics.map((item, index) => {
                const isLastChild = index === facilitiesData.length - 1;
                return (
                    <View
                        key={item.id}
                        style={[
                            styles.facilitiesListContainer,

                            isLastChild && {marginBottom: 0},
                        ]}>
                        <View style={styles.facilitiesLeft}>
                            <Text
                                style={[
                                    styles.facilityTitleText,
                                    {marginRight: 10},
                                ]}>
                                {index + 1}
                            </Text>
                            <Text style={styles.facilityTitleText}>
                                {item.name}
                            </Text>
                        </View>
                        {route?.params?.type === 'BorrowAPet' ? (
                            ''
                        ) : (
                            <TouchableOpacity
                                hitSlop={10}
                                activeOpacity={0.8}
                                style={styles.infoIcon}>
                                <InfoIcon width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                        )}
                    </View>
                );
            })}
        </View>
    );
};

const HealthSectionProvider = ({route, insurance, vaccination}) => {
    const facilitiesData = [
        {
            id: 1,
            count: 1,
            name: vaccination ? 'Fully Vaccinated' : 'Not Vaccinated',
        },
        {
            id: 2,
            count: 2,
            name: insurance ? 'Insurance' : 'Not Insured',
        },
    ];

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
                            <Text
                                style={[
                                    styles.facilityTitleText,
                                    {marginRight: 10},
                                ]}>
                                {item.count}
                            </Text>
                            <Text style={styles.facilityTitleText}>
                                {item.name}
                            </Text>
                        </View>
                        {route?.params?.type === 'BorrowAPet' ? (
                            ''
                        ) : (
                            <TouchableOpacity
                                hitSlop={10}
                                activeOpacity={0.8}
                                style={styles.infoIcon}>
                                <InfoIcon width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                        )}
                    </View>
                );
            })}
        </View>
    );
};

export default HealthSectionProvider;

const styles = StyleSheet.create({
    facilitiesContainer: {
        padding: SIZE(16),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
        marginBottom: SIZE(20),
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
        color: '#757575',
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
