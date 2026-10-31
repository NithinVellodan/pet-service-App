import React, {useState, useContext, useEffect, useRef} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {
    EnterInputName,
    EnterInputPhone,
    AddressLineFirst,
    AddressLineSecond,
    StreetAndEmirates,
} from '../../../Profile-related/includes/address/InputFields';
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';
import {Context} from '../../../../contexts/Store';
import TickIcon from '../../../../assets/icons/tick-icon.svg';
import {TouchableWithoutFeedback} from 'react-native';
import PetBasicDetails from '../../../detail/includes/PetBasicDetails';

const EcoAddNewAddress = ({
    modalOpen,
    handleAddItem,
    editedItem,
    handleSaveEdit,
    edited,
    setEdited,
    setFullName,
    setPhoneNumber,
    setAddressLine1,
    setAddressLine2,
    setStreetName,
    isLoading,
    section,
    toastRef,
}) => {
    const {state, dispatch} = useContext(Context);
    const data = [''];
    const [checkDefault, setCheckDefault] = useState(
        section[0]?.id === editedItem.id,
    );
    const [emirates, setEmirates] = useState(
        edited ? editedItem?.emirate_display : '',
    );
    const [emiratesValue, setEmiratesValue] = useState(
        edited ? editedItem?.emirate : '',
    );
    const [street, setStreet] = useState(edited ? editedItem?.street : '');
    const [nameAs, setNameAs] = useState(edited ? editedItem?.full_name : '');
    const [phonEnter, setPhonEnter] = useState(edited ? editedItem?.phone : '');
    const [firstAddress, setFirstAddress] = useState(
        edited ? editedItem?.address_1 : '',
    );
    const [secondAddress, setSecondAddress] = useState(
        edited ? editedItem?.address_2 : '',
    );
    // is Location
    const [geoAddressText, setGeoAddressText] = useState(
        edited ? editedItem.location : '',
    );
    const [addressText, setAddressText] = useState();
    const [exactLocation, setExactLocation] = useState({
        latitude: edited ? editedItem.latitude : '',
        longitude: edited ? editedItem.longitude : '',
    });

    const finalLocation = geoAddressText ? geoAddressText : addressText;

    const [errorMessage, setErrorMessage] = useState({
        phone_number_is: false,
        name_is: false,
        first_address_is: false,
        second_address_is: false,
        emirates_is: false,
        street_is: false,
    });

    const [phoneValid, setPhoneValid] = useState(false);
    const [visible, setVisible] = useState(false);
    const flatListRef = useRef(null);

    useEffect(() => {
        if (visible && flatListRef.current) {
            flatListRef.current.scrollToOffset({animated: true, offset: 9999});
        }
    }, [visible]);

    useEffect(() => {
        const phoneRegex = /^\d{7,}$/;
        setPhoneValid(phoneRegex.test(phonEnter));
    }, [phonEnter]);

    const HandleChoose = item => {
        setErrorMessage(prevState => ({
            ...prevState,
            name_is: !nameAs ? true : false,
            location_is: !finalLocation ? true : false,
            phone_number_is: !phonEnter ? true : false,
            first_address_is: !firstAddress ? true : false,
            second_address_is: !secondAddress ? true : false,
            street_is: !street ? true : false,
            emirates_is: !emirates ? true : false,
            phone_number_valid: !phoneValid ? true : false,
        }));

        if (
            !nameAs ||
            !finalLocation ||
            !phonEnter ||
            !firstAddress ||
            !secondAddress | !street ||
            !emirates ||
            !phoneValid
        ) {
        } else {
            handleSave();
            setErrorMessage({});
        }
    };

    const handleSave = () => {
        if (edited) {
            handleSaveEdit({
                name: nameAs,
                location: finalLocation,
                exactLocation: exactLocation,
                address: firstAddress,
                phone: phonEnter,
                addressLine2: secondAddress,
                street: street,
                emirates: emirates,
                emiratesValue: emiratesValue,
                id: editedItem.id,
                is_default: checkDefault,
            });
        } else {
            handleAddItem({
                name: nameAs,
                location: finalLocation,
                exactLocation: exactLocation,
                address: firstAddress,
                phone: phonEnter,
                addressLine2: secondAddress,
                street: street,
                emirates: emirates,
                emiratesValue: emiratesValue,
                is_default: checkDefault,
            });
        }
        modalOpen();
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setVisible(false);
            }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#F7F7F7',
                    borderTopRightRadius: SIZE(32),
                    borderTopLeftRadius: SIZE(32),
                }}>
                <TouchableOpacity
                    onPress={() => {
                        setEdited(false);
                        modalOpen();
                    }}
                    activeOpacity={0.8}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        paddingTop: SIZE(20),
                        paddingHorizontal: SIZE(16),
                    }}>
                    <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                </TouchableOpacity>
                <FlatList
                    bounces={false}
                    ref={flatListRef}
                    keyboardShouldPersistTaps={'handled'}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    style={{
                        backgroundColor: '#F7F7F7',
                        borderTopRightRadius: SIZE(32),
                        borderTopLeftRadius: SIZE(32),
                    }}
                    renderItem={({item}) => (
                        <View
                            style={{
                                backgroundColor: '#F7F7F7',
                                paddingHorizontal: SIZE(24),
                                paddingTop: SIZE(50),
                                borderTopRightRadius: SIZE(32),
                                borderTopLeftRadius: SIZE(32),
                            }}>
                            <View>
                                <DoubleColorHeading
                                    firstTitle={edited ? 'Edit ' : 'Add'}
                                    secondTitle={
                                        edited ? 'Address' : 'New Address'
                                    }
                                    isCenter={true}
                                />
                                <DescriptionHeading
                                    text={'Enter your address details'}
                                />
                            </View>
                            <View>
                                <EnterInputName
                                    setFullName={setFullName}
                                    nameAs={nameAs}
                                    setNameAs={setNameAs}
                                    errorMessage={errorMessage}
                                />
                                <View>
                                    <PetBasicDetails
                                        setGeoAddressText={setGeoAddressText}
                                        geoAddressText={geoAddressText}
                                        setAddressText={setAddressText}
                                        addressText={addressText}
                                        setExactLocation={setExactLocation}
                                        exactLocation={exactLocation}
                                        errorMessage={errorMessage}
                                        finalLocation={finalLocation}
                                        picklocation={true}
                                        toastRef={toastRef}
                                    />
                                </View>
                                <EnterInputPhone
                                    setPhoneNumber={setPhoneNumber}
                                    phonEnter={phonEnter}
                                    setPhonEnter={setPhonEnter}
                                    errorMessage={errorMessage}
                                    setVisible={setVisible}
                                />
                                <AddressLineFirst
                                    setAddressLine1={setAddressLine1}
                                    firstAddress={firstAddress}
                                    setFirstAddress={setFirstAddress}
                                    errorMessage={errorMessage}
                                    setVisible={setVisible}
                                />
                                <AddressLineSecond
                                    setAddressLine2={setAddressLine2}
                                    secondAddress={secondAddress}
                                    setSecondAddress={setSecondAddress}
                                    errorMessage={errorMessage}
                                    setVisible={setVisible}
                                />
                                <StreetAndEmirates
                                    setStreetName={setStreetName}
                                    setEmiratesValue={setEmiratesValue}
                                    street={street}
                                    setStreet={setStreet}
                                    emirates={emirates}
                                    setEmirates={setEmirates}
                                    errorMessage={errorMessage}
                                    setVisible={setVisible}
                                    visible={visible}
                                />
                                {edited ? (
                                    <></>
                                ) : (
                                    <View style={styles.defaultTextContainer}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setCheckDefault(!checkDefault);
                                            }}
                                            activeOpacity={0.8}>
                                            <View
                                                style={
                                                    styles.checkboxContainer
                                                }>
                                                <View
                                                    style={[
                                                        styles.checkbox,
                                                        {
                                                            backgroundColor:
                                                                checkDefault
                                                                    ? '#009FD3'
                                                                    : '#fff',
                                                        },
                                                        {
                                                            borderColor:
                                                                checkDefault
                                                                    ? '#009FD3'
                                                                    : '#969696',
                                                        },
                                                    ]}>
                                                    <TickIcon
                                                        width={10}
                                                        height={10}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={styles.defaultText}>
                                            Set as Default Address
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}
                />
                {edited ? (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                modalOpen();
                                setEdited(false);
                            }}
                            style={styles.skipContainer}>
                            <Text
                                allowFontScaling={false}
                                style={styles.skipText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                HandleChoose();
                                setVisible(false);
                            }}
                            style={[
                                styles.nextContainer,
                                {
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
                                    Save
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View
                        style={[
                            styles.buttonsContainer,
                            {
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        ]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                HandleChoose();
                                setVisible(false);
                            }}
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
                                    Save Address
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        paddingHorizontal: SIZE(32),
        paddingTop: SIZE(32),
        flex: 1,
    },
    labelText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.medium,
        marginBottom: SIZE(10),
    },
    labelTextGender: {},
    inputBoxSub: {
        marginTop: SIZE(24),
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F7F7F7',
        paddingBottom: SIZE(20),
        paddingHorizontal: SIZE(22),
    },
    skipContainer: {
        backgroundColor: '#fff',
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        width: SIZE(174),
    },
    skipText: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
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
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#003459',
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checked: {
        backgroundColor: '#003459',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(40),
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
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
        position: 'absolute',
        top: SIZE(-5),
        right: SIZE(-5),
    },
    defaultText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.semiBold,
        marginVertical: SIZE(14),
        opacity: 0.7,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: SIZE(20),
        height: SIZE(20),
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(5),
        marginRight: SIZE(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default EcoAddNewAddress;
