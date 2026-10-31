import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
//packages
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// Icons
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';
import CloseRound from '../../../../assets/icons/close-circle.svg';
// theme
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import NormalForm from '../../../../components/forms/NormalForm';
import DropDown from '../includes/DropDown';
import PickImage from '../includes/PickImage';
import DescriptionInput from '../includes/DescriptionInput';
import TwoButton from '../includes/TwoButton';
import {EcommerceApi} from '../../EcommerceApiSection';

const AddProduct = ({
    close,
    editProduct,
    setProduct,
    productName,
    setProductName,
    categoryValue,
    setCategoryValue,
    categoryImage,
    setCategoryImage,
    productDescription,
    setProductDescription,
    errorMessage,
    setErrorMessage,
    clearAll,
    editProductapi,
    isLoading,
}) => {
    const [category, setCategory] = useState([]);
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

    EcommerceApi(setCategory);

    return (
        <View style={{flex: 1, backgroundColor: '#F7F7F7', width: SIZES.width}}>
            <View style={{height: SIZE(60)}}>
                <TouchableOpacity
                    onPress={() => {
                        close(false);
                        clearAll && clearAll();
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
                                firstTitle={editProduct ? 'Edit' : 'Add'}
                                secondTitle={'Product Details'}
                                isCenter={true}
                            />
                        </View>
                        <View>
                            <DescriptionHeading
                                text={
                                    editProduct
                                        ? 'Edit Your Product Details'
                                        : 'Please Enter Your Product Details'
                                }
                                isCenter={true}
                            />
                        </View>
                        <View>
                            <NormalForm
                                label={'Product Name'}
                                placeholder={'Enter Your Product Name'}
                                name={productName}
                                setName={setProductName}
                                setError={setErrorMessage}
                            />
                            {errorMessage?.name && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.name}
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
                            {errorMessage?.category && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.category}
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
                                label={'Description'}
                                placeholder={'Description'}
                                description={productDescription}
                                setDescription={setProductDescription}
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
                                    console.log('left');
                                    close(false);
                                    clearAll && clearAll();
                                }}
                                rightText={'Next'}
                                onPressR={() => {
                                    if (
                                        productName &&
                                        categoryValue &&
                                        categoryImage.length > 0 &&
                                        productDescription
                                    ) {
                                        if (editProduct) {
                                            console.log('edited product');
                                            editProductapi();
                                        } else {
                                            setProduct('variant');
                                        }
                                    } else {
                                        setErrorMessage({
                                            ...errorMessage,
                                            name: productName
                                                ? ''
                                                : 'Product name is required',
                                            category: categoryValue
                                                ? ''
                                                : 'Please select your category',
                                            image:
                                                categoryImage.length > 0
                                                    ? ''
                                                    : 'Please add your image',
                                            description: productDescription
                                                ? ''
                                                : 'Please enter your description',
                                        });
                                    }
                                    console.log('right');
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default AddProduct;

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
