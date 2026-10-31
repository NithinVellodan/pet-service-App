import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// theme
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import UploadIConCustomer from '../../../assets/icons/upload-customer.svg';
import UploadICon from '../../../assets/icons/upload.svg';
import DocumentPicker from 'react-native-document-picker';
import InfoCircle from '../../../assets/icons/infocircle.svg';
import TickIcon from '../../../assets/icons/tick-icon.svg';

export const Vaccination = ({
    vaccination,
    setVaccination,
    errorMessage,
    ckeck,
    setCheck,
    page_is,
    editableVaccinationDoc,
    setErrorMessage,
}) => {
    const handleVaccination = async () => {
        try {
            const results = await DocumentPicker.pick({
                allowMultiSelection: false,
            });

            if (results.length > 0) {
                const res = results[0];
                setVaccination([
                    {uri: res.uri, name: res.name, type: res.type},
                ]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const extractFilenameFromURL = url => {
        const lastSlashIndex = url.lastIndexOf('/');
        if (lastSlashIndex !== -1) {
            return url.substring(lastSlashIndex + 1);
        } else {
            return url;
        }
    };

    const renderInsuranceDocuments = () => {
        const editDoc = editableVaccinationDoc;
        const insuranceDoc = vaccination;
        if (insuranceDoc.length !== 0) {
            return (
                <View
                    style={[
                        styles.uploadedDocument,
                        {
                            borderColor:
                                page_is === 'customer_pet_add'
                                    ? '#009FD3'
                                    : '#003459',
                        },
                    ]}>
                    <Text
                        style={{
                            fontSize: SIZE(14),
                            fontFamily: FONTS.regular,
                            color: '#242424',
                        }}>
                        {insuranceDoc[0].name}
                    </Text>
                </View>
            );
        } else if (editDoc) {
            return (
                <View
                    style={[
                        styles.uploadedDocument,
                        {
                            borderColor:
                                page_is === 'customer_pet_add'
                                    ? '#009FD3'
                                    : '#003459',
                        },
                    ]}>
                    <Text
                        style={{
                            fontSize: SIZE(14),
                            fontFamily: FONTS.regular,
                            color: '#242424',
                        }}>
                        {extractFilenameFromURL(editDoc)}
                    </Text>
                </View>
            );
        } else null;
    };

    return (
        <View
            style={[
                styles.container,
                {marginTop: page_is == 'customer_pet_add' ? SIZE(20) : 0},
            ]}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{marginRight: SIZE(8)}}>
                        <TouchableOpacity
                            onPress={() => {
                                setCheck(!ckeck);
                                setErrorMessage &&
                                    setErrorMessage(prev => ({
                                        ...prev,
                                        vaccination_is: prev => !prev,
                                        calendar_two: prev => !prev,
                                    }));
                            }}>
                            <View style={styles.checkboxContainer}>
                                <View
                                    style={[
                                        styles.checkbox,
                                        {
                                            backgroundColor: ckeck
                                                ? page_is == 'customer_pet_add'
                                                    ? '#009FD3'
                                                    : '#003459'
                                                : '#fff',
                                        },

                                        {
                                            borderColor: ckeck
                                                ? '#fff'
                                                : '#969696',
                                        },
                                    ]}>
                                    <TickIcon width={10} height={10} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.labelText}>Vaccination</Text>
                    </View>
                </View>
            </View>

            {page_is === 'customer_pet_add' && ckeck ? (
                <>
                    {renderInsuranceDocuments()}
                    <TouchableOpacity
                        onPress={() => {
                            if (ckeck) {
                                handleVaccination();
                            }
                            setErrorMessage &&
                                setErrorMessage(prev => ({
                                    ...prev,
                                    vaccination_is: false,
                                }));
                        }}
                        activeOpacity={0.8}
                        style={styles.imageMainContainer}>
                        <View
                            style={[
                                styles.imageContainer,
                                {
                                    borderColor:
                                        page_is === 'customer_pet_add'
                                            ? '#009FD3'
                                            : '#003459',
                                },
                            ]}>
                            <View style={styles.imageContent}>
                                <View style={styles.uploadContainer}>
                                    {page_is === 'customer_pet_add' ? (
                                        <UploadIConCustomer
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <UploadICon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    )}
                                </View>
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    marginTop: SIZE(16),
                                }}>
                                <View>
                                    <Text
                                        style={[
                                            styles.uploadText,
                                            {
                                                color:
                                                    page_is ===
                                                    'customer_pet_add'
                                                        ? '#009FD3'
                                                        : '#003459',
                                            },
                                        ]}>
                                        Upload Vaccination Documents
                                    </Text>
                                </View>
                                <View style={styles.imageUploadContainer}>
                                    <Text
                                        style={{
                                            fontWeight: '700',
                                            fontSize: SIZE(12),
                                            color:
                                                page_is === 'customer_pet_add'
                                                    ? '#009FD3'
                                                    : '#003459',
                                        }}>
                                        {' '}
                                        +Upload Document
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            ) : page_is !== 'customer_pet_add' && ckeck ? (
                <>
                    {renderInsuranceDocuments()}
                    <TouchableOpacity
                        onPress={() => {
                            if (ckeck) {
                                handleVaccination();
                            }
                            setErrorMessage &&
                                setErrorMessage(prev => ({
                                    ...prev,
                                    vaccination_is: false,
                                }));
                        }}
                        activeOpacity={0.8}
                        style={styles.imageMainContainer}>
                        <View
                            style={[
                                styles.imageContainer,
                                {
                                    borderColor:
                                        page_is === 'customer_pet_add'
                                            ? '#009FD3'
                                            : '#003459',
                                },
                            ]}>
                            <View style={styles.imageContent}>
                                <View style={styles.uploadContainer}>
                                    {page_is === 'customer_pet_add' ? (
                                        <UploadIConCustomer
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <UploadICon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    )}
                                </View>
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    marginTop: SIZE(16),
                                }}>
                                <View>
                                    <Text
                                        style={[
                                            styles.uploadText,
                                            {
                                                color:
                                                    page_is ===
                                                    'customer_pet_add'
                                                        ? '#009FD3'
                                                        : '#003459',
                                            },
                                        ]}>
                                        Upload Vaccination Documents
                                    </Text>
                                </View>
                                <View style={styles.imageUploadContainer}>
                                    <Text
                                        style={{
                                            fontWeight: '700',
                                            fontSize: SIZE(12),
                                            color:
                                                page_is === 'customer_pet_add'
                                                    ? '#009FD3'
                                                    : '#003459',
                                        }}>
                                        {' '}
                                        +Upload Document
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            ) : null}

            {errorMessage.vaccination_is == true && (
                <Text style={styles.errorMessage}>Please select to upload</Text>
            )}
        </View>
    );
};

