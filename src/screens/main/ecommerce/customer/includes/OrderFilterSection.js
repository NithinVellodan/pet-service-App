import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

//svg
import CloseIcon from '../../../../../assets/icons/close-icon-blue.svg';

//coṇstant
import {SIZE, SIZES} from '../../../../../theme/theme';

import {FONTS} from '../../../../../theme/fonts';
import FilterComponent from './FilterComponent';
import RangeSelection from '../../../../filter/includes/RangeSelection';
import {EcommerceApi} from '../../../EcommerceApiSection';

const OrderFilterSection = ({
    close,
    orderStatus,
    setOrderStatus,
    orderTime,
    setOrderTime,
    // values,
    // setValues,
    page,
    priceValue,
    setPriceValue,
    mostPrice,
    setIsFilterActive,
}) => {
    const [values, setValues] = useState([1, mostPrice ? mostPrice : 1000]);
    const [orderStatus1, setOrderStatus1] = useState([]);
    const [orderTime1, setOrderTime1] = useState('');
    const [category, setCategory] = useState([]);

    EcommerceApi(setCategory);

    //
    const petData = [
        {
            id: 10,
            name: 'Placed',
            width: SIZE(170),
        },
        {
            id: 20,
            name: 'Confirmed',
            width: SIZE(170),
        },
        {
            id: 30,
            name: 'On the way',
            width: SIZE(170),
        },
        {
            id: 40,
            name: 'Delivered',
            width: SIZE(170),
        },
        {
            id: 50,
            name: 'Cancelled',
            width: SIZE(170),
        },
    ];

    const foodItem = [
        {
            id: 10,
            name: 'Food',
            width: SIZE(170),
        },
        {
            id: 20,
            name: 'Cages',
            width: SIZE(170),
        },
        {
            id: 30,
            name: 'Vessels',
            width: SIZE(170),
        },
        {
            id: 40,
            name: 'Toys',
            width: SIZE(170),
        },
        {
            id: 50,
            name: 'Shampoo',
            width: SIZE(170),
        },
    ];
    const orderTimes = [
        {
            id: 'within_month',
            name: 'Last 30 days',
            width: SIZE(170),
        },
        {
            id: 'last_2_months',
            name: 'Last 2 months',
            width: SIZE(170),
        },
        {
            id: 'last_6_months',
            name: 'Last 6 Months',
            width: SIZE(170),
        },
        {
            id: '2024',
            name: '2024',
            width: SIZE(170),
        },
    ];

    const FilterOption = () => {
        return (
            <View>
                <View style={styles.mainHeadingContainer}>
                    <Text style={styles.mainHeading}>Filters</Text>
                </View>
                <View style={styles.petDataContainer}>
                    <FilterComponent
                        selectedPet={orderStatus1}
                        setSelectedPet={setOrderStatus1}
                        name={'Order Status'}
                        petData={petData}
                        multiple={true}
                    />
                </View>
                <View style={styles.petDataContainer}>
                    <FilterComponent
                        selectedPet={orderTime1}
                        setSelectedPet={setOrderTime1}
                        name={'Order Time'}
                        petData={orderTimes}
                    />
                </View>
            </View>
        );
    };

    const FilterOptionProduct = () => {
        return (
            <View>
                <View style={styles.mainHeadingContainer}>
                    <Text style={styles.mainHeading}>Filters</Text>
                </View>
                <View style={styles.petDataContainer}>
                    <FilterComponent
                        selectedPet={orderStatus1}
                        setSelectedPet={setOrderStatus1}
                        name={'Product Category'}
                        petData={category}
                        multiple={true}
                    />
                </View>
                <View style={styles.petDataContainer}>
                    <RangeSelection
                        values={values}
                        setValues={setValues}
                        final_range={mostPrice}
                    />
                </View>
            </View>
        );
    };

    //useNavigation
    return (
        <View style={{flex: 1, backgroundColor: '#F7F7F7', width: SIZES.width}}>
            <View style={{height: SIZE(60)}}>
                <TouchableOpacity
                    onPress={() => {
                        close(false);
                        setOrderStatus([]);
                        setOrderTime('');
                    }}
                    hitSlop={SIZE(5)}
                    style={{
                        position: 'absolute',
                        top: SIZE(20),
                        right: SIZE(20),
                    }}>
                    <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.container}>
                {/* <TouchableOpacity
                    onPress={() => {
                        close(false);
                        setOrderStatus([]);
                        setOrderTime('');
                    }}
                    hitSlop={SIZE(5)}
                    style={{
                        position: 'absolute',
                        top: SIZE(20),
                        right: SIZE(20),
                    }}>
                    <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                </TouchableOpacity> */}
                {page == 'is_order_page'
                    ? FilterOption()
                    : FilterOptionProduct()}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => {
                        close(false);
                        setOrderStatus([]);
                        setOrderTime('');
                    }}
                    activeOpacity={0.8}
                    style={styles.leftButton}>
                    <Text style={styles.leftText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        close(false);
                        setOrderStatus && setOrderStatus(orderStatus1);
                        setOrderTime && setOrderTime(orderTime1);
                        setPriceValue && setPriceValue(values);
                        setIsFilterActive && setIsFilterActive(true);
                    }}
                    activeOpacity={0.8}
                    style={styles.rightButton}>
                    <Text style={styles.rightText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OrderFilterSection;

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        paddingTop: SIZE(10),
        paddingBottom: SIZE(30),
        paddingHorizontal: SIZE(16),
        // minHeight: SIZES.height - SIZE(150),
    },

    mainHeadingContainer: {
        borderBottomWidth: SIZE(2),
        paddingBottom: SIZE(16),
        borderBottomColor: '#E2E2E2',
    },
    mainHeading: {
        fontSize: SIZE(24),
        color: '#242424',
        fontFamily: FONTS.semiBold,
    },
    petDataContainer: {
        marginTop: SIZE(24),
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: SIZE(40),
        left: SIZE(10),
        right: SIZE(10),
        paddingHorizontal: SIZE(10),
    },
    leftButton: {
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(12),
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        width: SIZES.width * 0.43,
    },
    leftText: {
        color: '#000',
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
        width: SIZES.width * 0.43,
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
