import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

//packages
import DocumentPicker from 'react-native-document-picker';

//constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

//images and logos
import UploadICon from '../../../../../assets/icons/upload.svg';

const DocumentUpload = ({cvFile, setCvFile, cvFileNoEdit}) => {
    const handleUpload = async () => {
        try {
            const results = await DocumentPicker.pick({
                allowMultiSelection: false,
                copyTo: 'documentDirectory',
                type: [
                    DocumentPicker.types.pdf,
                    DocumentPicker.types.plainText,
                    DocumentPicker.types.csv,
                    DocumentPicker.types.doc,
                    DocumentPicker.types.docx,
                    DocumentPicker.types.ppt,
                    DocumentPicker.types.pptx,
                    DocumentPicker.types.xls,
                    DocumentPicker.types.xlsx,
                    DocumentPicker.types.zip,
                ],
            });

            if (results.length > 0) {
                const res = results[0];
                setCvFile([{uri: res.uri, name: res.name, type: res.type}]);
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

    const renderDocuments = () => {
        const editDoc = cvFileNoEdit;

        if (cvFile.length !== 0) {
            return (
                <View
                    style={[
                        styles.uploadedDocument,
                        {
                            borderColor: '#003459',
                        },
                    ]}>
                    <Text
                        style={{
                            fontSize: SIZE(14),
                            fontFamily: FONTS.regular,
                            color: '#686868',
                        }}>
                        {cvFile[0].name}
                    </Text>
                </View>
            );
        } else if (editDoc) {
            return (
                <View
                    style={[
                        styles.uploadedDocument,
                        {
                            borderColor: '#003459',
                        },
                    ]}>
                    <Text
                        style={{
                            fontSize: SIZE(14),
                            fontFamily: FONTS.regular,
                            color: '#686868',
                        }}>
                        {extractFilenameFromURL(editDoc)}
                    </Text>
                </View>
            );
        } else null;
    };

    return (
        <View>
            {renderDocuments()}
            <TouchableOpacity
                onPress={() => {
                    // if (ckeck) {
                    //     handleVaccination();
                    // }
                    // setErrorMessage &&
                    //     setErrorMessage(prev => ({
                    //         ...prev,
                    //         vaccination_is: false,
                    //     }));
                    handleUpload();
                }}
                activeOpacity={0.8}
                style={styles.imageMainContainer}>
                <View
                    style={[
                        styles.imageContainer,
                        {
                            borderColor: '#003459',
                        },
                    ]}>
                    <View style={styles.imageContent}>
                        <View style={styles.uploadContainer}>
                            <UploadICon width={'100%'} height={'100%'} />
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
                                        color: '#003459',
                                    },
                                ]}>
                                Upload CV
                            </Text>
                        </View>
                        <View style={styles.imageUploadContainer}>
                            <Text
                                style={{
                                    fontWeight: '700',
                                    fontSize: SIZE(12),
                                    color: '#003459',
                                }}>
                                {' '}
                                +Upload
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default DocumentUpload;

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
