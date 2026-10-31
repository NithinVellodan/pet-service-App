import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';

import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
//images and logos
import TrashCustomer from '../../../../assets/icons/profile-icons/trash-customer.svg';
import EditCustomer from '../../../../assets/icons/profile-icons/edit-customer.svg';
import RemoveCardModal from '../../../Profile-related/includes/RemoveCardModal';
import {Context} from '../../../../contexts/Store';

const EcoAddressComponent = ({
    item,
    handleRemoveItem,
    index,
    modalOpen,
    handleEditItem,
    section,
    handleDefaultItem,
    setDefaultAddress,
    removeAddress,
    pk,
}) => {
    const defaultAddress = section.find(item => item.is_default === true);
    const [removeModal, setRemoveModal] = useState(false);
    const {state} = useContext(Context);

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: '#E2E2E2',
                padding: SIZE(13),
                borderRadius: SIZE(8),
                backgroundColor: '#FFFFFF',
                marginBottom: SIZE(20),
            }}>
            <View>
                <View
                    style={{
                        borderBottomWidth: 1,
                        paddingBottom: SIZE(13),
                        borderColor: '#E2E2E2',
                    }}>
                    <View style={styles.contentBox}>
                        <View style={styles.topConection}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    handleDefaultItem(index);
                                    setDefaultAddress(section[index].id);
                                }}
                                style={[
                                    styles.selectButton,
                                    {
                                        borderColor:
                                            defaultAddress?.id === item.id
                                                ? '#009FD3'
                                                : '#969696',
                                    },
                                ]}>
                                <View
                                    style={[
                                        styles.selection,
                                        {
                                            backgroundColor:
                                                defaultAddress?.id === item.id
                                                    ? '#009FD3'
                                                    : '#fff',
                                        },
                                    ]}
                                />
                            </TouchableOpacity>

                            <Text style={styles.name}>{item.full_name}</Text>
                        </View>
                    </View>

                    <View style={{paddingLeft: SIZE(30)}}>
                        <Text
                            style={[
                                styles.addressLine,
                                {
                                    marginTop: SIZE(5),
                                },
                            ]}>
                            {item.address_1}
                        </Text>
                        <Text style={[styles.addressLine, {}]}>
                            {item.address_2}
                        </Text>
                        <Text style={[styles.addressLine, {}]}>
                            {item.emirate_display}
                        </Text>
                        <Text
                            style={[
                                styles.addressLine,
                                {
                                    marginBottom: SIZE(5),
                                },
                            ]}>
                            {item.street}
                        </Text>
                        <Text style={styles.phone}>+971 {item.phone}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        paddingTop: SIZE(10),
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            modalOpen(item);
                            handleEditItem(index);
                        }}
                        activeOpacity={0.8}
                        style={styles.button}>
                        <EditCustomer width={SIZE(20)} height={SIZE(20)} />
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            handleRemoveItem(index);
                            setRemoveModal(true);
                        }}
                        activeOpacity={0.8}
                        style={[styles.button, {marginLeft: SIZE(20)}]}>
                        <TrashCustomer width={SIZE(20)} height={SIZE(20)} />
                        <Text style={[[styles.buttonText]]}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                isVisible={removeModal}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={styles.modalContainer}
                onBackdropPress={() => setRemoveModal(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <RemoveCardModal
                    fromAddress={true}
                    removeCard={() => removeAddress(section[index]?.id)}
                    setRemoveModal={setRemoveModal}
                    state={state}
                    id={pk}
                    section={section}
                />
            </Modal>
        </View>
    );
};

export default EcoAddressComponent;

const styles = StyleSheet.create({
    phone: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        fontWeight: '600',
    },
    addressLine: {
        fontFamily: FONTS.regular,
        fontWeight: '400',
        color: '#969696',
        fontSize: SIZE(16),
    },
    name: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        marginLeft: SIZE(10),
        marginBottom: 5,
    },
    selectButton: {
        width: 20,
        height: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    selection: {
        width: 12,
        height: 12,
        backgroundColor: 'red',
        borderRadius: 100,
    },
    topConection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        marginLeft: SIZE(10),
    },
});
