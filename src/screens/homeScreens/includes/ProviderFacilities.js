import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
//images and logos
import Info from '../../../assets/icons/infocircle.svg';

const ProviderFacilities = ({openModal, selectedFacilities}) => {
    const [showAll, setShowAll] = useState(false);

    const visibleFacilities = showAll
        ? selectedFacilities
        : selectedFacilities.slice(0, 3);

    const handleViewMore = () => {
        setShowAll(true);
    };

    return (
        <View style={styles.facilities}>
            <View style={styles.facilitiesHead}>
                <Text allowFontScaling={false} style={styles.facilitiesText}>
                    Facilities
                </Text>
            </View>
            {visibleFacilities.map((item, index) => (
                <View key={index} style={styles.facilitiesList}>
                    <View style={styles.facilitiesListItem}>
                        <View style={{width: SIZE(30), height: SIZE(30)}}>
                            <Image
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: SIZE(32),
                                }}
                                source={{uri: item.icon}}
                            />
                        </View>
                        <Text
                            allowFontScaling={false}
                            style={styles.facilitiesType}>
                            {item.title}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => openModal(item)}
                        activeOpacity={0.8}>
                        <Info width={SIZE(20)} height={SIZE(20)} />
                    </TouchableOpacity>
                </View>
            ))}

            {selectedFacilities.length > 2 ? (
                <View>
                    {!showAll ? (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.facilitiesViewButton}
                            onPress={handleViewMore}>
                            <Text
                                allowFontScaling={false}
                                style={styles.TextViewButton}>
                                View More
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.facilitiesViewButton}
                            onPress={() => {
                                setShowAll(false);
                            }}>
                            <Text
                                allowFontScaling={false}
                                style={styles.TextViewButton}>
                                View Less
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : null}
        </View>
    );
};

export default ProviderFacilities;

const styles = StyleSheet.create({
    facilities: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 10,
        width: '100%',
        padding: SIZE(16),
        backgroundColor: '#FFFFFF',
    },

    facilitiesHead: {
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(12),
        marginBottom: SIZE(16),
    },
    facilitiesText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
    },
    facilitiesList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZE(8),
        paddingVertical: SIZE(8),
    },
    facilitiesListItem: {
        flexDirection: 'row',
    },
    facilitiesType: {
        marginLeft: SIZE(12),
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        marginBottom: SIZE(12),
    },
    facilitiesViewButton: {
        alignSelf: 'center',
        marginTop: SIZE(28),
        letterSpacing: 0.5,
    },
    TextViewButton: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
    },
});
