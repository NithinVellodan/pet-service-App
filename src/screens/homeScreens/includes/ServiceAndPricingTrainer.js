import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

//packages
import {useToast} from 'react-native-toast-notifications';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import Subtract from '../../../assets/icons/trainers/Subtract.svg';
import CalenderF from '../../../assets/icons/trainers/calendar-f.svg';
import InfoCircle from '../../../assets/icons/infocircle.svg';
import ToolTip from '../../../assets/icons/tooltip.svg';

const ServiceAndPricingTrainer = ({
    services,
    selectedItems,
    setSelectedItems,
    setCalModalVisible,
    showAllItems,
    setShowAllItems,
}) => {
    const toast = useToast();
    const [tooltipItemId, setTooltipItemId] = useState(null);

    const toggleItemSelection = item => {
        const selectedIndex = selectedItems.findIndex(
            selectedItem => selectedItem.id === item.id,
        );
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            const updatedSelectedItems = selectedItems.filter(
                selectedItem => selectedItem.id !== item.id,
            );
            setSelectedItems(updatedSelectedItems);
        }
    };

    const handlePress = itemId => {
        setTooltipItemId(itemId.id);
        setTimeout(() => {
            setTooltipItemId(null);
        }, 1000);
    };

    // console.log(services, 'services____services');

    const type = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <View style={{marginTop: SIZE(25), marginBottom: SIZE(25)}}>
            <View style={styles.mainContentBox}>
                <View style={styles.headerSection}>
                    <Text style={styles.header}>Services & Pricing</Text>
                </View>
                {services &&
                    services
                        .slice(0, showAllItems ? services.length : 2)
                        .map((item, index) => (
                            <View
                                key={index}
                                style={{paddingVertical: SIZE(15)}}>
                                <View style={styles.middleContent}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            toggleItemSelection(item)
                                        }
                                        style={[
                                            styles.checkBox,
                                            {
                                                borderColor: selectedItems.some(
                                                    selectedItem =>
                                                        selectedItem.id ===
                                                        item.id,
                                                )
                                                    ? '#fff'
                                                    : '#969696',
                                            },
                                        ]}>
                                        {selectedItems.some(
                                            selectedItem =>
                                                selectedItem.id === item.id,
                                        ) ? (
                                            <Subtract />
                                        ) : null}
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            width: SIZES.width * 0.75,
                                        }}>
                                        <Text style={styles.subHead}>
                                            {item?.title}
                                        </Text>
                                        <Text style={styles.descriptionText}>
                                            {item?.remarks}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: SIZE(10),
                                            }}>
                                            <Text style={styles.headPet}>
                                                Pet Types :{'  '}{' '}
                                            </Text>
                                            <View style={styles.petSection}>
                                                {item?.pet_types?.map(item => (
                                                    <View
                                                        key={item.id}
                                                        style={styles.petTypes}>
                                                        <Text
                                                            style={{
                                                                color: '#969696',
                                                                fontSize:
                                                                    SIZE(12),
                                                                fontFamily:
                                                                    FONTS.regular,
                                                            }}>
                                                            {item?.name}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.highlightBox}>
                                    <Text style={styles.trainingHours}>
                                        {item?.no_of_hours} hr Training
                                    </Text>
                                </View>
                            </View>
                        ))}
                <TouchableOpacity
                    onPress={() => {
                        if (selectedItems?.length == 0) {
                            toast.show('Please pick your required services.', {
                                type: 'warning',
                            });
                        } else {
                            setCalModalVisible(true);
                        }
                    }}
                    style={[
                        styles.facilityViewMore,
                        {
                            backgroundColor: '#009FD3',
                            marginBottom: SIZE(15),
                            borderColor: '#009FD3',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        },
                    ]}
                    activeOpacity={0.8}>
                    <CalenderF width={SIZE(20)} height={SIZE(20)} />
                    <Text
                        style={[
                            styles.facilityViewMoreText,
                            {
                                color: '#fff',
                                marginLeft: SIZE(10),
                            },
                        ]}
                        allowFontScaling={false}>
                        Select Date & Time
                    </Text>
                </TouchableOpacity>
                {services?.length > 2 ? (
                    <TouchableOpacity
                        onPress={() => setShowAllItems(!showAllItems)}
                        style={styles.facilityViewMore}
                        activeOpacity={0.8}>
                        <Text
                            style={styles.facilityViewMoreText}
                            allowFontScaling={false}>
                            {showAllItems ? 'View Less' : 'View More'}
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

export default ServiceAndPricingTrainer;

const styles = StyleSheet.create({
    mainContentBox: {
        borderWidth: SIZE(1),
        paddingHorizontal: SIZE(15),
        borderRadius: SIZE(6),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
        paddingBottom: SIZE(15),
    },
    headerSection: {
        borderBottomWidth: SIZE(1),
        paddingVertical: SIZE(10),
        borderColor: '#E2E2E2',
    },
    header: {
        color: '#242424',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    subHead: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    checkBox: {
        width: SIZE(20),
        height: SIZE(20),
        borderRadius: SIZE(6),
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        marginTop: SIZE(6),
    },
    middleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    highlightBox: {
        backgroundColor: '#EAF7FF',
        paddingVertical: SIZE(8),
        borderRadius: SIZE(8),
        marginTop: SIZE(15),
    },
    descriptionText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        width: SIZES.width * 0.7,
    },
    petTypeList: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZE(12),
    },
    petTypeLeft: {
        flexDirection: 'row',
        // alignItems: 'center',
        gap: SIZE(4),
        marginRight: SIZE(12),
    },
    petTypeText: {
        color: '#969696',
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },
    infoMain: {
        borderWidth: SIZE(0.6),
        borderColor: '#E2E2E2',
        position: 'absolute',
        left: SIZE(90),
        top: SIZE(38),
        width: SIZE(180),
        height: SIZE(50),
        zIndex: 100,
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZE(10),
    },
    infoText: {
        color: '#969696',
        fontFamily: FONTS.medium,
        fontSize: SIZE(12),
    },
    petTypeRight: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: SIZE(8),
    },
    petTypeItem: {
        backgroundColor: '#F7F7F7',
        // height: SIZE(23),
        paddingVertical: SIZE(3),
        width: SIZE(53),
        borderRadius: SIZE(12),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: SIZE(1),
        borderColor: '#EDEDED',
    },
    trainingHours: {
        color: '#009FD3',
        fontSize: SIZE(12),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        textAlign: 'center',
    },
    facilityViewMore: {
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#003459',
        paddingVertical: SIZE(12),
        borderRadius: SIZE(6),
    },
    facilityViewMoreText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(40),
    },
    barContainer: {
        backgroundColor: '#009FD3',
        width: SIZE(70),
        height: SIZE(4),
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: SIZE(16),
        marginBottom: SIZE(22),
    },
    petTypes: {
        backgroundColor: '#F7F7F7',
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginBottom: 10,
        marginRight: 10,
        borderRadius: SIZE(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EDEDED',
    },
    petSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '77%',
    },
    headPet: {
        color: '#969696',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(22),
    },
});
