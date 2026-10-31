import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

//packages
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

const TrainerServices = ({
    data,
    setModalScreens,
    setModalVisible,
    setAddService,
}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <View style={styles.serviceTop}>
                <Text style={styles.headingText}>Services & Pricing</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ServiceListPage');
                    }}
                    activeOpacity={0.8}>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.underLine}></View>
            <View style={{gap: SIZE(16)}}>
                {data
                    .filter(item => item.is_enabled)
                    .slice(0, 3)
                    .map((item, index) => (
                        <View key={index} style={styles.serviceList}>
                            <View style={styles.serviceLeft}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.serviceHeading}>
                                    {item.title}
                                </Text>
                                <Text
                                    numberOfLines={3}
                                    style={styles.serviceDescription}>
                                    {item.remarks}
                                </Text>
                            </View>
                            <View style={styles.serviceRight}>
                                <Text style={styles.durationText}>
                                    {Math.floor(item.no_of_hours)} hr Training
                                </Text>
                            </View>
                        </View>
                    ))}
            </View>
            <TouchableOpacity
                onPress={() => {
                    setModalScreens('AddService');
                    setAddService(true);
                    setModalVisible(true);
                }}
                activeOpacity={0.8}
                style={styles.addButton}>
                <Text style={styles.addText}>+ Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TrainerServices;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#E2E2E2',
        padding: SIZE(16),
        marginTop: SIZE(18),
    },
    serviceTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headingText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    viewAll: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '700',
        fontFamily: FONTS.bold,
    },
    underLine: {
        height: SIZE(1),
        backgroundColor: '#E2E2E2',
        marginTop: SIZE(12),
        marginBottom: SIZE(16),
    },
    serviceList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    serviceLeft: {width: SIZE(223)},
    serviceHeading: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        marginBottom: SIZE(8),
    },
    serviceDescription: {
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },
    serviceRight: {
        height: SIZE(23),
        width: SIZE(102),
        backgroundColor: '#F4F4F4',
        borderWidth: SIZE(1),
        borderRadius: SIZE(39),
        borderColor: '#E2E2E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    durationText: {
        color: '#686868',
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },
    addButton: {
        height: SIZE(42),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        marginTop: SIZE(28),
    },
    addText: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
});
