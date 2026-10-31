import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {React, useState} from 'react';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
//svg
import UpArrow from '../../../../assets/icons/ecommerce/customer/arrow-up.svg';
import DownArrow from '../../../../assets/icons/ecommerce/customer/arrow-down.svg';
import Trash from '../../../../assets/icons/ecommerce/customer/trash.svg';
import TickCircleRed from '../../../../assets/icons/ecommerce/tick-circle-red.svg';
import StarIcon from '../../../../assets/icons/star.svg';
import StarLight from '../../../../assets/icons/starlight.svg';
import ReviewTrainer from '../../../homeScreens/includes/ReviewTrainer';

export default function TrackOrderForOrderDetails({
    orderDate,
    orderQuantity,
    orderRating,
    trashButton,
    cartItem,
    setItemStat,
    order_updates,
    order_cancelled_details,
    tracking_details,
}) {
    const navigation = useNavigation();
    const [isOrderContainerVisible, setOrderContainerVisible] = useState(false);

    const toggleOrderContainerVisibility = () => {
        setOrderContainerVisible(!isOrderContainerVisible);
    };

    const formatDate = isoString => {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const date = new Date(isoString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const ampm = date.getHours() >= 12 ? 'pm' : 'am';
        return `${day}, ${month} ${year} - ${hours}:${
            minutes < 10 ? '0' + minutes : minutes
        } ${ampm}`;
    };
    const formattedDate = formatDate(order_cancelled_details?.cancelled_date);
    const formattedDateTwo = formatDate(order_updates?.order_date);

    return (
        <View
            style={{
                backgroundColor: orderDate && '#fff',
                padding: orderDate && SIZE(16),
                borderRadius: orderDate && SIZE(8),
            }}>
            <View style={{backgroundColor: '#fff'}}>
                {orderDate && (
                    <View
                        style={[
                            styles.avatarContainer,
                            isOrderContainerVisible && {
                                borderBottomWidth: SIZE(1),
                                borderColor: '#E2E2E2',
                                paddingBottom: SIZE(16),
                                marginBottom: SIZE(16),
                            },
                        ]}>
                        <View>
                            <View>
                                <Text style={styles.shippingText}>
                                    Shipping items (
                                    {order_updates?.order_items_count})
                                </Text>
                            </View>
                            <View style={styles.deliveryDate}>
                                <Text style={styles.deliveryDateText}>
                                    {order_updates?.order_status_value}
                                    {'   '}(
                                    {order_updates?.order_status !== '50'
                                        ? formattedDateTwo
                                        : formattedDate}
                                    )
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            hitSlop={10}
                            style={styles.arrowContainer}
                            onPress={toggleOrderContainerVisibility}>
                            {isOrderContainerVisible ? (
                                <UpArrow width={SIZE(22)} height={SIZE(22)} />
                            ) : (
                                <DownArrow width={SIZE(22)} height={SIZE(22)} />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {isOrderContainerVisible && (
                <View>
                    {cartItem?.map((item, index) => (
                        <View
                            key={item?.id}
                            style={[
                                styles.orderContainerTwo,
                                {marginBottom: index == index - 1 ? 0 : 20},
                            ]}>
                            <View style={[styles.productContainer]}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{uri: item.image}}
                                        style={styles.avatarImage}
                                    />
                                </View>
                                <View style={styles.detailContainer}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <View style={styles.headingContainer}>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.headingText}>
                                                {item?.name}
                                            </Text>
                                        </View>
                                        {trashButton && (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setItemStat(item);
                                                }}
                                                style={{
                                                    padding: SIZE(6),
                                                    borderWidth: SIZE(1),
                                                    borderColor: '#E2E2E2',
                                                    borderRadius: SIZE(50),
                                                    alignSelf: 'center',
                                                }}>
                                                <Trash />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <View style={styles.descriptionContainer}>
                                        <Text
                                            numberOfLines={1}
                                            style={styles.description}>
                                            {item?.description}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: SIZE(8),
                                        }}>
                                        <View style={{width: SIZE(170)}}>
                                            <Text style={styles.headingText}>
                                                AED{' '}
                                                {item?.final_price
                                                    ? item?.final_price
                                                    : item.price}
                                            </Text>
                                        </View>
                                        {orderQuantity && (
                                            <View
                                                style={{
                                                    borderWidth: SIZE(1),
                                                    padding: SIZE(6),
                                                    borderColor: '#EDEDED',
                                                    borderRadius: SIZE(4),
                                                }}>
                                                <Text
                                                    style={
                                                        styles.headingTextTwo
                                                    }>
                                                    Qty : {item?.quantity}
                                                </Text>
                                            </View>
                                        )}
                                        {orderRating && (
                                            <View
                                                style={styles.ratingContainer}>
                                                <View
                                                    style={
                                                        styles.starContainer
                                                    }>
                                                    <StarIcon
                                                        width={SIZE(16)}
                                                        height={SIZE(16)}
                                                    />
                                                </View>
                                                <View>
                                                    <Text
                                                        allowFontScaling={false}
                                                        style={styles.starText}>
                                                        4 star
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                            {order_updates?.order_status === '40' && (
                                <View>
                                    {item?.review.customer_details ? (
                                        <ReviewTrainer
                                            item={{
                                                customer_details: {
                                                    email: 'fayisfaez@gmail.com',
                                                    image: 'http://192.168.1.95:8000/media/Customer/profile/dp_yOp3zVq.jpeg',
                                                    name: 'Fayis',
                                                    phone: '+917907254388',
                                                },
                                                date_updated:
                                                    '2024-05-17T09:48:38.343102Z',
                                                id: 'd19a3b66-1228-48b4-9c31-27700752556b',
                                                rating: 4,
                                                review: 'xvxdfsdf',
                                            }}
                                        />
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate(
                                                    'AddReview',
                                                    {
                                                        item: {
                                                            image: item?.image,
                                                            stay_name:
                                                                item?.name,
                                                            description:
                                                                item?.description,
                                                            pk: item?.id,
                                                        },

                                                        page_is: 'order_item',
                                                    },
                                                );
                                                // console.log(
                                                //     item,
                                                //     'AddReview__AddReview',
                                                // );
                                            }}
                                            style={{
                                                flexDirection: 'row',
                                                borderWidth: SIZE(1),
                                                backgroundColor: '#F7F7F7',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: SIZE(20),
                                                paddingVertical: SIZE(10),
                                                borderRadius: SIZE(8),
                                                borderColor: '#eee',
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: SIZE(14),
                                                    fontFamily: FONTS.regular,
                                                    color: '#757575',
                                                }}>
                                                Rate & Review
                                            </Text>
                                            <View style={styles.reviewDetails}>
                                                <View
                                                    key={index}
                                                    style={
                                                        styles.reviewContainer
                                                    }>
                                                    <View
                                                        style={
                                                            styles.starRatingContainer
                                                        }>
                                                        {[...Array(4)].map(
                                                            (_, i) => (
                                                                <StarIcon
                                                                    key={i}
                                                                    width={SIZE(
                                                                        16,
                                                                    )}
                                                                    height={SIZE(
                                                                        16,
                                                                    )}
                                                                />
                                                            ),
                                                        )}
                                                        {[...Array(1)].map(
                                                            (_, i) => (
                                                                <StarLight
                                                                    key={i}
                                                                    width={SIZE(
                                                                        16,
                                                                    )}
                                                                    height={SIZE(
                                                                        16,
                                                                    )}
                                                                />
                                                            ),
                                                        )}
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </View>
                    ))}
                    {order_updates?.order_status !== '50' ? (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('OrderStatus', {
                                    tracking_details: tracking_details,
                                    order_status: order_updates?.order_status,
                                })
                            }
                            style={styles.OrderCancelContainer}>
                            <Text style={styles.historyText}>
                                Track my order
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.orderContent}>
                            <TickCircleRed />
                            <View
                                style={{
                                    marginLeft: SIZE(10),
                                }}>
                                <Text style={styles.orderDates}>
                                    Order Cancelled{'  '}
                                    {formattedDate ? formattedDate : null}
                                </Text>
                                <Text style={styles.orderSubText}>
                                    {order_cancelled_details?.cancelled_reason}
                                    The bank has not confirmed your payment.
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shippingText: {
        fontSize: SIZE(14),
        lineHeight: SIZE(17.5),
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    deliveryDate: {marginTop: SIZE(8)},
    deliveryDateText: {
        fontSize: SIZE(14),
        lineHeight: SIZE(17.5),
        fontFamily: FONTS.medium,
        color: '#242424',
    },
    arrowContainer: {
        width: SIZE(20),
        height: SIZE(20),
    },
    orderContainerTwo: {
        paddingVertical: SIZE(13),
        paddingHorizontal: SIZE(16),
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    avatarImage: {
        width: SIZE(100),
        height: SIZE(100),
        borderRadius: SIZE(8),
    },
    productContainer: {
        flexDirection: 'row',
        paddingBottom: SIZE(16),
        borderColor: '#E2E2E2',
    },
    detailContainer: {
        flex: 1,
        marginLeft: SIZE(16),
    },
    headingContainer: {
        marginTop: SIZE(9.5),
        width: SIZE(150),
    },
    headingText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        color: '#00171F',
    },
    headingTextTwo: {
        fontSize: SIZE(12),
        fontFamily: FONTS.medium,
        color: '#00171F',
    },
    descriptionContainer: {
        marginTop: SIZE(8),
        width: SIZE(150),
    },
    description: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
    },
    discountContainer: {
        flexDirection: 'row',
    },
    OrderCancelContainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(24),
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        alignItems: 'center',
    },
    historyText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontFamily: FONTS.bold,
    },
    discountRate: {
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
        textDecorationLine: 'line-through',
        color: '#969696',
    },
    discountPerc: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(5),
        borderRadius: SIZE(4),
        backgroundColor: '#EDEDED',
    },
    starContainer: {
        marginRight: SIZE(10),
    },
    imageContainer: {},
    starText: {
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#969696',
    },
    downArrow: {
        marginLeft: SIZE(6),
        width: SIZE(14),
        height: SIZE(14),
    },
    orderContent: {
        borderRadius: SIZE(8),
        backgroundColor: '#FDE9E9',
        paddingVertical: SIZE(13),
        paddingHorizontal: SIZE(20),
        flexDirection: 'row',
    },
    orderDates: {
        fontFamily: FONTS.medium,
        color: '#242424',
        fontSize: SIZE(14),
        marginBottom: SIZE(10),
    },
    orderSubText: {
        fontFamily: FONTS.regular,
        color: '#242424',
        fontWeight: '600',
        fontSize: SIZE(14),
    },

    reviewName: {
        marginBottom: SIZE(4),
    },
    reviewNameText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    starRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewRight: {
        width: SIZE(24),
        height: SIZE(21),
    },
    reviewMiddle: {
        marginBottom: SIZE(8),
    },
    review: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    reviewDate: {
        color: '#969696',
        fontSize: SIZE(12),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
});
