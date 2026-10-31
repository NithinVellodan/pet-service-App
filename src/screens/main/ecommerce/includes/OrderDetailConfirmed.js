import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    BackHandler,
    TouchableOpacity,
} from 'react-native';
import {React, useState, useEffect, useContext} from 'react';
import Headers from '../../../includes/headers/Headers';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
//components
import OrderId from './OrderId';
import ShippingAddress from './ShippingAddress';
import PaymentDetailCustomer from './PaymentDetailCustomer';
import {useNavigation, useRoute} from '@react-navigation/native';
import {EcommerceApiProductOrderSingle} from '../../EcommerceCustomerApi';
import TrackOrderForOrderDetails from './TrackOrderForOrderDetails';
import {Context} from '../../../../contexts/Store';
import {ecommerceApiCustomers} from '../../../../../axiosConfig';

const OrderDetailConfirmed = ({route}) => {
    const navigation = useNavigation();
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItem, setCartItem] = useState();
    const [shippiDetails, setShippiDetails] = useState();

    EcommerceApiProductOrderSingle(
        route.params.order_id,
        setCartItem,
        setShippiDetails,
    );

    useEffect(() => {
        const backAction = () => {
            if (route?.params?.notification === true) {
                navigation.goBack();
            } else {
                navigation.navigate('OrderCustomer', {
                    is_active_detail_Confirm: true,
                });
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [navigation]);

    return (
        <View style={styles.mainContainer}>
            <Headers
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                onPressSearch={() => {
                    setIsSearch(true);
                }}
                setSearchQuery={setSearchQuery}
                setSearchQueryCustomer={setSearchQuery}
                icon={true}
                cartPress={() => {
                    navigation.navigate('CartCustomer');
                }}
                headText={'Order Details'}
                is_go_back={true}
                isPayment={route.params.notification === true ? false : true}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.subContainer}>
                <OrderId
                    provider_details={cartItem?.provider_details}
                    order_related={{
                        order_id: cartItem?.order_id,
                        order_date: cartItem?.order_date,
                        total_amount: cartItem?.total_amount,
                        order_items_count: cartItem?.order_items_count,
                        order_status: cartItem?.order_status,
                        order_status_value: cartItem?.order_status_value,
                    }}
                />
                <TrackOrderForOrderDetails
                    trackingHistory={true}
                    orderDate={true}
                    orderQuantity={true}
                    cartItem={cartItem?.order_items}
                    order_updates={{
                        order_items_count: cartItem?.order_items_count,
                        order_status: cartItem?.order_status,
                        order_status: cartItem?.order_status,
                        order_status_value: cartItem?.order_status_value,
                        order_date: cartItem?.order_date,
                    }}
                    order_cancelled_details={{
                        cancelled_date: cartItem?.cancelled_date,
                        cancelled_reason: cartItem?.cancelled_reason,
                        order_status_value: cartItem?.order_status_value,
                    }}
                    tracking_details={cartItem?.tracking_details}
                    is_detail_confirm={true}
                />
                <ShippingAddress shippiDetails={shippiDetails} />
                <PaymentDetailCustomer detailData={cartItem?.price_details} />
                <TouchableOpacity
                    onPress={() => {}}
                    activeOpacity={0.8}
                    style={styles.helpContainer}>
                    <Text allowFontScaling={false} style={styles.helpText}>
                        Need Help
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default OrderDetailConfirmed;

const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: SIZE(120),
    },
    subContainer: {
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(24),
        gap: SIZE(16),
    },
    helpContainer: {
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(24),
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(6),
    },
    helpText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        textAlign: 'center',
    },
});
