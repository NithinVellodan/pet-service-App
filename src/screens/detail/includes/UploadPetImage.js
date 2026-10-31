// import React from 'react';
// import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

// // theme
// import {SIZE} from '../../../theme/theme';
// import {FONTS} from '../../../theme/fonts';
// import UploadICon from '../../../assets/icons/upload.svg';
// import UploadIConCustomer from '../../../assets/icons/upload-customer.svg';

// import ImagePicker from 'react-native-image-crop-picker';

// const UploadPetImage = ({
//     selectedImages,
//     setSelectedImages,
//     errorMessage,
//     page_is,
//     upToDateImage,
//     setUpToDateImage,
//     setRemovedImagePk,
//     setErrorMessage,
// }) => {
//     const pickImages = async () => {
//         Alert.alert(
//             'Choose Image Source',
//             'Do you want to pick an image from the gallery or take a photo?',
//             [
//                 {
//                     text: 'Cancel',
//                     onPress: () => console.log('User cancelled image picker'),
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Gallery',
//                     onPress: () => pickFromGallery(),
//                 },
//                 {
//                     text: 'Camera',
//                     onPress: () => pickFromCamera(),
//                 },
//             ],
//             {cancelable: false},
//         );
//     };
//     const pickFromCamera = async () => {
//         try {
//             const results = await ImagePicker.openCamera({
//                 mediaType: 'photo',
//             });
//             handleImageResults(results);
//         } catch (err) {
//             console.log('Error picking images from camera:', err);
//         }
//     };

//     const pickFromGallery = async () => {
//         try {
//             const results = await ImagePicker.openPicker({
//                 multiple: true,
//                 mediaType: 'photo',
//             });
//             handleImageResults(results);
//         } catch (err) {
//             console.log('Error picking images from gallery:', err);
//         }
//     };

//     const handleImageResults = results => {
//         if (Array.isArray(results)) {
//             const newImages = results.map(image => ({
//                 uri: image.path,
//                 name: image.filename || image.path.split('/').pop(),
//                 type: image.mime,
//             }));
//             setSelectedImages(prevImages => [...prevImages, ...newImages]);
//         } else {
//             const newImage = {
//                 uri: results.path,
//                 name: results.filename || results.path.split('/').pop(),
//                 type: results.mime,
//             };
//             setSelectedImages(prevImages => [...prevImages, newImage]);
//         }
//     };

//     const removeImage = pkToRemove => {
//         setUpToDateImage(prevImages =>
//             prevImages.filter(image => image.id !== pkToRemove),
//         );
//         setRemovedImagePk(prevSet => new Set(prevSet).add(pkToRemove));
//     };

//     const removeImageNew = pathToRemove => {
//         setSelectedImages(prevImages =>
//             prevImages.filter(image => image.path !== pathToRemove),
//         );
//     };

//     // remove_item on Array
//     const handleRemoveInsurance = indexToRemove => {
//         setSelectedImages(prevDocuments =>
//             prevDocuments.filter((_, i) => i !== indexToRemove),
//         );
//     };

//     const extractFilenameFromURL = url => {
//         const lastSlashIndex = url.lastIndexOf('/');
//         if (lastSlashIndex !== -1) {
//             return url.substring(lastSlashIndex + 1);
//         } else {
//             return url;
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <View style={{marginBottom: SIZE(10)}}>
//                 {upToDateImage?.map((image, index) => (
//                     <View
//                         style={[
//                             styles.uploadedDocument,
//                             {
//                                 borderColor:
//                                     page_is === 'customer_pet_add'
//                                         ? '#009FD3'
//                                         : '#003459',
//                             },
//                         ]}
//                         key={index}>
//                         <Text
//                             style={{
//                                 fontSize: SIZE(14),
//                                 fontFamily: FONTS.regular,
//                                 color: '#242424',
//                             }}>
//                             {extractFilenameFromURL(image.image)}
//                         </Text>
//                         <TouchableOpacity onPress={() => removeImage(image.id)}>
//                             <Text
//                                 style={{
//                                     color:
//                                         page_is === 'customer_pet_add'
//                                             ? '#009FD3'
//                                             : '#003459',
//                                     fontSize: SIZE(12),
//                                     fontFamily: FONTS.regular,
//                                 }}>
//                                 Remove
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 ))}

