import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {SIZE} from '../../../../theme/theme';
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import NormalForm from '../../../../components/forms/NormalForm';
import DropDown from '../includes/DropDown';
import PickImage from '../includes/PickImage';
import Modal from 'react-native-modal';

import Calendar from '../../../includes/calendar/Calendar';
import Count from '../includes/Count';
import {FONTS} from '../../../../theme/fonts';
import TwoButton from '../includes/TwoButton';
import TickIcon from '../../../../assets/icons/tick-icon.svg';
import CalendarPicker from '../../../detail/includes/CalendarPicker';
import CloseRound from '../../../../assets/icons/close-circle.svg';

const AddDonateVariant = ({close}) => {
    const category = [
        {id: 1, name: 'category 1'},
        {id: 2, name: 'category 2'},
        {id: 3, name: 'category 3'},
    ];
    const [variantName, setVariantName] = useState('');
    const [count, setCount] = useState(1);
    const [productSize, setProductSize] = useState('');
    const [flavorValue, setFlavorValue] = useState('');
    const [flavorImage, setFlavorImage] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);
    const [calManufactureModalVisible, setCalManufactureModalVisible] =
        useState(false);
    const [calExpiryDateModalVisible, setCalExpiryDateModalVisible] =
        useState(false);
    const [isManufactureExpiry, setManufactureExpiry] = useState(true);
    const [isExpiryDate, setExpiryDate] = useState(true);
    const [checkDefaultVariant, setcheckDefaultVariant] = useState(false);
    // second date
    const [selectedDateExpiry, setSelectedDateExpiry] = useState(null);
    const [errorMessage, setErrorMessage] = useState({});
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [categoryShow, setCategoryShow] = useState(false);

    useEffect(() => {
        selectedDate && setErrorMessage(''),
            selectedDateExpiry && setErrorMessage('');
    }, [selectedDate, selectedDateExpiry]);
    const handleDateSelected = date => {
        setSelectedDate(date);
    };
    const handleDateExpirySelected = date => {
        setSelectedDateExpiry(date);
    };
    const handlePressOutside = () => {
        if (categoryVisible || categoryShow) {
            setCategoryVisible(false);
            setCategoryShow(false);
        }
    };
    const removeImageNew = pathToRemove => {
        setFlavorImage(prevflavorImage =>
            prevflavorImage.filter(image => image.path !== pathToRemove),
        );
    };
    return (
        <>
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <View style={styles.mainContainer}>
                    <View>
                        <DoubleColorHeading
                            firstTitle={'Add Donate'}
                            secondTitle={'Product Variant'}
                            isCenter={true}
                        />
                    </View>
                    <View>
                        <DescriptionHeading
                            text={'Please Enter Your Donate Variant Details'}
                            isCenter={true}
                        />
                    </View>
                    <View>
                        <NormalForm
                            label={'Variant Name'}
                            placeholder={'Enter Your Product Name'}
                            name={variantName}
                            setName={setVariantName}
                            setError={setErrorMessage}
                        />
                        {errorMessage?.variant_name && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.variant_name}
                            </Text>
                        )}
                    </View>
                    <View>
                        <DropDown
                            label={'Add Product Size'}
                            choose={'Select Your Product Size'}
                            data={category}
                            setCategoryValue={setProductSize}
                            categoryValue={productSize}
                            setError={setErrorMessage}
                            categoryVisible={categoryVisible}
                            setCategoryVisible={setCategoryVisible}
                        />
                        {errorMessage?.variant_size && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.variant_size}
                            </Text>
                        )}
                    </View>
                    <View>
                        <DropDown
                            label={'Add Flavor'}
                            choose={'Select Your Flavor '}
                            data={category}
                            setCategoryValue={setFlavorValue}
                            categoryValue={flavorValue}
                            setError={setErrorMessage}
                            categoryVisible={categoryShow}
                            setCategoryVisible={setCategoryShow}
                        />
                        {errorMessage?.flavor_value && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.flavor_value}
                            </Text>
                        )}
                    </View>
                    {flavorImage && (
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                padding: SIZE(10),
                                marginTop: SIZE(12),
                            }}>
                            {flavorImage.map((image, index) => (
                                <View
                                    key={index}
                                    style={{
                                        marginRight: SIZE(10),
                                        marginBottom: SIZE(8),
                                        borderStyle: 'dashed',
                                        borderWidth: 1,
                                        borderRadius: SIZE(8),
                                        borderColor: '#003459',
                                    }}>
                                    <Image
                                        style={{
                                            width: SIZE(70),
                                            height: SIZE(70),
                                            borderRadius: SIZE(8),
                                        }}
                                        source={{uri: image.path}}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={{
                                            position: 'absolute',
                                            top: SIZE(-5),
                                            right: SIZE(-5),
                                            backgroundColor: '#eee',
                                            borderRadius: SIZE(30),
                                        }}
                                        onPress={() =>
                                            removeImageNew(image.path)
                                        }>
                                        <CloseRound
                                            height={SIZE(22)}
                                            width={SIZE(22)}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                    <View>
                        <PickImage
                            setImages={setFlavorImage}
                            setError={setErrorMessage}
                            images={flavorImage}
                        />
                        {errorMessage?.image && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.image}
                            </Text>
                        )}
                    </View>
                    <View>
                        <CalendarPicker
                            ckeckInsurance={true}
                            setExpiry={setManufactureExpiry}
                            setCalModalVisible={setCalManufactureModalVisible}
                            setSecondCalModalVisible={
                                setCalExpiryDateModalVisible
                            }
                            errorMessage={errorMessage}
                            selectedDate={selectedDate}
                            label={'Manufacturing Date'}
                            chooseDate={'Enter Manufacturing Date'}
                        />
                        {errorMessage?.selected_date_variant && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.selected_date_variant}
                            </Text>
                        )}
                    </View>
                    <View>
                        <CalendarPicker
                            ckeckInsurance={true}
                            setExpiry={setExpiryDate}
                            setCalModalVisible={setCalExpiryDateModalVisible}
                            setSecondCalModalVisible={
                                setCalManufactureModalVisible
                            }
                            errorMessage={errorMessage}
                            selectedDate={selectedDateExpiry}
                            label={'Add Expiry Date'}
                            chooseDate={'Enter Expiry Date'}
                        />
                        {errorMessage?.selected_date_expiry_variant && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.selected_date_expiry_variant}
                            </Text>
                        )}
                    </View>
                    <View style={styles.counterContainer}>
                        <Text style={styles.labelText}>Initial Stock</Text>
                        <Count count={count} setCount={setCount} />
                    </View>
                    <View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <View style={{marginRight: SIZE(8)}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setcheckDefaultVariant(
                                            !checkDefaultVariant,
                                        );
                                        setErrorMessage({default_variant: ''});
                                    }}>
                                    <View style={styles.checkboxContainer}>
                                        <View
                                            style={[
                                                styles.checkbox,
                                                checkDefaultVariant &&
                                                    styles.checked,
                                            ]}>
                                            <TickIcon width={10} height={10} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.labelText}>
                                Default Variant
                            </Text>
                        </View>
                        {errorMessage?.default_variant && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.default_variant}
                            </Text>
                        )}
                    </View>
                    <View style={{marginTop: SIZE(40)}}>
                        <TwoButton
                            leftText={'Cancel'}
                            onPressL={() => {
                                console.log('left');
                                close(false);
                            }}
                            rightText={'Submit'}
                            onPressR={() => {
                                if (
                                    variantName &&
                                    productSize &&
                                    flavorValue &&
                                    flavorImage.length > 0 &&
                                    selectedDate &&
                                    selectedDateExpiry &&
                                    checkDefaultVariant
                                ) {
                                    console.log('submitted variant');
                                    close(false);
                                } else {
                                    setErrorMessage({
                                        ...errorMessage,
                                        variant_name: variantName
                                            ? ''
                                            : 'Variant name is required',
                                        variant_size: productSize
                                            ? ''
                                            : 'Select product Size',
                                        flavor_value: flavorValue
                                            ? ''
                                            : 'Please select your flavor ',
                                        image:
                                            flavorImage.length > 0
                                                ? ''
                                                : 'Please add image',
                                        selected_date_variant: selectedDate
                                            ? ''
                                            : 'Please select date',
                                        selected_date_expiry_variant:
                                            selectedDateExpiry
                                                ? ''
                                                : 'Please select date',
                                        default_variant: checkDefaultVariant
                                            ? ''
                                            : 'Please check default variant',
                                    });
                                }
                                console.log('right');
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <Modal
                isVisible={
                    calExpiryDateModalVisible || calManufactureModalVisible
                }
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                swipeDirection={['down']}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                onSwipeComplete={() => {
                    setCalExpiryDateModalVisible(false);
                    setCalManufactureModalVisible(false);
                }}
                style={{margin: 0}}
                onBackdropPress={() => {
                    setCalExpiryDateModalVisible(false);
                    setCalManufactureModalVisible(false);
                }}
                onBackButtonPress={() => {
                    setCalExpiryDateModalVisible(false);
                    setCalManufactureModalVisible(false);
                }}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.barContainer}></View>
                    <Calendar
                        singleDateMode={true}
                        onDateSelected={
                            calExpiryDateModalVisible
                                ? handleDateExpirySelected
                                : calManufactureModalVisible
                                ? handleDateSelected
                                : null
                        }
                        isExpiry={
                            calExpiryDateModalVisible
                                ? isExpiryDate
                                : calManufactureModalVisible
                                ? isManufactureExpiry
                                : null
                        }
                        setCalModalVisible={
                            calExpiryDateModalVisible
                                ? setCalExpiryDateModalVisible
                                : calManufactureModalVisible
                                ? setCalManufactureModalVisible
                                : null
                        }
                        setSecondCalModalVisible={
                            calExpiryDateModalVisible
                                ? setCalManufactureModalVisible
                                : calManufactureModalVisible
                                ? setCalExpiryDateModalVisible
                                : null
                        }
                    />
                </View>
            </Modal>
        </>
    );
};

export default AddDonateVariant;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: SIZE(32),
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
    labelText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.medium,
    },
    counterContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZE(10),
        marginTop: SIZE(24),
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
        backgroundColor: '#003459',
        alignItems: 'center',
        justifyContent: 'center',
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
