import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
//images and logos
import TickCircle from '../../../../assets/icons/tick-circle.svg';
import TickCircleTwo from '../../../../assets/icons/tick-circle-two.svg';
import TickCircleThree from '../../../../assets/icons/tick-circle-three.svg';

const OrderDetailDonate = ({product_details, product_main}) => {
    //format date and time
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
    const formattedDate = formatDate(product_main?.accepted_time);
    const formattedDateTwo = formatDate(product_main?.rejected_time);

    //background and icon styles function
    const getStatusStyles = product_main => {
        let icon, backgroundColor;
        switch (product_main?.order_status) {
            case 'Product Accepted':
                icon = <TickCircleThree width={SIZE(20)} height={SIZE(20)} />;
                backgroundColor = '#0BBE491A';
                break;
            case 'Product Requested':
                icon = <TickCircle width={SIZE(20)} height={SIZE(20)} />;
                backgroundColor = '#EAF7FF';
                break;
            case 'Product Rejected':
                icon = <TickCircleTwo width={SIZE(20)} height={SIZE(20)} />;
                backgroundColor = '#CF29291A';
                break;
            default:
                icon = <TickCircleTwo width={SIZE(20)} height={SIZE(20)} />;
                backgroundColor = 'white';
                break;
        }

        return {icon, backgroundColor};
    };
    const {icon, backgroundColor} = getStatusStyles(product_main);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.donateDetailTop}>
                <View style={styles.productImageContainer}>
                    <Image
                        style={styles.productImage}
                        source={{uri: product_details?.image}}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Text
                        numberOfLines={1}
                        allowFontScaling={false}
                        style={styles.titleText}>
                        {product_details?.product_name}
                    </Text>
                    <Text
                        allowFontScaling={false}
                        numberOfLines={4}
                        style={styles.descText}>
                        {product_details?.description}
                    </Text>
                </View>
            </View>
            <View
                style={[
                    styles.orderContent,
                    {backgroundColor: backgroundColor},
                ]}>
                {icon}
                <View
                    style={{
                        marginLeft: SIZE(10),
                    }}>
                    <Text style={styles.orderText}>
                        {product_main?.order_status}
                    </Text>
                    {product_main?.cancelled_reason ? (
                        <Text style={styles.orderSubText}>
                            {product_main?.cancelled_reason}
                        </Text>
                    ) : null}
                    <Text style={styles.orderDate}>
                        {product_main?.accepted_time ? formattedDate : null}
                    </Text>
                    <Text style={styles.orderDate}>
                        {product_main?.rejected_time ? formattedDateTwo : null}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default OrderDetailDonate;

const styles = StyleSheet.create({
    mainContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        padding: SIZE(16),
        borderRadius: SIZE(8),
        backgroundColor: '#fff',
    },

    orderContent: {
        borderRadius: SIZE(8),
        backgroundColor: '#FDE9E9',
        paddingVertical: SIZE(13),
        paddingHorizontal: SIZE(20),
        flexDirection: 'row',
        marginTop: SIZE(16),
    },
    orderText: {
        fontFamily: FONTS.medium,
        color: '#242424',
        fontSize: SIZE(14),
        marginBottom: SIZE(10),
    },
    orderSubText: {
        fontFamily: FONTS.regular,
        fontWeight: '400',
        fontSize: SIZE(14),
        color: '#242424',
    },
    donateDetailTop: {
        flexDirection: 'row',
        paddingBottom: SIZE(16),
        alignItems: 'center',
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    productImageContainer: {
        width: SIZE(100),
        height: SIZE(100),
        marginRight: SIZE(16),
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: '100%',
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
    titleText: {
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        fontSize: SIZE(18),
        color: '#00171F',
        marginBottom: SIZE(8),
    },
    descText: {
        fontFamily: FONTS.regular,
        fontWeight: '400',
        fontSize: SIZE(14),
        color: '#757575',
    },
    orderDate: {
        fontFamily: FONTS.regular,
        fontWeight: '400',
        fontSize: SIZE(14),
        color: '#686868',
    },
});