const VaccinationAndInsurance = ({
    insuranceDocuments,
    setInsuranceDocuments,
    errorMessage,
    ckeckInsurance,
    setckeckInsurance,
    setIsShowInsurance,
    page_is,
    editableInsureDoc,
    setErrorMessage,
}) => {
    const [timeoutId, setTimeoutId] = useState(null);
    const handlePickInsuranceDocument = async () => {
        try {
            const results = await DocumentPicker.pick({
                allowMultiSelection: false,
            });

            if (results.length > 0) {
                const res = results[0];
                setInsuranceDocuments([
                    {uri: res.uri, name: res.name, type: res.type},
                ]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const extractFilenameFromURL = url => {
        const lastSlashIndex = url.lastIndexOf('/');
        if (lastSlashIndex !== -1) {
            return url.substring(lastSlashIndex + 1);
        } else {
            return url;
        }
    };

    const renderInsuranceDocuments = () => {
        const editDoc = editableInsureDoc;
        const insuranceDoc = insuranceDocuments;
        if (insuranceDoc.length !== 0) {
            return (
                <View
                    style={[
                        styles.uploadedDocument,
                        {
                            borderColor:
                                page_is === 'customer_pet_add'
                                    ? '#009FD3'
                                    : '#003459',
                        },
                    ]}>
                    <Text
                        style={{
                            fontSize: SIZE(14),
                            fontFamily: FONTS.regular,
                            color: '#242424',
                        }}>
                        {insuranceDoc[0].name}
                    </Text>
                </View>
            );
        } else if (editDoc) {
            return (
                <View
                    style={[
                        styles.uploadedDocument,
                        {
                            borderColor:
                                page_is === 'customer_pet_add'
                                    ? '#009FD3'
                                    : '#003459',
                        },
                    ]}>
                    <Text
                        style={{
                            fontSize: SIZE(14),
                            fontFamily: FONTS.regular,
                            color: '#242424',
                        }}>
                        {extractFilenameFromURL(editDoc)}
                    </Text>
                </View>
            );
        } else null;
    };

    const handlePress = itemId => {
        clearTimeout(timeoutId);
        setIsShowInsurance(true);
        const newTimeoutId = setTimeout(() => {
            setIsShowInsurance(null);
        }, 1000);
        setTimeoutId(newTimeoutId);
    };
    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    return (
        <View style={[styles.container]}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{marginRight: SIZE(8)}}>
                        <TouchableOpacity
                            onPress={() => {
                                setckeckInsurance(!ckeckInsurance);
                                setErrorMessage &&
                                    setErrorMessage(prev => ({
                                        ...prev,
                                        isurance_is: prev => !prev,
                                        calendar_one: prev => !prev,
                                    }));
                            }}>
                            <View style={styles.checkboxContainer}>
                                <View
                                    style={[
                                        styles.checkbox,
                                        {
                                            backgroundColor: ckeckInsurance
                                                ? page_is == 'customer_pet_add'
                                                    ? '#009FD3'
                                                    : '#003459'
                                                : '#fff',
                                        },
                                        {
                                            borderColor: ckeckInsurance
                                                ? '#fff'
                                                : '#969696',
                                        },
                                    ]}>
                                    <TickIcon width={10} height={10} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.labelText}>Insurance</Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        handlePress();
                    }}
                    style={{width: SIZE(24), height: SIZE(24)}}>
                    <InfoCircle width="100%" height="100%" />
                </TouchableOpacity>
            </View>

            {page_is === 'customer_pet_add' && ckeckInsurance ? (
                <>
                    {renderInsuranceDocuments()}
                    <TouchableOpacity
                        onPress={() => {
                            if (ckeckInsurance) {
                                handlePickInsuranceDocument();
                            }
                            setErrorMessage &&
                                setErrorMessage(prev => ({
                                    ...prev,
                                    isurance_is: false,
                                }));
                        }}
                        activeOpacity={0.8}
                        style={styles.imageMainContainer}>
                        <View
                            style={[
                                styles.imageContainer,
                                {
                                    borderColor:
                                        page_is === 'customer_pet_add'
                                            ? '#009FD3'
                                            : '#003459',
                                },
                            ]}>
                            <View style={styles.imageContent}>
                                <View style={styles.uploadContainer}>
                                    {page_is === 'customer_pet_add' ? (
                                        <UploadIConCustomer
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <UploadICon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    )}
                                </View>
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    marginTop: SIZE(16),
                                }}>
                                <View>
                                    <Text
                                        style={[
                                            styles.uploadText,
                                            {
                                                color:
                                                    page_is ===
                                                    'customer_pet_add'
                                                        ? '#009FD3'
                                                        : '#003459',
                                            },
                                        ]}>
                                        Upload Insurance Documents
                                    </Text>
                                </View>
                                <View style={styles.imageUploadContainer}>
                                    <Text
                                        style={{
                                            fontWeight: '700',
                                            fontSize: SIZE(12),
                                            color:
                                                page_is === 'customer_pet_add'
                                                    ? '#009FD3'
                                                    : '#003459',
                                        }}>
                                        {' '}
                                        +Upload Document
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            ) : page_is !== 'customer_pet_add' && ckeckInsurance ? (
                <>
                    {renderInsuranceDocuments()}
                    <TouchableOpacity
                        onPress={() => {
                            if (ckeckInsurance) {
                                handlePickInsuranceDocument();
                            }
                            setErrorMessage &&
                                setErrorMessage(prev => ({
                                    ...prev,
                                    isurance_is: false,
                                }));
                        }}
                        activeOpacity={0.8}
                        style={styles.imageMainContainer}>
                        <View
                            style={[
                                styles.imageContainer,
                                {
                                    borderColor:
                                        page_is === 'customer_pet_add'
                                            ? '#009FD3'
                                            : '#003459',
                                },
                            ]}>
                            <View style={styles.imageContent}>
                                <View style={styles.uploadContainer}>
                                    {page_is === 'customer_pet_add' ? (
                                        <UploadIConCustomer
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    ) : (
                                        <UploadICon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    )}
                                </View>
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    marginTop: SIZE(16),
                                }}>
                                <View>
                                    <Text
                                        style={[
                                            styles.uploadText,
                                            {
                                                color:
                                                    page_is ===
                                                    'customer_pet_add'
                                                        ? '#009FD3'
                                                        : '#003459',
                                            },
                                        ]}>
                                        Upload Insurance Documents
                                    </Text>
                                </View>
                                <View style={styles.imageUploadContainer}>
                                    <Text
                                        style={{
                                            fontWeight: '700',
                                            fontSize: SIZE(12),
                                            color:
                                                page_is === 'customer_pet_add'
                                                    ? '#009FD3'
                                                    : '#003459',
                                        }}>
                                        {' '}
                                        +Upload Document
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            ) : null}
            {errorMessage.isurance_is == true && (
                <Text style={styles.errorMessage}>Please select to upload</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    labelText: {
        color: '#686868',
        fontWeight: '400',
        fontFamily: FONTS.regular,
        marginBottom: SIZE(10),
    },
    uploadedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SIZE(32),
        borderStyle: 'dashed',
        padding: SIZE(10),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#003459',
    },
    imageMainContainer: {
        marginTop: SIZE(10),
    },
    uploadedImageContainer: {
        width: SIZE(100),
        height: SIZE(100),
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        backgroundColor: '#EAF7FF',
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#003459',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(32),
        borderStyle: 'dashed',
        alignItems: 'center',
    },
    imageContent: {
        backgroundColor: '#fff',
        width: SIZE(56),
        height: SIZE(56),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(40),
    },
    uploadContainer: {
        width: SIZE(24),
        height: SIZE(24),
        fontFamily: FONTS.bold,
    },
    uploadText: {
        fontSize: SIZE(13),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#003459',
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
        borderColor: '#003459',
        borderRadius: SIZE(5),
        marginRight: SIZE(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: '#003459',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: SIZE(16),
    },
    uploadedDocument: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SIZE(10),
        borderStyle: 'dashed',
        padding: SIZE(10),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#003459',
    },
});

export default VaccinationAndInsurance;
