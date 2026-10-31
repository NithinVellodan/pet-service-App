import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

//packages
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SIZE, SIZES} from '../../../../theme/theme';
import CloseRound from '../../../../assets/icons/close-circle.svg';
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import NormalForm from '../../../../components/forms/NormalForm';
import PickImage from '../includes/PickImage';
import Count from '../includes/Count';
import {FONTS} from '../../../../theme/fonts';
import TwoButton from '../includes/TwoButton';
import TickIcon from '../../../../assets/icons/tick-icon.svg';
import VariantDrop from '../includes/VariantDrop';
import {TextInput} from 'react-native';

const AddVariant = ({
    close,
    addVariantSet,
    editProduct,
    variantName,
    setVariantName,
    addPrice,
    setAddPrice,
    stockcount,
    setStockCount,
    variant,
    setVariant,
    flavorImage,
    setFlavorImage,
    checkDefaultVariant,
    setcheckDefaultVariant,
    multiVariant,
    setMultiVariant,
    errorMessage,
    setErrorMessage,
    addProduct,
    clearAll,
    isLoading,
}) => {
    const SizeEmpty = variant.every(item => item.unit_name);
    const PriceEmpty = variant.every(item => item.price);

    // Add Variant
    const addVariant = () => {
        const newVariant = {
            id: variant.length + 1,
            key: '',
            name: `Variant ${variant.length + 1}`,
            unit_name: '',
            price: '',
            stock: 1,
        };

        setVariant([...variant, newVariant]);
    };

    // Remove Variant
    const removeVariant = idToRemove => {
        const updatedVariants = variant.filter(
            variant => variant.id !== idToRemove,
        );
        setVariant(updatedVariants);
    };

    const removeImageNew = pathToRemove => {
        setFlavorImage(prevflavorImage =>
            prevflavorImage.filter(image => image.path !== pathToRemove),
        );
    };
    const [isFocused, setIsFocused] = useState(false);

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
                <View style={styles.mainContainer}>
                    <View>
                        <DoubleColorHeading
                            firstTitle={editProduct ? 'Edit' : 'Add'}
                            secondTitle={'Product Variant'}
                            isCenter={true}
                        />
                    </View>
                    <View>
                        <DescriptionHeading
                            text={
                                editProduct
                                    ? 'Edit Your Variant Details'
                                    : 'Please Enter Your Variant Details'
                            }
                            isCenter={true}
                        />
                    </View>
                    <View>
                        <NormalForm
                            label={'Variant Name'}
                            placeholder={'Enter Your Variant Name'}
                            name={variantName}
                            maxlength={35}
                            setName={setVariantName}
                            setError={setErrorMessage}
                        />
                        {errorMessage?.variant_name && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.variant_name}
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
                        {errorMessage?.flavor_image && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.flavor_image}
                            </Text>
                        )}
                    </View>
                    <View style={styles.multi}>
                        <View style={{marginRight: SIZE(8)}}>
                            <TouchableOpacity
                                onPress={() => setMultiVariant(!multiVariant)}>
                                <View style={styles.checkboxContainer}>
                                    <View
                                        style={[
                                            styles.checkbox,
                                            multiVariant && styles.checked,
                                        ]}>
                                        <TickIcon width={10} height={10} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.labelText}>Multi Variant</Text>
                    </View>
                    {multiVariant === false ? (
                        <>
                            {/* <NormalForm
                                    marginTop={SIZE(24)}
                                    label={'Add Price'}
                                    placeholder={'Enter Amount'}
                                    type={'numeric'}
                                    maxlength={10}
                                    name={addPrice}
                                    setName={setAddPrice}
                                    setError={setErrorMessage}
                                /> */}
                            <View style={styles.priceContainer}>
                                <View>
                                    <Text style={styles.labelText}>
                                        Add Price
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        ...styles.inputBox,
                                        borderColor: isFocused
                                            ? '#009FD3'
                                            : styles.inputBox.borderColor,
                                    }}>
                                    <TextInput
                                        style={styles.textInputStyle}
                                        placeholder="Enter Amount"
                                        placeholderTextColor="rgba(36, 36, 36, 0.5)"
                                        keyboardType="numeric"
                                        maxLength={10}
                                        value={addPrice}
                                        onChangeText={text => {
                                            const regexPattern = /^\d*\.?\d*$/;
                                            if (
                                                text === '' ||
                                                (text !== '0' &&
                                                    text.match(regexPattern))
                                            ) {
                                                setAddPrice(text);
                                            }
                                        }}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                    />
                                </View>

                                {errorMessage?.add_price && (
                                    <Text style={styles.errorMessage}>
                                        {errorMessage?.add_price}
                                    </Text>
                                )}
                            </View>
                            <View style={styles.counterContainer}>
                                <Text style={styles.labelText}>
                                    Initial Stock
                                </Text>
                                <Count
                                    count={stockcount}
                                    setCount={setStockCount}
                                />
                            </View>
                        </>
                    ) : (
                        <>
                            <View>
                                {variant?.map((item, index) => (
                                    <View key={index}>
                                        <VariantDrop
                                            count={item.stock}
                                            item={item}
                                            setVariant={setVariant}
                                            varient={variant}
                                            setError={setErrorMessage}
                                            removePress={() => {
                                                removeVariant(item.id);
                                            }}
                                        />

                                        {!item.price &&
                                        errorMessage?.variant_price ? (
                                            <Text style={styles.errorMessage}>
                                                {errorMessage?.variant_price}
                                            </Text>
                                        ) : (
                                            !item.unit_name &&
                                            errorMessage?.variant_size && (
                                                <Text
                                                    style={styles.errorMessage}>
                                                    {errorMessage?.variant_size}
                                                </Text>
                                            )
                                        )}
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    if (variant.length < 15) {
                                        addVariant();
                                    }
                                }}
                                style={styles.addVariantButton}>
                                <Text style={styles.addVariantText}>
                                    + Add Variant
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}

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
                        <Text style={styles.labelText}>Default Variant</Text>
                    </View>
                    {errorMessage?.default_variant && (
                        <Text style={styles.errorMessage}>
                            {errorMessage?.default_variant}
                        </Text>
                    )}
                    <View style={{marginTop: SIZE(40)}}>
                        <TwoButton
                            buttonLoader={isLoading}
                            leftText={'Cancel'}
                            onPressL={() => {
                                close(false);
                                clearAll && clearAll();
                            }}
                            rightText={'Submit'}
                            onPressR={() => {
                                if (addVariantSet) {
                                    if (
                                        variantName &&
                                        flavorImage.length > 0 &&
                                        !multiVariant
                                            ? addPrice
                                            : multiVariant &&
                                              variantName &&
                                              flavorImage.length > 0 &&
                                              SizeEmpty &&
                                              PriceEmpty
                                    ) {
                                        if (!editProduct) {
                                            addProduct();
                                        } else {
                                            close(false);
                                        }
                                    } else {
                                        setErrorMessage({
                                            ...errorMessage,
                                            variant_name: variantName
                                                ? ''
                                                : 'Product variant name is required',
                                            flavor_image:
                                                flavorImage.length > 0
                                                    ? ''
                                                    : 'Please add your image',
                                            add_price:
                                                !multiVariant && addPrice
                                                    ? ''
                                                    : 'Please enter amount',

                                            variant_price: PriceEmpty
                                                ? ''
                                                : 'Please add price',
                                            variant_size: SizeEmpty
                                                ? ''
                                                : 'Please add size',
                                        });
                                    }
                                } else {
                                    if (
                                        variantName &&
                                        flavorImage.length > 0 &&
                                        checkDefaultVariant &&
                                        !multiVariant
                                            ? addPrice
                                            : multiVariant &&
                                              checkDefaultVariant &&
                                              variantName &&
                                              flavorImage.length > 0 &&
                                              SizeEmpty &&
                                              PriceEmpty
                                    ) {
                                        if (!editProduct) {
                                            addProduct();
                                        } else {
                                            close(false);
                                        }
                                    } else {
                                        setErrorMessage({
                                            ...errorMessage,
                                            variant_name: variantName
                                                ? ''
                                                : 'Product variant name is required',
                                            flavor_image:
                                                flavorImage.length > 0
                                                    ? ''
                                                    : 'Please add your image',
                                            add_price:
                                                !multiVariant && addPrice
                                                    ? ''
                                                    : 'Please enter amount',
                                            default_variant: checkDefaultVariant
                                                ? ''
                                                : 'Please check default variant',

                                            variant_price: PriceEmpty
                                                ? ''
                                                : 'Please add price',
                                            variant_size: SizeEmpty
                                                ? ''
                                                : 'Please add size',
                                        });
                                    }
                                }
                                console.log('right');
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default AddVariant;

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        paddingBottom: SIZE(30),
    },
    mainContainer: {
        paddingHorizontal: SIZE(32),
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
    multi: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
        backgroundColor: '#009FD3',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#009FD3',
    },
    addVariantButton: {
        alignSelf: 'center',
        marginTop: SIZE(24),
    },
    addVariantText: {
        color: '#003459',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        lineHeight: SIZE(20),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    priceContainer: {
        marginTop: SIZE(24),
    },
    labelText: {
        fontFamily: FONTS.medium,
        fontSize: SIZE(16),
        color: '#686868',
        marginBottom: SIZE(8),
    },
    inputBox: {
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#D3D3D3',
        paddingHorizontal: SIZE(10),
        backgroundColor: '#f7f7f7',
        height: SIZE(48),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInputStyle: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#242424',
        flex: 1,
    },
});
