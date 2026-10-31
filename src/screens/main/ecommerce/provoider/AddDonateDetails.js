import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
//packages
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SIZE, SIZES} from '../../../../theme/theme';
// Icons
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';
import CloseRound from '../../../../assets/icons/close-circle.svg';
// components
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import NormalForm from '../../../../components/forms/NormalForm';
import DropDown from '../includes/DropDown';
import PickImage from '../includes/PickImage';
import DescriptionInput from '../includes/DescriptionInput';
import TwoButton from '../includes/TwoButton';
import {FONTS} from '../../../../theme/fonts';
import {EcommerceApi} from '../../EcommerceApiSection';

const AddDonateDetails = ({
    close,
    name,
    setName,
    subtitle,
    setSubtitle,
    categoryValue,
    setCategoryValue,
    categoryImage,
    setCategoryImage,
    donateDescription,
    setDonateDescription,
    errorMessage,
    setErrorMessage,
    addDonateProduct,
    clearDonate,
    isLoading,
    is_edit,
    editDonateProduct,
}) => {
    const [category, setCategory] = useState([]);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const handlePressOutside = () => {
        if (categoryVisible) {
            setCategoryVisible(false);
        }
    };
    const removeImageNew = pathToRemove => {
        setCategoryImage(prevcategoryImage =>
            prevcategoryImage.filter(image => image.path !== pathToRemove),
        );
    };

    EcommerceApi(setCategory);

    return (
        <View style={{flex: 1, backgroundColor: '#F7F7F7', width: SIZES.width}}>
            <View style={{height: SIZE(60)}}>
                <TouchableOpacity
                    onPress={() => {
                        if (is_edit) {
                            close(false);
                        } else {
                            close(false);
                            clearDonate();
                        }
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
                bounces={false}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <TouchableWithoutFeedback onPress={handlePressOutside}>
                    <View style={styles.mainContainer}>
                        <View>
                            <DoubleColorHeading
                                firstTitle={'Add Donate'}
                                secondTitle={'Product Details'}
                                isCenter={true}
                            />
                        </View>
                        <View>
                            <DescriptionHeading
                                text={
                                    'Please Enter Your Donate Product Details'
                                }
                                isCenter={true}
                            />
                        </View>
                        <View>
                            <NormalForm
                                label={'Product Name'}
                                placeholder={'Enter Your Product Name'}
                                name={name}
                                setName={setName}
                                setError={setErrorMessage}
                            />
                            {errorMessage?.product_name && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.product_name}
                                </Text>
                            )}
                        </View>
                        <View>
                            <NormalForm
                                label={'Subtitle'}
                                placeholder={'Enter Subtitle'}
                                marginTop={24}
                                name={subtitle}
                                setName={setSubtitle}
                                setError={setErrorMessage}
                            />
                            {errorMessage?.product_sub && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.product_sub}
                                </Text>
                            )}
                        </View>
                        <View>
                            <DropDown
                                label={'Select Category'}
                                choose={'Select Your Category'}
                                data={category}
                                setCategoryValue={setCategoryValue}
                                categoryValue={categoryValue}
                                setError={setErrorMessage}
                                categoryVisible={categoryVisible}
                                setCategoryVisible={setCategoryVisible}
                            />
                            {errorMessage?.category_value && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.category_value}
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
                                        {!is_edit && (
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
                                        )}
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
                                label={'Description'}
                                placeholder={'Description'}
                                description={donateDescription}
                                setDescription={setDonateDescription}
                                setError={setErrorMessage}
                            />
                            {errorMessage?.description && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.description}
                                </Text>
                            )}
                        </View>
                        <View style={{marginTop: SIZE(40)}}>
                            <TwoButton
                                buttonLoader={isLoading}
                                leftText={'Cancel'}
                                onPressL={() => {
                                    if (is_edit) {
                                        close(false);
                                    } else {
                                        close(false);
                                        clearDonate();
                                    }
                                }}
                                rightText={'Submit'}
                                onPressR={() => {
                                    if (
                                        name &&
                                        subtitle &&
                                        categoryValue &&
                                        categoryImage.length > 0 &&
                                        donateDescription
                                    ) {
                                        if (is_edit) {
                                            editDonateProduct();
                                        } else {
                                            // close(false);
                                            addDonateProduct();
                                        }
                                    } else {
                                        setErrorMessage({
                                            ...errorMessage,
                                            product_name: name
                                                ? ''
                                                : 'Product name is required',
                                            product_sub: subtitle
                                                ? ''
                                                : 'Product subtitle is required',
                                            category_value: categoryValue
                                                ? ''
                                                : 'Select your category',

                                            image:
                                                categoryImage.length > 0
                                                    ? ''
                                                    : 'Please add image',
                                            description: donateDescription
                                                ? ''
                                                : 'Please enter your description',
                                        });
                                    }
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default AddDonateDetails;

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        paddingBottom: SIZE(30),
    },
    mainContainer: {
        paddingHorizontal: SIZE(32),
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
