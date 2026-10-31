import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
//svg
import EditCustomer from '../../../../assets/icons/profile-icons/edit-customer.svg';
import {useNavigation} from '@react-navigation/native';
const OrderAddress = (address, setCartRecall) => {
    const navigation = useNavigation();

    return (
        <View style={styles.subContainer}>
            <View style={styles.addressContainer}>
                <View style={styles.detailContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>
                            {address?.address?.full_name}
                        </Text>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>
                            {address?.address?.address_1}
                            {'   '}
                            {address?.address?.address_2}{' '}
                            {address?.address?.street}
                            {address?.address?.emirate}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.nameText}>
                            {address?.address?.phone}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('EcoShippingAddress', {
                            from: 'ProductDetail',
                            setCartRecall: setCartRecall,
                        })
                    }
                    activeOpacity={0.8}
                    style={styles.button}>
                    <EditCustomer width={SIZE(20)} height={SIZE(20)} />
                    <Text style={styles.buttonText}>Change</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OrderAddress;

const styles = StyleSheet.create({
    subContainer: {
        marginHorizontal: SIZE(12),
        marginTop: SIZE(16),
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
});
