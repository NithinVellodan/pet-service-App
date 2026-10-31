import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';

// packages

// constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// components
import RangeSelection from './includes/RangeSelection';
import {useRoute} from '@react-navigation/native';
import {EcommerceApi} from '../main/EcommerceApiSection';
import EcoTypes from './includes/EcoTypes';

const MainFilterProvider = ({
    filterPage,
    navigation,
    navigate,
    geoAddressText,
    onlyModal,
    setSelectedFilter,
    setMinMmax,
    setIsFilterActive,
    mostPrice,
}) => {
    //states

    const [low, setLow] = useState(null);
    const [high, setHigh] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [selectedPet, setSelectedPet] = useState('');
    const [values, setValues] = useState([1, mostPrice ? mostPrice : 250]);
    const [productType, setProductType] = useState([]);

    EcommerceApi(setProductType);

    return (
        <>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: SIZE(100)}}
                style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <View style={styles.headingContainer}>
                        <Text
                            allowFontScaling={false}
                            style={styles.filterText}>
                            Filters
                        </Text>
                    </View>
                    <EcoTypes
                        setSelectedPet={setSelectedPet}
                        selectedPet={selectedPet}
                        petData={productType}
                        name={'Product Category'}
                        multiselect={true}
                    />
                    <RangeSelection
                        values={values}
                        setValues={setValues}
                        final_range={mostPrice}
                    />
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (onlyModal) {
                            filterPage();
                            setMinMmax('');
                        } else {
                            filterPage();
                        }
                    }}
                    activeOpacity={0.8}
                    style={styles.leftButton}>
                    <Text style={styles.leftText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (onlyModal) {
                            setSelectedFilter(selectedPet);
                            filterPage();
                            setMinMmax(values);
                            setIsFilterActive(true);
                        } else {
                        }
                    }}
                    activeOpacity={0.8}
                    style={styles.rightButton}>
                    <Text style={styles.rightText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default MainFilterProvider;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: SIZE(32),
        paddingTop: SIZE(10),
        backgroundColor: '#F7F7F7',
        width: SIZES.width,
    },
    subContainer: {},
    headingContainer: {
        paddingBottom: SIZE(13),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
        marginBottom: SIZE(24),
    },
    filterText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    itemContainer: {
        padding: SIZE(15),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        marginBottom: SIZE(16),
    },
    itemTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: SIZE(12),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    itemHeading: {},
    itemHeadingText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    arrowContainer: {
        width: SIZE(16),
        height: SIZE(16),
    },
    itemBottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(24),
    },
    leftButton: {
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(12),
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        width: SIZES.width * 0.4,
    },
    leftText: {
        color: '#003459',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        letterSpacing: SIZE(0.5),
    },
    rightButton: {
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        alignItems: 'center',
        borderRadius: SIZE(8),
        backgroundColor: '#009FD3',
        width: SIZES.width * 0.4,
    },
    rightText: {
        color: '#FFF',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
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
});
