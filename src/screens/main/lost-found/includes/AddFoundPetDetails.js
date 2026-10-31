import React, {useState, useRef, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {format} from 'date-fns';

// theme
import {FONTS} from '../../../../theme/fonts';
import {SIZE, SIZES} from '../../../../theme/theme';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import NormalForm from '../../../../components/forms/NormalForm';
import {EnterDescription} from './LostPetType';
import PetBasicDetails from '../../../detail/includes/PetBasicDetails';
import {CalendarPickerThree} from '../../../detail/includes/CalendarPicker';
import CalendarBirthDate from '../../../includes/calendar/CalenderBirthDate';
import {usersConfigGeneral} from '../../../../../axiosConfig';
import {Context} from '../../../../contexts/Store';
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';

const AddFoundPetDetails = ({setModalVisible, petId, toastRef}) => {
    const {state, dispatch} = useContext(Context);

    const data = [''];

    const [description, setDescription] = useState();
    const [phone, setPhone] = useState();
    const [birthCalModalVisible, setBirthCalModalVisible] = useState(false);
    const [selectedDateThree, setSelectedDateThree] = useState(false);
    const [isExpiry, setExpiry] = useState(false);
    const [geoAddressTextStore, setGeoAddressTextStore] = useState();
    const [addressTextStore, setAddressTextStore] = useState();

    const [exactLocationStore, setExactLocationStore] = useState({
        latitude: '',
        longitude: '',
    });
    const finalLocationStore = geoAddressTextStore
        ? geoAddressTextStore
        : addressTextStore;

    const [errorMessage, setErrorMessage] = useState({
        description_is: false,
        location_is: false,
        phone_number: false,
        calender_is: false,
    });

    const handleDateThreeSelected = date => {
        setSelectedDateThree(date);
    };

    const HandleChoose = () => {
        setErrorMessage(prevState => {
            const updatedErrorMessage = {
                ...prevState,
                description_is: !description,
                phone_number: !phone,
                location_is: !finalLocationStore,
                calender_is: !selectedDateThree,
            };

            const hasAnyTrue = Object.values(updatedErrorMessage).some(
                value => value === true,
            );

            const allAreFalse = Object.values(updatedErrorMessage).every(
                value => value === false,
            );

            if (hasAnyTrue) {
                console.log('Need to fix');
            } else if (allAreFalse) {
                addPLostPetDetails();
            }

            return updatedErrorMessage;
        });
    };

    const addPLostPetDetails = async () => {
        const token = state.userData.accessToken;
        const selectedDate = new Date(selectedDateThree);
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');

        const formData = new FormData();
        formData.append('remarks', description);
        formData.append('phone', phone);
        formData.append('location', finalLocationStore);
        formData.append('found_at', formattedDate);
        formData.append('longitude', exactLocationStore.longitude);
        formData.append('latitude', exactLocationStore.latitude);

        try {
            const response = await usersConfigGeneral.post(
                `found-pet/${petId}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            let {StatusCode, message} = response.data;

            if (StatusCode === 6000) {
                toastRef.current.show(message, {
                    type: 'success',
                });
                setTimeout(() => {
                    setModalVisible(false);
                }, 500);
            }
            console.log(response.data, 'toastRef____toastReftoastRef');
        } catch (error) {
            console.log('error try => ', error.response.data);
        }
    };

    return (
        <>
            <TouchableOpacity
                // disabled={submitLoading}
                activeOpacity={0.8}
                hitSlop={10}
                style={styles.buttonIcon}
                onPress={() => {
                    setModalVisible(false);
                }}>
                <CloseIcon width={'100%'} height={'100%'} />
            </TouchableOpacity>
            <FlatList
                bounces={false}
                contentContainerStyle={{
                    backgroundColor: 'transparent',
                    borderTopLeftRadius: SIZE(32),
                    borderTopRightRadius: SIZE(32),
                    width: SIZES.width,
                    paddingHorizontal: SIZE(16),
                }}
                keyboardShouldPersistTaps={'handled'}
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <KeyboardAwareScrollView
                        scrollEnabled={true}
                        keyboardShouldPersistTaps={'handled'}
                        bounces={false}
                        style={{
                            backgroundColor: 'transparent',
                            borderTopLeftRadius: SIZE(32),
                            borderTopRightRadius: SIZE(32),
                        }}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.contentContainer}>
                            <View>
                                <DoubleColorHeading
                                    firstTitle={'Add '}
                                    secondTitle={'Pet Details'}
                                    isCenter={true}
                                />
                                <DescriptionHeading
                                    text={'Please Enter Found Pet Details'}
                                />
                            </View>
                            <View>
                                <PetBasicDetails
                                    setGeoAddressText={setGeoAddressTextStore}
                                    geoAddressText={geoAddressTextStore}
                                    setAddressText={setAddressTextStore}
                                    addressText={addressTextStore}
                                    setExactLocation={setExactLocationStore}
                                    exactLocation={exactLocationStore}
                                    errorMessage={errorMessage}
                                    finalLocation={finalLocationStore}
                                    toastRef={toastRef}
                                    picklocation={true}
                                />
                            </View>
                            <NormalForm
                                label={'Phone Number'}
                                type={'phone'}
                                placeholder={'Enter Your Phone Number'}
                                setvalue={setPhone}
                                dataValue={phone}
                                setError={setErrorMessage}
                                marginTop={10}
                            />
                            {errorMessage.phone_number == true && (
                                <Text style={styles.errorMessage}>
                                    Please enter the phone number.
                                </Text>
                            )}

                            <EnterDescription
                                header="Remarks"
                                description={description}
                                setDescription={setDescription}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                            />
                            {errorMessage.description_is == true && (
                                <Text style={styles.errorMessage}>
                                    Kindly include a description.
                                </Text>
                            )}
                            <View style={{marginTop: SIZE(25)}}>
                                <CalendarPickerThree
                                    calender="FindDate"
                                    selectedDateThree={selectedDateThree}
                                    setCalModalVisible={setBirthCalModalVisible}
                                    errorMessage={errorMessage}
                                    setErrorMessage={setErrorMessage}
                                    setSelectedDateThree={setSelectedDateThree}
                                    setExpiry={setExpiry}
                                />
                            </View>

                            {errorMessage.calender_is == true && (
                                <Text style={styles.errorMessage}>
                                    Please enter the lost date.
                                </Text>
                            )}
                        </View>
                    </KeyboardAwareScrollView>
                )}
            />
            <View style={[styles.buttonsContainer]}>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(false);
                    }}
                    activeOpacity={0.8}
                    style={styles.skipContainer}>
                    <Text allowFontScaling={false} style={styles.skipText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        HandleChoose();
                    }}
                    style={styles.nextContainer}>
                    <Text allowFontScaling={false} style={styles.nextText}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal
                isVisible={birthCalModalVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                swipeDirection={['down']}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                onSwipeComplete={() => setBirthCalModalVisible(false)}
                style={{margin: 0}}
                onBackdropPress={() => setBirthCalModalVisible(false)}
                onBackButtonPress={() => setBirthCalModalVisible(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.barContainer} />
                    <CalendarBirthDate
                        onDateSelected={handleDateThreeSelected}
                        setCalModalVisible={setBirthCalModalVisible}
                        defaultDate={selectedDateThree}
                    />
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: 'transparent',
        paddingHorizontal: SIZE(10),
        paddingTop: SIZE(50),
        flex: 1,
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
    },
    container: {
        backgroundColor: 'green',
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
        paddingVertical: SIZE(20),
        paddingHorizontal: SIZE(25),
    },
    skipContainer: {
        backgroundColor: '#f7f7f7',
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
        marginBottom: SIZE(10),
    },
    checkbox: {
        width: SIZE(20),
        height: SIZE(20),
        borderWidth: SIZE(1),
        borderColor: '#969696',
        borderRadius: SIZE(5),
        marginRight: SIZE(10),
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
    },
});

export default AddFoundPetDetails;
