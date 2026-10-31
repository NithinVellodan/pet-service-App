import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
    NativeModules,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

//packages
import Toast, {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {Context} from '../../../../contexts/Store';
import {CustomerShippingAddressList} from '../../EcommerceCustomerApi';
import EcoAddressComponent from './EcoAddressComponent';
import {ecommerceApiCustomers} from '../../../../../axiosConfig';
import CustomToast from '../../../../components/toast/CustomToast';

//components
import Headers from '../../../includes/headers/Headers';
import EcoAddNewAddress from './EcoAddNewAddress';

//images and logos
import SpotLightLogo from '../../../../assets/icons/empty-page/Address-null.svg';
import ArrowRight from '../../../../assets/icons/profile-icons/arrow-right.svg';
import AddTo from '../../../../assets/icons/profile-icons/add-to.svg';

const EcoShippingAddress = ({route}) => {
    const {state} = useContext(Context);
    const navigation = useNavigation();
    const {StatusBarManager} = NativeModules;
    const toastRef = useRef();
    const toast = useToast();

    const [section, setSection] = useState([]);
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [selected, setSelected] = useState();
    const [pk, setPk] = useState(null);
    const [isLoading, setIsLoading] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [selectedAddressPk, setSelectedAddressPk] = useState('');
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [edited, setEdited] = useState(false);

    CustomerShippingAddressList(
        setSection,
        section,
        refreshing,
        setIsLoading,
        setSelectedAddressPk,
    );

    //addNewAddress function
    const addNewAddress = async newSection => {
        setRefreshing(true);
        const token = state.userData.accessToken;
        const formData = new FormData();
        formData.append('full_name', newSection[0]?.name);
        formData.append('phone', newSection[0]?.phone);
        formData.append('address_1', newSection[0]?.address);
        formData.append('address_2', newSection[0]?.addressLine2);
        formData.append('street', newSection[0]?.street);
        formData.append('emirate', newSection[0]?.emiratesValue);
        formData.append('is_default', newSection[0]?.is_default);
        formData.append('latitude', newSection[0]?.exactLocation.latitude);
        formData.append('location', newSection[0]?.location);
        formData.append('longitude', newSection[0]?.exactLocation.longitude);
        try {
            await ecommerceApiCustomers
                .post('create-shipping-address/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    setRefreshing(false);
                    toast.show(response.data.message, {
                        type: 'success',
                    });
                })
                .catch(error => {
                    setRefreshing(false);
                    console.log('error try => ', error);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    //editAddress function
    const editAddress = async editedItem => {
        setRefreshing(true);
        const token = state.userData.accessToken;
        const formData = new FormData();

        formData.append('full_name', editedItem.name);
        formData.append('phone', editedItem.phone);
        formData.append('address_1', editedItem.address);
        formData.append('address_2', editedItem.addressLine2);
        formData.append('street', editedItem.street);
        formData.append('emirate', editedItem.emiratesValue);
        formData.append('is_default', editedItem.is_default);
        formData.append('latitude', editedItem.exactLocation.latitude);
        formData.append('location', editedItem.location);
        formData.append('longitude', editedItem.exactLocation.longitude);
        try {
            await ecommerceApiCustomers
                .put(`update-shipping-address/${pk}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    setRefreshing(false);
                    toast.show(response.data.message, {
                        type: 'success',
                    });
                })
                .catch(error => {
                    setRefreshing(false);
                    console.log('error try => ', error.response.data);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    //handleRemoveItem function
    const handleRemoveItem = index => {
        setPk(section[index].id);
    };
    //modalOpen function
    const modalOpen = item => {
        setCalModalVisible(!calModalVisible);
    };
    //handleAddItem function
    const handleAddItem = Item => {
        const newSection = [];
        newSection.push(Item);
        addNewAddress(newSection);
    };
    //handleEditItem function
    const handleEditItem = index => {
        setEditedIndex(index);
        setEditedItem(section[index]);
        setEdited(true);
        setPk(section[index].id);
    };
    //handleSaveEdit function
    const handleSaveEdit = editedItem => {
        const newSection = [...section];
        newSection[editedIndex] = editedItem;
        editAddress(editedItem);
        setEditedIndex(null);
        setEditedItem({});
        setCalModalVisible(false);
        setEdited(false);
        setPk(null);
    };
    //handleDefaultItem function
    const handleDefaultItem = index => {
        setPk(section[index].id);
    };
    //setDefaultAddress function
    const setDefaultAddress = async pk => {
        setRefreshing(true);
        const token = state.userData.accessToken;

        try {
            await ecommerceApiCustomers
                .post(
                    `set-default-shipping-address/${pk}/`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then(response => {
                    setRefreshing(false);
                    setPk(null);
                    toast.show('Default Address Selected', {
                        type: 'success',
                    });
                })
                .catch(error => {
                    setRefreshing(false);
                    console.log('error try => ', error.response.data);
                    setPk(null);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };
    //removeAddress function
    const removeAddress = async pk => {
        setRefreshing(true);
        const token = state.userData.accessToken;
        try {
            await ecommerceApiCustomers
                .delete(`delete-shipping-address/${pk}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setRefreshing(false);
                    setPk('');
                    toast.show('Address Removed', {
                        type: 'success',
                    });
                })
                .catch(error => {
                    setRefreshing(false);
                    console.log('error try => ', error);
                    setPk('');
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <Headers headText={'My Addresses'} />
            <View style={styles.container}>
                <>
                    {section.length === 0 ? (
                        <View style={styles.spotlightMain}>
                            <View style={styles.spotlight}>
                                <SpotLightLogo width={'100%'} height={'100%'} />
                            </View>
                            <View style={styles.bottom}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.mainText}>
                                    No Address
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.subText}>
                                    Your Address is empty now!
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        modalOpen();
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.button}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.buttonText}>
                                        + Add New Address
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View
                            style={{
                                paddingHorizontal: SIZE(16),
                                marginBottom: SIZE(90),
                                marginTop: SIZE(30),
                            }}>
                            <View style={{paddingBottom: SIZE(20)}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        modalOpen();
                                    }}
                                    activeOpacity={0.8}
                                    style={[styles.buttonIndex]}>
                                    <AddTo width={SIZE(20)} height={SIZE(20)} />
                                    <Text style={styles.bottomButtonText}>
                                        Add New Address
                                    </Text>
                                    <ArrowRight
                                        width={SIZE(20)}
                                        height={SIZE(20)}
                                    />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                bounces={false}
                                contentContainerStyle={{
                                    paddingBottom: SIZE(170),
                                }}
                                data={section}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item, index}) => (
                                    <>
                                        <EcoAddressComponent
                                            item={item}
                                            index={index}
                                            handleRemoveItem={handleRemoveItem}
                                            modalOpen={modalOpen}
                                            handleEditItem={handleEditItem}
                                            handleSaveEdit={handleSaveEdit}
                                            editedItem={editedItem}
                                            selected={selected}
                                            setSelected={setSelected}
                                            section={section}
                                            handleDefaultItem={
                                                handleDefaultItem
                                            }
                                            setDefaultAddress={
                                                setDefaultAddress
                                            }
                                            removeAddress={removeAddress}
                                            pk={pk}
                                        />
                                        <Modal
                                            isVisible={calModalVisible}
                                            animationInTiming={400}
                                            animationOutTiming={400}
                                            animationIn={'slideInUp'}
                                            backdropOpacity={0.2}
                                            swipeDirection={['down']}
                                            useNativeDriver={false}
                                            useNativeDriverForBackdrop={true}
                                            onSwipeComplete={() => {
                                                setCalModalVisible(false),
                                                    setEdited(false);
                                            }}
                                            style={[
                                                styles.modalContainer,
                                                {
                                                    marginTop:
                                                        Platform.OS === 'ios'
                                                            ? StatusBarManager.HEIGHT +
                                                              SIZES.height *
                                                                  0.009
                                                            : StatusBarManager.HEIGHT -
                                                              SIZE(10),
                                                },
                                            ]}
                                            onBackdropPress={() => {
                                                setCalModalVisible(false),
                                                    setEdited(false);
                                                modalOpen();
                                            }}
                                            onBackButtonPress={() => {
                                                modalOpen();
                                                setEdited(false);
                                            }}
                                            propagateSwipe={true}
                                            avoidKeyboard={true}>
                                            <>
                                                <EcoAddNewAddress
                                                    handleAddItem={
                                                        handleAddItem
                                                    }
                                                    modalOpen={modalOpen}
                                                    editedItem={editedItem}
                                                    handleSaveEdit={
                                                        handleSaveEdit
                                                    }
                                                    edited={edited}
                                                    setEdited={setEdited}
                                                    isLoading={isLoading}
                                                    section={section}
                                                    toastRef={toastRef}
                                                />
                                            </>
                                            <Toast
                                                renderToast={toastOptions => {
                                                    return (
                                                        <CustomToast
                                                            toastOptions={
                                                                toastOptions
                                                            }
                                                        />
                                                    );
                                                }}
                                                successColor="#009FD3"
                                                warningColor="orange"
                                                ref={toastRef}
                                                duration={2000}
                                                offsetBottom={SIZE(100)}
                                            />
                                        </Modal>
                                    </>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    )}
                </>
            </View>
            <View
                style={[
                    styles.saveAddressContainer,
                    {position: 'absolute', bottom: SIZE(0)},
                ]}>
                {section.length > 0 && (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack('');
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.nextContainer,
                            {
                                width: SIZE(380),
                                backgroundColor: !state?.userData?.is_service
                                    ? '#009FD3'
                                    : '#003459',
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
                )}
            </View>
            {/* <Modal
                isVisible={calModalVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                swipeDirection={['down']}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                onSwipeComplete={() => {
                    setCalModalVisible(false), setEdited(false);
                }}
                style={[
                    styles.modalContainer,
                    {
                        marginTop:
                            Platform.OS === 'ios'
                                ? StatusBarManager.HEIGHT + SIZES.height * 0.009
                                : StatusBarManager.HEIGHT - SIZE(10),
                    },
                ]}
                onBackdropPress={() => {
                    setCalModalVisible(false), setEdited(false);
                    modalOpen();
                }}
                onBackButtonPress={() => {
                    modalOpen();
                    setEdited(false);
                }}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <>
                    <EcoAddNewAddress
                        handleAddItem={handleAddItem}
                        modalOpen={modalOpen}
                        editedItem={editedItem}
                        handleSaveEdit={handleSaveEdit}
                        edited={edited}
                        setEdited={setEdited}
                        isLoading={isLoading}
                        section={section}
                        toastRef={toastRef}
                        geoAddressText={section?.location}
                        setGeoAddressText={setGeoAddressText}
                        addressText={addressText}
                        setAddressText={setAddressText}
                        exactLocation={{
                            latitude: section?.latitude,
                            longitude: section?.longitude,
                        }}
                        setExactLocation={setExactLocation}
                    />
                </>
                <Toast
                    renderToast={toastOptions => {
                        return <CustomToast toastOptions={toastOptions} />;
                    }}
                    successColor="#009FD3"
                    warningColor="orange"
                    ref={toastRef}
                    duration={2000}
                    offsetBottom={SIZE(100)}
                />
            </Modal> */}
        </View>
    );
};

export default EcoShippingAddress;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {},
    spotlightMain: {
        alignItems: 'center',
        justifyContent: 'center',
        height: SIZES.height - SIZE(100),
    },
    spotlight: {
        width: SIZE(300),
        height: SIZE(300),
        marginBottom: SIZE(32),
    },
    bottom: {},
    mainText: {
        color: '#000',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: SIZE(12),
    },
    subText: {
        color: '#686868',
        fontFamily: FONTS.regular,
        fontSize: SIZE(16),
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: SIZE(24),
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        letterSpacing: SIZE(0.5),
        lineHeight: SIZE(22),
    },
    button: {
        backgroundColor: '#009FD3',
        borderRadius: SIZE(6),
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(10),
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonIndex: {
        borderWidth: 1,
        borderColor: '#003459',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(10),
        borderRadius: SIZE(8),
        alignItems: 'center',
    },
    bottomButtonText: {
        fontFamily: FONTS.semiBold,
        color: '#003459',
        fontSize: SIZE(15),
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
    modalContainer: {
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        flex: 1,
        margin: 0,
    },
});
