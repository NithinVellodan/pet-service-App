import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
// component
import Headers from '../../../includes/headers/Headers';
import {useNavigation} from '@react-navigation/native';
//svg
import UpIcon from '../../../../assets/icons/arrow-up.svg';
import DownIcon from '../../../../assets/icons/arrow-down.svg';
import AvatarOne from '../../../../assets/icons/ecommerce/customer/avatar-one.svg';
import AvatarTwo from '../../../../assets/icons/ecommerce/customer/avatar-two.svg';
import AvatarThree from '../../../../assets/icons/ecommerce/customer/avatar-three.svg';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import OfferCard from '../includes/OfferCard';
import OrderAddress from '../includes/OrderAddress';
import UserContainer from '../includes/UserContainer';

const OrderSummary = ({route}) => {
    const [isVisible, setIsVisible] = useState(true);
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState();
    const data = [
        {
            id: 1,
            image: require('../../../../assets/images/ecommerce/customer/food1.png'),
            title: 'All Cats',
            description: 'Mollis et et adipiscing...',
            price: 60,
            offer: 30,
            rate: 49,
            avatar: <AvatarOne width={'100%'} height={'100%'} />,
            name: 'Carter Geidt',
            rating: 4.5,
        },
        {
            id: 2,
            image: require('../../../../assets/images/ecommerce/customer/food2.png'),
            title: 'All Cats',
            description: 'Mollis et et adipiscing...',
            price: 60,
            offer: 35,
            rate: 50,
            avatar: <AvatarThree width={'100%'} height={'100%'} />,
            name: 'Robert',
            rating: 3.5,
        },
        {
            id: 3,
            image: require('../../../../assets/images/ecommerce/customer/food3.png'),
            title: 'Insect Dog',
            description: 'Mollis et et adipiscing...',
            price: 60,
            offer: 45,
            rate: 50,
            avatar: <AvatarTwo width={'100%'} height={'100%'} />,
            name: 'Lexiya',
            rating: 5,
        },
        {
            id: 4,
            image: require('../../../../assets/images/ecommerce/customer/food4.png'),
            title: 'Himalaya Food',
            description: 'Mollis et et adipiscing...',
            price: 60,
            offer: 20,
            rate: 4.5,
            avatar: <AvatarOne width={'100%'} height={'100%'} />,
            rating: 2.9,
            name: 'Nithin',
        },
    ];

    return (
        <View>
            <Headers headText={'Order Summary'} />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <OrderAddress />
                <View>
                    {data.map((item, index) => (
                        <OfferCard
                            key={index}
                            item={item}
                            orderSummaryData={true}
                            staticData={true}
                        />
                    ))}
                </View>
                <View style={styles.paymentSection}>
                    {route?.params?.donate ? (
                        <View>
                            <UserContainer donatedCustomer={true} />
                        </View>
                    ) : (
                        <View style={styles.paymentDetail}>
                            <TouchableOpacity
                                style={styles.paymentDetailHead}
                                onPress={() => setIsVisible(!isVisible)}
                                activeOpacity={0.8}>
                                <Text style={styles.paymentDetailText}>
                                    Payment Detail
                                </Text>
                                {isVisible ? (
                                    <UpIcon
                                        width={SIZE(24)}
                                        height={SIZE(24)}
                                    />
                                ) : (
                                    <DownIcon
                                        width={SIZE(24)}
                                        height={SIZE(24)}
                                    />
                                )}
                            </TouchableOpacity>
                            {isVisible && (
                                <View style={styles.transantion}>
                                    <View style={styles.transantionItems}>
                                        <Text style={styles.transantionItem}>
                                            Subtotal
                                        </Text>
                                        <Text
                                            style={styles.transantionItemCount}>
                                            AED 800
                                        </Text>
                                    </View>
                                    <View style={styles.transantionItems}>
                                        <Text style={styles.transantionItem}>
                                            Food (Addon)
                                        </Text>
                                        <Text
                                            style={styles.transantionItemCount}>
                                            AED 100
                                        </Text>
                                    </View>
                                    <View style={styles.transantionItems}>
                                        <Text style={styles.transantionItem}>
                                            Tax (5 % VAT)
                                        </Text>
                                        <Text
                                            style={styles.transantionItemCount}>
                                            AED 50
                                        </Text>
                                    </View>
                                    <View style={styles.totalSection}>
                                        <Text style={styles.totalText}>
                                            Total
                                        </Text>
                                        <Text style={styles.totalText}>
                                            AED 950
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => navigation.navigate('CustomerPayment')}
                        activeOpacity={0.8}
                        style={[
                            styles.nextContainer,
                            {
                                width: SIZE(380),
                                backgroundColor: '#009FD3',
                            },
                        ]}>
                        {isLoading ? (
                            <ActivityIndicator size={'small'} color={'#fff'} />
                        ) : (
                            <Text
                                allowFontScaling={false}
                                style={styles.nextText}>
                                Continue
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default OrderSummary;

const styles = StyleSheet.create({
    subContainer: {
        marginHorizontal: SIZE(12),
        marginVertical: SIZE(24),
    },
    addressContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        padding: SIZE(12),
        borderRadius: SIZE(12),
    },
    detailContainer: {
        padding: SIZE(12),
        borderBottomWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: SIZE(16),
    },
    buttonText: {
        textAlign: 'center',
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        marginLeft: SIZE(10),
    },
    nameContainer: {
        marginBottom: SIZE(12),
    },
    nameText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.bold,
    },
    descriptionContainer: {
        marginBottom: SIZE(8),
    },
    descriptionText: {
        fontSize: SIZE(14),
        color: '#969696',
        fontFamily: FONTS.regular,
    },
    ///payment
    paymentSection: {
        paddingHorizontal: SIZE(16),
        marginTop: SIZE(24),
        marginBottom: SIZE(100),
    },
    paymentDetail: {
        padding: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
    },
    paymentDetailHead: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        borderColor: '#E2E2E2',
        borderBottomWidth: 1,
        paddingBottom: SIZE(16),
    },
    paymentDetailText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#00171F',
    },
    transantion: {},

    transantionItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(12),
    },
    transantionItem: {
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    transantionItemCount: {
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(16),
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        paddingTop: SIZE(16),
    },
    totalText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#009FD3',
    },
    nextContainer: {
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        width: SIZE(174),
        backgroundColor: '#003459',
    },
    nextText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
        lineHeight: SIZE(20),
    },
    saveAddressContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: SIZE(20),
        paddingHorizontal: SIZE(22),
    },
});