//                 {selectedImages.map((image, index) => (
//                     <View
//                         style={[
//                             styles.uploadedDocument,
//                             {
//                                 borderColor:
//                                     page_is === 'customer_pet_add'
//                                         ? '#009FD3'
//                                         : '#003459',
//                             },
//                         ]}
//                         key={index}>
//                         <Text
//                             style={{
//                                 fontSize: SIZE(14),
//                                 fontFamily: FONTS.regular,
//                                 color: '#242424',
//                             }}>
//                             {image.name}
//                         </Text>
//                         <TouchableOpacity
//                             onPress={() => removeImageNew(image.path)}>
//                             <Text
//                                 style={{
//                                     color:
//                                         page_is === 'customer_pet_add'
//                                             ? '#009FD3'
//                                             : '#003459',
//                                     fontSize: SIZE(12),
//                                     fontFamily: FONTS.regular,
//                                 }}>
//                                 Remove
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 ))}
//             </View>
//             <TouchableOpacity
//                 onPress={() => {
//                     pickImages();
//                     setErrorMessage &&
//                         setErrorMessage(prev => ({
//                             ...prev,
//                             upload_image_is: false,
//                         }));
//                 }}
//                 activeOpacity={0.8}
//                 style={styles.imageMainContainer}>
//                 <View
//                     style={[
//                         styles.imageContainer,
//                         {
//                             borderColor:
//                                 page_is == 'customer_pet_add'
//                                     ? '#009FD3'
//                                     : '#003459',
//                         },
//                     ]}>
//                     <View style={styles.imageContent}>
//                         <View style={styles.uploadContainer}>
//                             {page_is === 'customer_pet_add' ? (
//                                 <UploadIConCustomer
//                                     width={'100%'}
//                                     height={'100%'}
//                                 />
//                             ) : (
//                                 <UploadICon width={'100%'} height={'100%'} />
//                             )}
//                         </View>
//                     </View>
//                     <View
//                         style={{
//                             alignItems: 'center',
//                             marginTop: SIZE(16),
//                         }}>
//                         <View>
//                             <Text
//                                 style={[
//                                     styles.uploadText,
//                                     {
//                                         color:
//                                             page_is === 'customer_pet_add'
//                                                 ? '#009FD3'
//                                                 : '#003459',
//                                     },
//                                 ]}>
//                                 Upload images
//                             </Text>
//                         </View>
//                         <View style={styles.imageUploadContainer}>
//                             <Text
//                                 style={{
//                                     fontWeight: '700',
//                                     fontSize: SIZE(12),
//                                     color:
//                                         page_is === 'customer_pet_add'
//                                             ? '#009FD3'
//                                             : '#003459',
//                                 }}>
//                                 +Upload
//                             </Text>
//                         </View>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//             {errorMessage.upload_image_is == true && (
//                 <Text style={styles.errorMessage}>
//                     Please select at lease one image
//                 </Text>
//             )}
//             {errorMessage.upload_image_length_is == true && (
//                 <Text style={styles.errorMessage}>
//                     Only 10 images are allowed
//                 </Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {marginTop: SIZE(25)},
//     uploadedContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         marginTop: SIZE(32),
//         borderStyle: 'dashed',
//         padding: SIZE(10),
//         borderWidth: 1,
//         borderRadius: SIZE(8),
//         borderColor: '#003459',
//     },
//     imageMainContainer: {},
//     uploadedImageContainer: {
//         width: SIZE(100),
//         height: SIZE(100),
//     },
//     uploadedImage: {
//         width: '100%',
//         height: '100%',
//     },
//     imageContainer: {
//         backgroundColor: '#EAF7FF',
//         borderWidth: 1,
//         borderRadius: SIZE(8),
//         borderColor: '#003459',
//         paddingHorizontal: SIZE(16),
//         paddingVertical: SIZE(32),
//         borderStyle: 'dashed',
//         alignItems: 'center',
//     },
//     imageContent: {
//         backgroundColor: '#fff',
//         width: SIZE(56),
//         height: SIZE(56),
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: SIZE(40),
//     },
//     uploadContainer: {
//         width: SIZE(24),
//         height: SIZE(24),
//         fontFamily: FONTS.bold,
//     },
//     uploadText: {
//         fontSize: SIZE(14),
//         fontWeight: '400',
//         fontFamily: FONTS.regular,
//         color: '#003459',
//     },
//     errorMessage: {
//         color: 'red',
//         fontFamily: FONTS.regular,
//         fontSize: SIZE(12),
//         marginTop: SIZE(5),
//         textAlign: 'right',
//         marginRight: SIZE(10),
//     },
//     uploadedDocument: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         marginTop: SIZE(10),
//         borderStyle: 'dashed',
//         padding: SIZE(10),
//         borderWidth: 1,
//         borderRadius: SIZE(8),
//         borderColor: '#003459',
//     },
// });

// export default UploadPetImage;

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import UploadICon from '../../../assets/icons/upload.svg';
import UploadIConCustomer from '../../../assets/icons/upload-customer.svg';
import ImagePicker from 'react-native-image-crop-picker';

