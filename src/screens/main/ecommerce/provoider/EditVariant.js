import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

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

const EditVariant = ({
    close,
    editProduct,
    variantName,
    setVariantName,
    addPrice,
    setAddPrice,
    stockcount,
    setStockCount,
    variantEdit,
    setVariantEdit,
    setRemovedVariantEditPk,
    setenableVariantEditPk,
    variant1,
    setVariant1,
    flavorImage,
    setFlavorImage,
    upToDateImage,
    setUpToDateImage,
    setRemovedImagePk,
    multiVariant,
    setMultiVariant,
    errorMessage,
    setErrorMessage,
    EditProductVariant,
    clearAll,
    isLoading,
}) => {
    const SizeEmpty = variantEdit.every(item => item.unit_name);
    const PriceEmpty = variantEdit.every(item => item.price);
    const SizeEmpty1 = variant1.every(item => item.unit_name);
    const PriceEmpty1 = variant1.every(item => item.price);

    // Add Variant
    const addVariant = () => {
        const newVariant = {
            id: variantEdit.length + variant1.length + 1,
            key: '',
            name: `Variant ${variantEdit.length + variant1.length + 1}`,
            unit_name: '',
            price: '',
            stock: 1,
        };

        setVariant1([...variant1, newVariant]);
    };
    // remove image api
    const removeImage = pkToRemove => {
        setUpToDateImage(prevImages =>
            prevImages.filter(image => image.id !== pkToRemove),
        );
        setRemovedImagePk(prevSet => new Set(prevSet).add(pkToRemove));
    };
    // remove image
    const removeImageNew = pathToRemove => {
        setFlavorImage(prevflavorImage =>
            prevflavorImage.filter(image => image.path !== pathToRemove),
        );
    };
    // // Remove Variant
    const removeVariant = idToRemove => {
        const updatedVariantid = variant1.filter(
            variant1 => variant1.id !== idToRemove,
        );
        setVariant1(updatedVariantid);
    };
    // Remove Variant api
    const removeVariantPk = pkToRemove => {
        setRemovedVariantEditPk(prevSet => new Set(prevSet).add(pkToRemove));
    };
    // Enable Variant api
    const enableVariantPk = pkToRemove => {
        setenableVariantEditPk(prevSet => new Set(prevSet).add(pkToRemove));
    };

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

                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            padding: SIZE(10),
                            marginTop: SIZE(12),
                        }}>
                        {upToDateImage && (
                            <>
                                {upToDateImage.map((image, index) => (
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
                                            source={{
                                                uri: image?.image,
                                            }}
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
                                                removeImage(image.id)
                                            }>
                                            <CloseRound
                                                height={SIZE(22)}
                                                width={SIZE(22)}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </>
                        )}
                        {flavorImage && (
                            <>
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
                                            source={{
                                                uri: image.path,
                                            }}
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
                            </>
                        )}
                    </View>
                    {/* ))} */}
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
                                onPress={() => {
                                    if (variantEdit.length == 1) {
                                        setMultiVariant(!multiVariant);
                                    }
                                }}>
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

                    <>
                        {multiVariant === false ? (
                            <>
                                <View>
                                    <NormalForm
                                        marginTop={SIZE(24)}
                                        label={'Add Price'}
                                        placeholder={'Enter Amount'}
                                        type={'numeric'}
                                        maxlength={10}
                                        name={`${addPrice}`}
                                        setName={setAddPrice}
                                        setError={setErrorMessage}
                                    />
                                    {errorMessage?.add_price && (
                                        <Text style={styles.errorMessage}>
                                            {errorMessage?.add_price}
                                        </Text>
                                    )}
                                </View>
                                <View style={styles.counterContainer}>
                                    <Text style={styles.labelText}>Stock</Text>
                                    <Count
                                        count={stockcount}
                                        setCount={setStockCount}
                                    />
                                </View>
                            </>
                        ) : (
                            <>
                                <View>
                                    {variantEdit?.map((item, index) => (
                                        <View key={index}>
                                            <VariantDrop
                                                edi_vareint={true}
                                                index={index}
                                                count={item.stock}
                                                item={item}
                                                setVariant={setVariantEdit}
                                                varient={variantEdit}
                                                setError={setErrorMessage}
                                                enablePress={() => {
                                                    enableVariantPk(item.id);
                                                }}
                                                removePress={() => {
                                                    removeVariantPk(item.id);
                                                }}
                                            />

                                            {!item.price &&
                                            errorMessage?.variant_price ? (
                                                <Text
                                                    style={styles.errorMessage}>
                                                    {
                                                        errorMessage?.variant_price
                                                    }
                                                </Text>
                                            ) : (
                                                !item.unit_name &&
                                                errorMessage?.variant_size && (
                                                    <Text
                                                        style={
                                                            styles.errorMessage
                                                        }>
                                                        {
                                                            errorMessage?.variant_size
                                                        }
                                                    </Text>
                                                )
                                            )}
                                        </View>
                                    ))}
                                </View>
                                <View>
                                    {variant1?.map((item, index) => (
                                        <View key={index}>
                                            <VariantDrop
                                                index={index}
                                                count={item.stock}
                                                item={item}
                                                setVariant={setVariant1}
                                                varient={variant1}
                                                setError={setErrorMessage}
                                                removePress={() => {
                                                    removeVariant(item.id);
                                                }}
                                            />

                                            {!item.price &&
                                            errorMessage?.variant_price1 ? (
                                                <Text
                                                    style={styles.errorMessage}>
                                                    {
                                                        errorMessage?.variant_price1
                                                    }
                                                </Text>
                                            ) : (
                                                !item.unit_name &&
                                                errorMessage?.variant_size1 && (
                                                    <Text
                                                        style={
                                                            styles.errorMessage
                                                        }>
                                                        {
                                                            errorMessage?.variant_size1
                                                        }
                                                    </Text>
                                                )
                                            )}
                                        </View>
                                    ))}
                                </View>
                                <View>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            console.log('add_variant');
                                            if (
                                                variantEdit.length +
                                                    variant1.length <
                                                15
                                            ) {
                                                addVariant();
                                            }
                                        }}
                                        style={styles.addVariantButton}>
                                        <Text style={styles.addVariantText}>
                                            + Add Variant
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                        {/* )} */}

                        <View style={{marginTop: SIZE(40)}}>
                            <TwoButton
                                buttonLoader={isLoading}
                                leftText={'Cancel'}
                                onPressL={() => {
                                    console.log('left');
                                    close(false);
                                    clearAll && clearAll();
                                }}
                                rightText={'Submit'}
                                onPressR={() => {
                                    if (
                                        variantName &&
                                        (flavorImage.length > 0 ||
                                            upToDateImage.length > 0) &&
                                        !multiVariant
                                            ? addPrice
                                            : multiVariant &&
                                              variantName &&
                                              (flavorImage.length > 0 ||
                                                  upToDateImage.length > 0) &&
                                              SizeEmpty &&
                                              PriceEmpty &&
                                              SizeEmpty1 &&
                                              PriceEmpty1
                                    ) {
                                        EditProductVariant();
                                    } else {
                                        setErrorMessage({
                                            ...errorMessage,
                                            variant_name: variantName
                                                ? ''
                                                : 'Product variant name is required',
                                            flavor_image:
                                                flavorImage.length > 0 ||
                                                upToDateImage.length > 0
                                                    ? ''
                                                    : 'Please add your image',

                                            variant_price: PriceEmpty
                                                ? ''
                                                : 'Please add price',
                                            variant_size: SizeEmpty
                                                ? ''
                                                : 'Please add size',
                                            variant_price1: PriceEmpty1
                                                ? ''
                                                : 'Please add price',
                                            variant_size1: SizeEmpty1
                                                ? ''
                                                : 'Please add size',
                                        });
                                    }
                                    console.log('right');
                                }}
                            />
                        </View>
                    </>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default EditVariant;

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
        backgroundColor: '#2A85FF',
        alignItems: 'center',
        justifyContent: 'center',
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
});
