import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
//packages
import moment from 'moment';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

export default function OrderId({donate, provider_details, order_related}) {
    return (
        <View style={styles.orderContainer}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarImageContainer}>
                    <Image
                        source={{uri: provider_details?.image}}
                        style={{width: '100%', height: '100%'}}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <View>
                        <Text style={styles.avatarName}>
                            {provider_details?.name}
                        </Text>
                    </View>
                </View>
            </View>
            <View>
                {donate ? null : (
                    <View style={styles.idContainer}>
                        <View style={styles.idTextContainer}>
                            <Text style={styles.idText}>Order ID</Text>
                        </View>
                        <View style={styles.dotContainer}>
                            <Text> :</Text>
                        </View>
                        <View style={styles.idTextContainer}>
                            <Text style={styles.orderNumber}>
                                {order_related?.order_id}
                            </Text>
                        </View>
                    </View>
                )}

                <View style={styles.idContainer}>
                    <View style={styles.idTextContainer}>
                        <Text style={styles.idText}>Order Date</Text>
                    </View>
                    <View style={styles.dotContainer}>
                        <Text> :</Text>
                    </View>
                    <View style={styles.idTextContainer}>
                        {order_related.order_date ? (
                            <Text style={styles.orderNumber}>
                                {moment(order_related?.order_date).format(
                                    'ddd, MMM DD, YYYY',
                                )}
                            </Text>
                        ) : null}
                    </View>
                </View>
                {donate ? null : (
                    <View style={styles.idContainer}>
                        <View style={styles.idTextContainer}>
                            <Text style={styles.idText}> Total</Text>
                        </View>
                        <View style={styles.dotContainer}>
                            <Text> :</Text>
                        </View>
                        <View style={styles.idTextContainer}>
                            <Text style={styles.orderNumber}>
                                AED {order_related?.total_amount} ({' '}
                                {order_related?.order_items_count} item )
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    orderContainer: {
        paddingVertical: SIZE(13),
        paddingHorizontal: SIZE(16),
        backgroundColor: '#FFF',
        borderRadius: SIZE(8),
        justifyContent: 'space-between',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: SIZE(1),
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(16),
    },
    avatarImage: {
        width: SIZE(32),
        height: SIZE(32),
        borderRadius: SIZE(32),
    },
    avatarName: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.semiBold,
        marginLeft: SIZE(12),
    },
    helpText: {color: '#003459', fontSize: SIZE(14), fontFamily: FONTS.bold},
    idContainer: {
        flexDirection: 'row',
        marginTop: SIZE(16),
        justifyContent: 'space-between',
    },
    idText: {
        fontSize: SIZE(14),
        color: '#686868',
        fontFamily: FONTS.regular,
    },
    orderNumber: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.semiBold,
    },
    dotContainer: {
        marginRight: SIZE(10),
    },
    avatarImageContainer: {
        width: SIZE(40),
        height: SIZE(40),
        borderRadius: SIZE(40),
        overflow: 'hidden',
    },
});
