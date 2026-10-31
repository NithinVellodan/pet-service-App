import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    BackHandler,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import {React, useState, useEffect, useContext} from 'react';
import Headers from '../../../includes/headers/Headers';
//packages
import {useNavigation, useRoute} from '@react-navigation/native';
//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {EcommerceApiProductDonationOrderSingle} from '../../EcommerceCustomerApi';
import {Context} from '../../../../contexts/Store';

//components
import OrderId from './OrderId';
import OrderDetailDonate from './OrderDetailDonate';

const DonateCustomerSingle = ({route}) => {
    const navigation = useNavigation();

    //states
    const [cartItem, setCartItem] = useState();
    const [refreshing, setRefreshing] = useState(false);

    //api function
    EcommerceApiProductDonationOrderSingle(
        route.params.order_id,
        setCartItem,
        setRefreshing,
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
                icon={true}
                cart={true}
                cartPress={() => {
                    navigation.navigate('CartCustomer');
                }}
                headText={'Order Details'}
                is_go_back={true}
                isPayment={route?.params?.notification === true ? false : true}
            />
            {refreshing ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(185),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={styles.subContainer}>
                    <OrderId
                        donate={true}
                        provider_details={
                            cartItem?.product_details?.provider_details
                        }
                        order_related={{
                            order_id: cartItem?.order_id,
                            order_date: cartItem?.order_date,
                            total_amount: cartItem?.total_amount,
                            order_items_count: cartItem?.order_items_count,
                            order_status: cartItem?.order_status,
                            order_status_value: cartItem?.order_status_value,
                        }}
                    />
                    <OrderDetailDonate
                        product_details={cartItem?.product_details}
                        product_main={cartItem}
                    />
                    <TouchableOpacity
                        onPress={() => {}}
                        activeOpacity={0.8}
                        style={styles.helpContainer}>
                        <Text allowFontScaling={false} style={styles.helpText}>
                            Need Help
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </View>
    );
};

export default DonateCustomerSingle;

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
