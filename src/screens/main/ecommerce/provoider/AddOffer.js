import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//packages
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';

//constants
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {EcommerceServiceProviderProductVariants} from '../../EcommerceApiSection';

//components
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import NormalForm from '../../../../components/forms/NormalForm';
import DropDown from '../includes/DropDown';
import PickImage from '../includes/PickImage';
import DescriptionInput from '../includes/DescriptionInput';
import CalendarPicker from '../../../detail/includes/CalendarPicker';
import TwoButton from '../includes/TwoButton';
import Calendar from '../../../includes/calendar/Calendar';

//images and logos
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';
import CloseRound from '../../../../assets/icons/close-circle.svg';

const AddOffer = ({
    close,
    editOffer,
    title,
    setTitle,
    variantValue,
    setVariantValue,
    percentage,
    setPercentage,
    categoryImage,
    setCategoryImage,
    offerDescription,
    setOfferDescription,
    selectedDate,
    setSelectedDate,
    selectedDateExpiry,
    setSelectedDateExpiry,
    errorMessage,
    setErrorMessage,
    clearOffer,
    addOfferProduct,
    isLoading,
    editOfferProduct,
}) => {
    const [variant, setVariant] = useState([]);

    // calender
    const [calManufactureModalVisible, setCalManufactureModalVisible] =
        useState(false);
    const [calExpiryDateModalVisible, setCalExpiryDateModalVisible] =
        useState(false);
    const [isManufactureExpiry, setManufactureExpiry] = useState(true);
    const [isExpiryDate, setExpiryDate] = useState(true);

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

    const removeImageNew = pathToRemove => {
        setCategoryImage(prevcategoryImage =>
            prevcategoryImage.filter(image => image.path !== pathToRemove),
        );
    };
    const [categoryVisible, setCategoryVisible] = useState(false);
    const handlePressOutside = () => {
        if (categoryVisible) {
            setCategoryVisible(false);
        }
    };

    // Percentage regex decimal point
    const handleTextChange = newText => {
        const regex = /^(100(?:\.0{1,2})?|\d{0,2}(?:\.\d{0,2})?)?$/;

        if (regex.test(newText)) {
            setPercentage(newText);
        }
    };

    EcommerceServiceProviderProductVariants(setVariant);

    return (
        <View style={{flex: 1, backgroundColor: '#F7F7F7', width: SIZES.width}}>
            <View style={{height: SIZE(60)}}>
                <TouchableOpacity
                    onPress={() => {
                        close(false);
                        clearOffer && clearOffer();
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
            <KeyboardAwareScrollView
                extraScrollHeight={SIZE(100)}
                keyboardShouldPersistTaps={'handled'}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <TouchableWithoutFeedback onPress={handlePressOutside}>
                    <View style={styles.mainContainer}>
                        <View>
                            <DoubleColorHeading
                                firstTitle={editOffer ? 'Edit' : 'Add'}
                                secondTitle={'Offer'}
                                isCenter={true}
                            />
                        </View>
                        <View>
                            <DescriptionHeading
                                text={
                                    editOffer
                                        ? 'Edit Offer Details'
                                        : 'Add Offer Details'
                                }
                                isCenter={true}
                            />
                        </View>
                        <View>
                            <NormalForm
                                label={'Offer Title'}
                                placeholder={'Enter Offer Title'}
                                name={title}
                                maxlength={35}
                                setName={setTitle}
                                setError={setErrorMessage}
                            />
                            {errorMessage?.offer_title && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.offer_title}
                                </Text>
                            )}
                        </View>
                        <View>
                            <DropDown
                                label={'Product Variant'}
                                choose={'Choose'}
                                data={variant}
                                setCategoryValue={setVariantValue}
                                categoryValue={variantValue}
                                setError={setErrorMessage}
                                categoryVisible={categoryVisible}
                                setCategoryVisible={setCategoryVisible}
                            />
                            {errorMessage?.variant_value && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.variant_value}
                                </Text>
                            )}
                        </View>
                        <View>
                            <NormalForm
                                label={'Offer Percentage'}
                                placeholder={'Enter Percentage'}
                                marginTop={SIZE(24)}
                                type={'numeric'}
                                name={percentage}
                                setName={handleTextChange}
                                setError={setErrorMessage}
                            />
                            {errorMessage?.percent && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.percent}
                                </Text>
                            )}
                        </View>
                        {categoryImage && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    padding: SIZE(10),
                                    marginTop: SIZE(12),
                                }}>
                                {categoryImage.map((image, index) => (
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
                                setImages={setCategoryImage}
                                setError={setErrorMessage}
                                images={categoryImage}
                                single={true}
                            />
                            {errorMessage?.image && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.image}
                                </Text>
                            )}
                        </View>
                        <View>
                            <DescriptionInput
                                label={'Offer Description'}
                                placeholder={'Description'}
                                description={offerDescription}
                                setDescription={setOfferDescription}
                                setError={setErrorMessage}
                            />
                            {errorMessage?.description && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.description}
                                </Text>
                            )}
                        </View>
                        <View>
                            <CalendarPicker
                                ckeckInsurance={true}
                                setExpiry={setManufactureExpiry}
                                setCalModalVisible={
                                    setCalManufactureModalVisible
                                }
                                setSecondCalModalVisible={
                                    setCalExpiryDateModalVisible
                                }
                                errorMessage={errorMessage}
                                selectedDate={selectedDate}
                                label={'Start Date & Time'}
                                chooseDate={'Enter Time'}
                                dateTime={true}
                            />
                            {errorMessage?.selected_date && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.selected_date}
                                </Text>
                            )}
                        </View>
                        <View>
                            <CalendarPicker
                                ckeckInsurance={true}
                                setExpiry={setExpiryDate}
                                setCalModalVisible={
                                    setCalExpiryDateModalVisible
                                }
                                setSecondCalModalVisible={
                                    setCalManufactureModalVisible
                                }
                                errorMessage={errorMessage}
                                selectedDate={selectedDateExpiry}
                                label={'End Date & Time'}
                                chooseDate={'Enter Time'}
                                dateTime={true}
                            />
                            {errorMessage?.selected_date_expiry ? (
                                <Text style={styles.errorMessage}>
                                    {errorMessage.selected_date_expiry}
                                </Text>
                            ) : errorMessage?.selected_date_compare ? (
                                <Text style={styles.errorMessage}>
                                    {errorMessage.selected_date_compare}
                                </Text>
                            ) : null}
                        </View>
                        <View style={{marginTop: SIZE(40)}}>
                            <TwoButton
                                buttonLoader={isLoading}
                                leftText={'Cancel'}
                                onPressL={() => {
                                    close(false);
                                    clearOffer && clearOffer();
                                }}
                                rightText={'Submit'}
                                onPressR={() => {
                                    if (
                                        title &&
                                        variantValue &&
                                        percentage &&
                                        categoryImage.length > 0 &&
                                        offerDescription &&
                                        selectedDate &&
                                        selectedDateExpiry &&
                                        selectedDate < selectedDateExpiry
                                    ) {
                                        if (!editOffer) {
                                            // navigation.navigate('OfferItem');
                                            addOfferProduct();
                                        } else {
                                            editOfferProduct();
                                        }
                                        // close(false);
                                    } else {
                                        setErrorMessage({
                                            ...errorMessage,
                                            offer_title: title
                                                ? ''
                                                : 'Title is required',
                                            variant_value: variantValue
                                                ? ''
                                                : 'Choose your variant',
                                            percent: percentage
                                                ? ''
                                                : 'Please enter offer percentage',
                                            image:
                                                categoryImage.length > 0
                                                    ? ''
                                                    : 'Please add your image',
                                            description: offerDescription
                                                ? ''
                                                : 'Please enter your description',
                                            selected_date: selectedDate
                                                ? ''
                                                : 'Please select date',
                                            selected_date_expiry:
                                                selectedDateExpiry
                                                    ? ''
                                                    : 'Please select date',
                                            selected_date_compare:
                                                selectedDate <
                                                selectedDateExpiry
                                                    ? ''
                                                    : 'Please select second date and time greater that first',
                                        });
                                    }
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
                            timePicker={true}
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
                            defaultDate={
                                calExpiryDateModalVisible
                                    ? selectedDateExpiry
                                    : selectedDate
                            }
                        />
                    </View>
                </Modal>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default AddOffer;

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        paddingBottom: SIZE(30),
    },
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
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});
