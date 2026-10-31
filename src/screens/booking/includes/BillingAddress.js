import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    NativeModules,
} from 'react-native';
import React, {useContext, useState} from 'react';

//packages
import {useToast} from 'react-native-toast-notifications';
import Modal from 'react-native-modal';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {CustomerAddressList} from '../../main/ApiSection';
import {Context} from '../../../contexts/Store';
import {usersConfigCustomer} from '../../../../axiosConfig';

//components
import AddNewAddress from '../../Profile-related/AddNewAddress';
import RemoveCardModal from '../../Profile-related/includes/RemoveCardModal';

//images and logos
import BottomArrow from '../../../assets/icons/booking-details/bottom-arrow';
import TopArrow from '../../../assets/icons/booking-details/arrow-top';
import EditOption from '../../../assets/icons/booking-details/edit-2.svg';
import RemoveOption from '../../../assets/icons/booking-details/trash.svg';

const BillingAddress = ({setSelectedAddressPk, selectedAddressPk}) => {
    const {state, dispatch} = useContext(Context);
    const {StatusBarManager} = NativeModules;
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [edited, setEdited] = useState(false);
    const [pk, setPk] = useState(null);
    const [section, setSection] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const toast = useToast();

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
                    setRefreshing(false);
                    modalOpen();
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
            console.log('error => ', error);
        }
    };

    //editAddress function
    const editAddress = async editedItem => {
        setSubmitLoading(true);
        setRefreshing(true);
        const pk = editedItem.id;
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
                    setRefreshing(false);
                    modalOpen();
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
            await usersConfigCustomer
                .delete(`delete-address/${pk}/`, {
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
        <View
            style={{
                borderWidth: SIZE(1),
                borderColor: '#E2E2E2',
                padding: SIZE(13),
                borderRadius: SIZE(8),
                backgroundColor: '#FFFFFF',
                marginBottom: SIZE(20),
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => [setIsVisible(!isVisible)]}
                style={[
                    styles.topBox,
                    {
                        borderBottomWidth: isVisible ? 1 : 0,
                        paddingBottom: !isVisible ? 0 : SIZE(15),
                        marginBottom: !isVisible ? 0 : SIZE(20),
                    },
                ]}>
                <Text style={styles.subContent1}>Billing Address</Text>
                <View>{isVisible ? <TopArrow /> : <BottomArrow />}</View>
            </TouchableOpacity>
            {isVisible && (
                <View>
                    {section.map((item, index) => (
                        <View key={index}>
                            <View
                                style={{
                                    marginBottom:
                                        index === section.length - 1 ? 0 : 20,
                                }}>
                                <View style={styles.contentBox}>
                                    <View style={styles.topConection}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                setSelectedAddressPk(item.id);
                                            }}
                                            style={[
                                                styles.selectButton,

                                                {
                                                    borderColor:
                                                        selectedAddressPk ===
                                                        item.id
                                                            ? '#009FD3'
                                                            : '#969696',
                                                },
                                            ]}>
                                            <View
                                                style={[
                                                    styles.selection,
                                                    {
                                                        backgroundColor:
                                                            selectedAddressPk ===
                                                            item.id
                                                                ? '#009FD3'
                                                                : '#969696',
                                                    },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.name}>
                                            {item.full_name}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                modalOpen(item);
                                                handleEditItem(index);
                                            }}
                                            activeOpacity={0.8}>
                                            <EditOption
                                                width={SIZE(16)}
                                                height={SIZE(16)}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleRemoveItem(index);
                                                setRemoveModal(true);
                                            }}
                                            activeOpacity={0.8}
                                            style={{marginLeft: SIZE(12)}}>
                                            <RemoveOption
                                                width={SIZE(16)}
                                                height={SIZE(16)}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{paddingLeft: SIZE(30)}}>
                                    <Text style={styles.subContent}>
                                        {item.address_1}, {item.address_2},{' '}
                                        {item.street}, {item.emirate_display}
                                    </Text>
                                    <Text style={styles.phone}>
                                        {item.phone}
                                    </Text>
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
                                onBackdropPress={() => setRemoveModal(false)}
                                propagateSwipe={true}
                                avoidKeyboard={true}>
                                <RemoveCardModal
                                    fromAddress={true}
                                    removeCard={() =>
                                        removeAddress(section[index]?.id)
                                    }
                                    setRemoveModal={setRemoveModal}
                                    state={state}
                                    id={pk}
                                    section={section}
                                />
                            </Modal>
                        </View>
                    ))}
                    <TouchableOpacity
                        onPress={() => {
                            modalOpen();
                        }}
                        activeOpacity={0.8}
                        style={{
                            borderWidth: 1,
                            paddingVertical: SIZE(10),
                            borderRadius: SIZE(6),
                            marginTop: SIZE(30),
                            borderColor: '#003459',
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#003459',
                                fontSize: SIZE(14),
                                fontFamily: FONTS.bold,
                                fontWeight: '600',
                            }}>
                            + Add New Address
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
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
                        section={section}
                        submitLoading={submitLoading}
                    />
                </>
            </Modal>
        </View>
    );
};

export default BillingAddress;

const styles = StyleSheet.create({
    subContent: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        marginTop: SIZE(10),
        marginBottom: SIZE(6),
    },
    subContent1: {
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
    },
    phone: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
        fontWeight: '500',
    },
    name: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        marginLeft: SIZE(10),
    },

    topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBlockColor: '#E2E2E2',
        paddingBottom: SIZE(15),
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
    topConection: {flexDirection: 'row', alignItems: 'center'},
    contentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalContainer: {
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        flex: 1,
        margin: 0,
    },
});
