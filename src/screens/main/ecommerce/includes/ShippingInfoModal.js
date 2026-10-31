import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SIZE, SIZES} from '../../../../theme/theme';
import {ecommerceApiServiceProvider} from '../../../../../axiosConfig';
import {Context} from '../../../../contexts/Store';
import {FONTS} from '../../../../theme/fonts';
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';
import TickIcon from '../../../../assets/icons/tick-icon.svg';
import moment from 'moment-timezone';
import Modal from 'react-native-modal';
//component
import NormalForm from '../../../../components/forms/NormalForm';
import CalendarPicker from '../../../detail/includes/CalendarPicker';
import Calendar from '../../../includes/calendar/Calendar';
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import TwoButton from './TwoButton';
import DescriptionInput from './DescriptionInput';

const ShippingInfoModal = ({
    close,
    delivery,
    setDelivery,
    pkId,
    setRefreshing,
    setShipLoading,
}) => {
    const {state} = useContext(Context);

    const [remarks, setRemarks] = useState('');
    const [errorMessage, setErrorMessage] = useState({});
    const [deliveryId, setDeliveryId] = useState();
    const [deliveryName, setDeliveryName] = useState('');

    // date
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [isManufactureExpiry, setManufactureExpiry] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateSelected = date => {
        setSelectedDate(date);
    };
    useEffect(() => {
        selectedDate && setErrorMessage('');
    }, [selectedDate]);

    const dispatchOrder = async () => {
        const token = state.userData.accessToken;
        const pk = pkId;
        let expectedDateString = '';
        const convertToGMTISOString = date => {
            return date ? moment.utc(date).format('YYYY-MM-DD') : '';
        };

        if (selectedDate && selectedDate !== '') {
            expectedDateString = convertToGMTISOString(selectedDate);
        }
        const formData = new FormData();
        if (delivery === 'direct_delivery') {
            formData.append('delivery_type', '10');
            formData.append('remarks', remarks);
        } else {
            formData.append('delivery_type', '20');
            formData.append('tracking_id', deliveryId);
            formData.append('delivery_partner', deliveryName);
            formData.append('expected_date', expectedDateString);
        }

        try {
            const response = await ecommerceApiServiceProvider.post(
                `order-dispatch/${pk}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                console.log('Handle success order-dispatch');
            } else {
                console.log('Handle failure order-dispatch');
            }
            setRefreshing(prev => !prev);
            setShipLoading(prev => !prev);
            setRefreshing(true);
            setTimeout(() => {
                setRefreshing(false);
            }, 500);
        } catch (error) {
            console.log('error order-dispatch => ', error.response.data);
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: '#F7F7F7', width: SIZES.width}}>
            <View style={{height: SIZE(60)}}>
                <TouchableOpacity
                    onPress={() => {
                        close(false);
                    }}
                    hitSlop={SIZE(5)}
                    style={{
                        position: 'absolute',
                        top: SIZE(20),
                        right: SIZE(20),
                    }}>
                    <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                </TouchableOpacity>
            </View>
            <ScrollView
                keyboardShouldPersistTaps={'handled'}
                bounces={false}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    <View>
                        <DoubleColorHeading
                            firstTitle={'Add Shipping Details'}
                            isCenter={true}
                        />
                    </View>
                    <View>
                        <DescriptionHeading
                            text={'Please Enter Your Shipping Details'}
                            isCenter={true}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: SIZE(24),
                            }}>
                            <View style={{marginRight: SIZE(8)}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setDelivery('direct_delivery');
                                        setErrorMessage({default_variant: ''});
                                    }}>
                                    <View style={styles.checkboxContainer}>
                                        <View
                                            style={[
                                                styles.checkbox,
                                                delivery ===
                                                    'direct_delivery' &&
                                                    styles.checked,
                                            ]}>
                                            <TickIcon width={10} height={10} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.labelText}>
                                Direct Delivery
                            </Text>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: SIZE(24),
                            }}>
                            <View style={{marginRight: SIZE(8)}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setDelivery('third_party');
                                        setErrorMessage({default_variant: ''});
                                    }}>
                                    <View style={styles.checkboxContainer}>
                                        <View
                                            style={[
                                                styles.checkbox,
                                                delivery === 'third_party' &&
                                                    styles.checked,
                                            ]}>
                                            <TickIcon width={10} height={10} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.labelText}>Third Party</Text>
                        </View>
                    </View>
                    {delivery === 'direct_delivery' ? (
                        <View>
                            <DescriptionInput
                                placeholder={'Remarks'}
                                margitop={10}
                                description={remarks}
                                setDescription={setRemarks}
                                setError={setErrorMessage}
                            />
                            {errorMessage?.remarksText && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.remarksText}
                                </Text>
                            )}
                        </View>
                    ) : (
                        delivery === 'third_party' && (
                            <View>
                                <View>
                                    <NormalForm
                                        label={'Tracking ID'}
                                        placeholder={'Enter Your ID'}
                                        name={deliveryId}
                                        maxlength={50}
                                        type={'numeric'}
                                        setName={setDeliveryId}
                                        setError={setErrorMessage}
                                    />
                                    {errorMessage?.delivery_id && (
                                        <Text style={styles.errorMessage}>
                                            {errorMessage?.delivery_id}
                                        </Text>
                                    )}
                                </View>
                                <View>
                                    <NormalForm
                                        label={'Delivery Partner'}
                                        placeholder={'Enter Partner Name'}
                                        name={deliveryName}
                                        maxlength={35}
                                        setName={setDeliveryName}
                                        setError={setErrorMessage}
                                    />
                                    {errorMessage?.delivery_name && (
                                        <Text style={styles.errorMessage}>
                                            {errorMessage?.delivery_name}
                                        </Text>
                                    )}
                                </View>
                                <View>
                                    <CalendarPicker
                                        ckeckInsurance={true}
                                        setExpiry={setManufactureExpiry}
                                        setCalModalVisible={setCalModalVisible}
                                        errorMessage={errorMessage}
                                        selectedDate={selectedDate}
                                        label={'Expected Delivery Date'}
                                        chooseDate={'Choose'}
                                    />
                                    {errorMessage?.selected_date && (
                                        <Text style={styles.errorMessage}>
                                            {errorMessage?.selected_date}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        )
                    )}

                    <View style={{marginTop: SIZE(40)}}>
                        <TwoButton
                            leftText={'Cancel'}
                            onPressL={() => {
                                console.log('left');
                                close(false);
                            }}
                            rightText={'Submit'}
                            onPressR={() => {
                                if (delivery === 'direct_delivery') {
                                    if (remarks) {
                                        close(false);
                                        dispatchOrder();
                                    } else {
                                        setErrorMessage({
                                            remarksText: remarks
                                                ? ''
                                                : 'Please Enter Remarks',
                                        });
                                    }
                                    console.log('direct_delivery');
                                } else if (delivery === 'third_party') {
                                    if (
                                        deliveryId &&
                                        deliveryName &&
                                        selectedDate
                                    ) {
                                        close(false);
                                        dispatchOrder();
                                    } else {
                                        setErrorMessage({
                                            ...errorMessage,
                                            delivery_id: deliveryId
                                                ? ''
                                                : 'Please Enter Delivery Id',
                                            delivery_name: deliveryName
                                                ? ''
                                                : 'Please Enter Delivery Name',
                                            selected_date: selectedDate
                                                ? ''
                                                : 'Please select date',
                                        });
                                    }
                                }
                            }}
                            buttonLoader={false}
                        />
                    </View>
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
                    onSwipeComplete={() => setCalModalVisible(false)}
                    style={{margin: 0}}
                    onBackdropPress={() => setCalModalVisible(false)}
                    onBackButtonPress={() => setCalModalVisible(false)}
                    propagateSwipe={true}
                    avoidKeyboard={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.barContainer} />
                        <Calendar
                            onDateSelected={handleDateSelected}
                            setCalModalVisible={setCalModalVisible}
                            defaultDate={selectedDate}
                        />
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
};

export default ShippingInfoModal;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: SIZE(32),
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: SIZE(25),
        height: SIZE(25),
        borderWidth: SIZE(1),
        borderColor: '#969696',
        borderRadius: SIZE(5),
        marginRight: SIZE(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checked: {
        backgroundColor: '#2A85FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.medium,
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
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});