const UploadPetImage = ({
    selectedImages,
    setSelectedImages,
    errorMessage,
    page_is,
    upToDateImage,
    setUpToDateImage,
    setRemovedImagePk,
    setErrorMessage,
}) => {
    const pickImages = async () => {
        Alert.alert(
            'Choose Image Source',
            'Do you want to pick an image from the gallery or take a photo?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('User cancelled image picker'),
                    style: 'cancel',
                },
                {
                    text: 'Gallery',
                    onPress: () => pickFromGallery(),
                },
                {
                    text: 'Camera',
                    onPress: () => pickFromCamera(),
                },
            ],
            {cancelable: false},
        );
    };

    const pickFromCamera = async () => {
        try {
            const results = await ImagePicker.openCamera({
                mediaType: 'photo',
            });
            handleImageResults(results);
        } catch (err) {
            console.log('Error picking images from camera:', err);
        }
    };

    const pickFromGallery = async () => {
        try {
            const results = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
            });
            handleImageResults(results);
        } catch (err) {
            console.log('Error picking images from gallery:', err);
        }
    };

    const handleImageResults = results => {
        if (Array.isArray(results)) {
            const newImages = results.map(image => ({
                uri: image.path,
                name: image.filename || image.path.split('/').pop(),
                type: image.mime,
                path: image.path,
            }));
            setSelectedImages(prevImages => [...prevImages, ...newImages]);
        } else {
            const newImage = {
                uri: results.path,
                name: results.filename || results.path.split('/').pop(),
                type: results.mime,
                path: results.path,
            };
            setSelectedImages(prevImages => [...prevImages, newImage]);
        }
    };

    const removeImage = pkToRemove => {
        setUpToDateImage(prevImages =>
            prevImages.filter(image => image.id !== pkToRemove),
        );
        setRemovedImagePk(prevSet => new Set(prevSet).add(pkToRemove));
    };

    const removeImageNew = pathToRemove => {
        setSelectedImages(prevImages =>
            prevImages.filter(image => image.path !== pathToRemove),
        );
    };

    const extractFilenameFromURL = url => {
        const lastSlashIndex = url.lastIndexOf('/');
        if (lastSlashIndex !== -1) {
            return url.substring(lastSlashIndex + 1);
        } else {
            return url;
        }
    };

    return (
        <View style={styles.container}>
            <View style={{marginBottom: SIZE(10)}}>
                {upToDateImage?.map((image, index) => (
                    <View
                        style={[
                            styles.uploadedDocument,
                            {
                                borderColor:
                                    page_is === 'customer_pet_add'
                                        ? '#009FD3'
                                        : '#003459',
                            },
                        ]}
                        key={index}>
                        <Text
                            style={{
                                fontSize: SIZE(14),
                                fontFamily: FONTS.regular,
                                color: '#242424',
                            }}>
                            {extractFilenameFromURL(image.image)}
                        </Text>
                        <TouchableOpacity onPress={() => removeImage(image.id)}>
                            <Text
                                style={{
                                    color:
                                        page_is === 'customer_pet_add'
                                            ? '#009FD3'
                                            : '#003459',
                                    fontSize: SIZE(12),
                                    fontFamily: FONTS.regular,
                                }}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {selectedImages.map((image, index) => (
                    <View
                        style={[
                            styles.uploadedDocument,
                            {
                                borderColor:
                                    page_is === 'customer_pet_add'
                                        ? '#009FD3'
                                        : '#003459',
                            },
                        ]}
                        key={index}>
                        <Text
                            style={{
                                fontSize: SIZE(14),
                                fontFamily: FONTS.regular,
                                color: '#242424',
                            }}>
                            {image.name}
                        </Text>
                        <TouchableOpacity
                            onPress={() => removeImageNew(image.path)}>
                            <Text
                                style={{
                                    color:
                                        page_is === 'customer_pet_add'
                                            ? '#009FD3'
                                            : '#003459',
                                    fontSize: SIZE(12),
                                    fontFamily: FONTS.regular,
                                }}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <TouchableOpacity
                onPress={() => {
                    pickImages();
                    setErrorMessage &&
                        setErrorMessage(prev => ({
                            ...prev,
                            upload_image_is: false,
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
                                <UploadICon width={'100%'} height={'100%'} />
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
                                            page_is === 'customer_pet_add'
                                                ? '#009FD3'
                                                : '#003459',
                                    },
                                ]}>
                                Upload images
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
                                +Upload
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {errorMessage.upload_image_is == true && (
                <Text style={styles.errorMessage}>
                    Please select at lease one image
                </Text>
            )}
            {errorMessage.upload_image_length_is == true && (
                <Text style={styles.errorMessage}>
                    Only 10 images are allowed
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {marginTop: SIZE(25)},
    uploadedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SIZE(32),
        borderStyle: 'dashed',
        padding: SIZE(10),
        borderWidth: 1,
        borderRadius: SIZE(8),
        borderColor: '#003459',
    },
    imageMainContainer: {},
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
        borderWidth: 1,
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
        fontSize: SIZE(14),
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
    uploadedDocument: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: SIZE(10),
        borderStyle: 'dashed',
        padding: SIZE(10),
        borderWidth: 1,
        borderRadius: SIZE(8),
        borderColor: '#003459',
    },
});

export default UploadPetImage;
