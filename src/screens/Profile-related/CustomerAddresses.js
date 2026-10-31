import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    NativeModules,
    Platform,
} from 'react-native';
import React, {useState, useContext} from 'react';

//packages
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';
import {CustomerAddressList, CustomerListCard} from '../main/ApiSection';
import {usersConfigCustomer} from '../../../axiosConfig';
//components
import AddressComponent from './includes/AddressComponent';
import AddNewAddress from './AddNewAddress';
//images and logos
import SpotLightLogo from '../../assets/icons/empty-page/Address-null.svg';
import ArrowRight from '../../assets/icons/profile-icons/arrow-right.svg';
import BackIcon from '../../assets/icons/profile-icons/arrow-left.svg';
import AddTo from '../../assets/icons/profile-icons/add-to.svg';
import {useToast} from 'react-native-toast-notifications';

const CustomerAddresses = ({route}) => {
    const {state} = useContext(Context);
    const navigation = useNavigation();
    const toast = useToast();
    const {StatusBarManager} = NativeModules;

    const [calModalVisible, setCalModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [edited, setEdited] = useState(false);
    const [pk, setPk] = useState(null);
    const [section, setSection] = useState([]);
    const [selected, setSelected] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [selectedAddressPk, setSelectedAddressPk] = useState('');

    //modalOpen function
    const modalOpen = item => {
        setCalModalVisible(!calModalVisible);
    };

    CustomerAddressList(
        setSection,
        section,
        refreshing,
        setIsLoading,
        setSelectedAddressPk,
    );

    //addNewAddress function
    const addNewAddress = async newSection => {
        setSubmitLoading(true);
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

        try {
            await usersConfigCustomer
                .post('create-address/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    setSubmitLoading(false);
                    modalOpen();
                    setRefreshing(false);
                    toast.show(response.data.message, {
                        type: 'success',
                    });
                })
                .catch(error => {
                    setSubmitLoading(false);
                    setRefreshing(false);
                    console.log('error try => ', error);
                });
        } catch (error) {
            setSubmitLoading(false);
            console.log('error => ', error);
        }
    };

    //editAddress function
    const editAddress = async editedItem => {
        setSubmitLoading(true);
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
        try {
            await usersConfigCustomer
                .put(`update-address/${pk}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    setSubmitLoading(false);
                    modalOpen();
                    setRefreshing(false);
                    toast.show(response.data.message, {
                        type: 'success',
                    });
                })
                .catch(error => {
                    setSubmitLoading(false);
                    setRefreshing(false);
                    console.log('error try => ', error.response.data);
                });
        } catch (error) {
            setSubmitLoading(false);
            console.log('error => ', error);
        }
    };

    //setDefaultAddress function
    const setDefaultAddress = async pk => {
        setRefreshing(true);
        const token = state.userData.accessToken;

        try {
            await usersConfigCustomer
                .post(
                    `set-default-address/${pk}/`,
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
        setSubmitLoading(true);
        setRefreshing(true);
        const token = state.userData.accessToken;
        try {
            await usersConfigCustomer
                .delete(`delete-address/${pk}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setRefreshing(false);
                    setSubmitLoading(false);
                    setPk('');
                    toast.show('Address Removed', {
                        type: 'success',
                    });
                })
                .catch(error => {
                    setSubmitLoading(false);
                    setRefreshing(false);
                    console.log('error try => ', error);
                    setPk('');
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    //handleRemoveItem function
    const handleRemoveItem = index => {
        setPk(section[index].id);
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

    //handleDefaultItem function
    const handleDefaultItem = index => {
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

    return (
        <>
            <View
                style={{
                    backgroundColor: '#F7F7F7',
                    width: '100%',
                    flex: 1,
                }}>
                <View style={styles.headercontainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={styles.backButton}>
                        <BackIcon />
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        <Text style={styles.pageHeading}>My Addresses</Text>
                    </View>
                </View>
                {isLoading ? (
                    <ActivityIndicator
                        style={{
                            marginTop: SIZE(250),
                        }}
                        size={'large'}
                        color={'#009fd3'}
                    />
                ) : (
                    <React.Fragment>
                        {section.length === 0 ? (
                            <View style={styles.spotlightMain}>
                                <View style={styles.spotlight}>
                                    <SpotLightLogo
                                        width={'100%'}
                                        height={'100%'}
                                    />
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
                                    marginBottom:
                                        route?.params?.from === 'ProductDetail'
                                            ? SIZE(90)
                                            : 0,
                                }}>
                                <View style={{paddingBottom: SIZE(20)}}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            modalOpen();
                                        }}
                                        activeOpacity={0.8}
                                        style={[styles.buttonIndex]}>
                                        <AddTo
                                            width={SIZE(20)}
                                            height={SIZE(20)}
                                        />
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
                                        <AddressComponent
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
                                    )}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                />
                            </View>
                        )}
                    </React.Fragment>
                )}
                {route?.params?.from === 'ProductDetail' ? (
                    <View
                        style={[
                            styles.saveAddressContainer,
                            {position: 'absolute', bottom: SIZE(20)},
                        ]}>
                        {section.length > 0 && (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('OrderSummary', {
                                        section,
                                        donate: 'donate_customer',
                                    })
                                }
                                activeOpacity={0.8}
                                style={[
                                    styles.nextContainer,
                                    {
                                        width: SIZE(380),
                                        backgroundColor: !state?.userData
                                            ?.is_service
                                            ? '#009FD3'
                                            : '#003459',
                                    },
                                ]}>
                                {isLoading ? (
                                    <ActivityIndicator
                                        size={'small'}
                                        color={'#fff'}
                                    />
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
                ) : null}
            </View>
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
                    <AddNewAddress
                        handleAddItem={handleAddItem}
                        modalOpen={modalOpen}
                        editedItem={editedItem}
                        handleSaveEdit={handleSaveEdit}
                        edited={edited}
                        setEdited={setEdited}
                        isLoading={isLoading}
                        // setCheckDefault={setCheckDefault}
                        // checkDefault={checkDefault}
                        section={section}
                        submitLoading={submitLoading}
                    />
                </>
            </Modal>
        </>
    );
};
const styles = StyleSheet.create({
    modalSubContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: SIZE(12),
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
    headercontainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#0000001A',
        alignItems: 'center',
        marginBottom: SIZE(30),
    },
    backButton: {
        width: SIZE(40),
        height: SIZE(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 100,
        backgroundColor: '#fff',
        marginRight: SIZE(20),
    },
    pageHeading: {
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        color: '#00171F',
    },
    modalContainer: {
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        flex: 1,
        margin: 0,
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
    spotlightMain: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
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
    button: {
        backgroundColor: '#009FD3',
        borderRadius: SIZE(6),
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(10),
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        letterSpacing: SIZE(0.5),
        lineHeight: SIZE(22),
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        letterSpacing: SIZE(0.5),
        lineHeight: SIZE(22),
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F7F7F7',
        paddingBottom: SIZE(20),
        paddingHorizontal: SIZE(22),
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

export default CustomerAddresses;
