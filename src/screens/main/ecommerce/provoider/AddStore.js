import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    View,
    ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';

// theme
import {SIZE, SIZES} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

// Icons
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';
import CloseRound from '../../../../assets/icons/close-circle.svg';

// Componet
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import NormalForm from '../../../../components/forms/NormalForm';
import PetBasicDetails from '../../../../screens/detail/includes/PetBasicDetails';

// Package
import PickImage from '../includes/PickImage';
import {Context} from '../../../../contexts/Store';

const AddStore = ({
    store_edit,
    close,
    firststore,
    setDetailScreens,
    storeTitle,
    setStoreTitle,
    shopImage,
    setShopImage,
    geoAddressText,
    setGeoAddressText,
    addressText,
    setAddressText,
    exactLocation,
    setExactLocation,
    finalLocation,
    errorMessage,
    setErrorMessage,
    clearStore,
    toastRef,
    buttonLoader,
    editShopDetail,
}) => {
    const removeImageNew = pathToRemove => {
        setShopImage(prevshopImage =>
            prevshopImage.filter(image => image.path !== pathToRemove),
        );
    };

    return (
        <View style={{flex: 1, backgroundColor: '#F7F7F7'}}>
            <ScrollView
                keyboardShouldPersistTaps={'handled'}
                bounces={false}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
                {!firststore && (
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
                )}

                <View style={styles.mainContainer}>
                    <View>
                        <DoubleColorHeading
                            firstTitle={'Add'}
                            secondTitle={'Your Store Details'}
                            isCenter={true}
                        />
                    </View>
                    <View>
                        <DescriptionHeading
                            text={'Please Enter Your Store Details'}
                            isCenter={true}
                        />
                    </View>
                    <View>
                        <NormalForm
                            label={'Store Title'}
                            placeholder={'Enter Title'}
                            name={storeTitle}
                            setName={setStoreTitle}
                            setError={setErrorMessage}
                        />
                        {errorMessage?.store_title && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.store_title}
                            </Text>
                        )}
                    </View>
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
                            toastRef={toastRef}
                            picklocation={true}
                        />
                        {errorMessage?.location_store && (
                            <Text
                                style={[
                                    styles.errorMessage,
                                    {
                                        marginTop: SIZE(15),
                                        marginBottom: SIZE(-20),
                                    },
                                ]}>
                                {errorMessage?.location_store}
                            </Text>
                        )}
                    </View>
                    {shopImage && (
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                padding: SIZE(10),
                                marginTop: SIZE(24),
                            }}>
                            {shopImage.map((image, index) => (
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
                            setImages={setShopImage}
                            setError={setErrorMessage}
                            images={shopImage}
                            single={true}
                        />
                        {errorMessage?.image && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.image}
                            </Text>
                        )}
                    </View>
                    <View style={styles.buttonContain}>
                        <TouchableOpacity
                            disabled={buttonLoader}
                            onPress={() => {
                                if (store_edit) {
                                    close(false);
                                } else {
                                    if (firststore) {
                                        setDetailScreens('addPet');
                                        clearStore();
                                    } else {
                                        close(false);
                                        clearStore();
                                    }
                                }
                            }}
                            style={styles.cancelButton}
                            activeOpacity={0.8}>
                            <Text
                                allowFontScaling={false}
                                style={styles.cancelButtonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={buttonLoader}
                            onPress={() => {
                                if (
                                    storeTitle &&
                                    finalLocation &&
                                    shopImage.length > 0
                                ) {
                                    if (store_edit) {
                                        editShopDetail && editShopDetail();
                                    } else {
                                        if (firststore) {
                                            setDetailScreens('confiromStore');
                                        } else {
                                            setDetailScreens('confiromStore');
                                        }
                                    }
                                } else {
                                    setErrorMessage({
                                        ...errorMessage,
                                        store_title: storeTitle
                                            ? ''
                                            : 'Title is required',
                                        location_store: finalLocation
                                            ? ''
                                            : 'Location required',
                                        image:
                                            shopImage.length > 0
                                                ? ''
                                                : 'Please add your image',
                                    });
                                }
                            }}
                            style={styles.saveButton}
                            activeOpacity={0.8}>
                            {buttonLoader ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Text
                                    style={styles.saveButtonText}
                                    allowFontScaling={false}>
                                    Save
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default AddStore;

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        paddingTop: SIZE(60),
    },
    mainContainer: {
        paddingHorizontal: SIZE(32),
    },
    buttonContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(40),
    },
    cancelButton: {
        width: SIZE(170),
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: 1,
        borderColor: '#009FD3',
    },
    cancelButtonText: {
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
        color: '#009FD3',
    },
    saveButton: {
        width: SIZE(170),
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZE(14),
        backgroundColor: '#003459',
        borderRadius: SIZE(8),
    },
    saveButtonText: {
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
        color: '#FFF',
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
