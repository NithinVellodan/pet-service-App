import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
// theme
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
// Package
import ImagePicker from 'react-native-image-crop-picker';
// svg
import UploadICon from '../../../../assets/icons/upload.svg';
export default function PickImage({
    setImages,
    setError,
    images,
    single,
    profile,
    training,
}) {
    //openImagePicker function
    const openImagePicker = async () => {
        let imageList = [];

        ImagePicker.openPicker({
            multiple: single ? false : true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 10,
            mediaType: 'photo',
            includeBase64: true,
        })

            .then(response => {
                if (single) {
                    imageList.push({
                        name:
                            response.filename || response.path.split('/').pop(),
                        path: response.path,
                        mime: response.mime,
                    });
                    setImages(imageList);
                    setError('');
                } else {
                    response.map((image, index) => {
                        setImages(prevImages => [
                            ...prevImages,
                            {
                                name:
                                    response.filename ||
                                    image.path.split('/').pop(),
                                path: image.path,
                                mime: image.mime,
                            },
                        ]);
                        setError('');
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    const pickFromGallery = async () => {
        try {
            const results = await ImagePicker.openPicker({
                multiple: true,
                mediaType: 'photo',
                waitAnimationEnd: false,
                includeExif: true,
                forceJpg: true,
                maxFiles: 10,
                includeBase64: true,
            });
            handleImageResults(results);
        } catch (err) {
            console.log('Error picking images from gallery:', err);
        }
    };
    const handleImageResults = results => {
        if (Array.isArray(results)) {
            const newImages = results.map(image => ({
                path: image.path,
                name: image.filename || image.path.split('/').pop(),
                type: image.mime,
            }));
            setImages(prevImages => [...prevImages, ...newImages]);
            setError('');
        } else {
            const newImage = {
                path: results.path,
                name: results.filename || results.path.split('/').pop(),
                type: results.mime,
            };
            setImages(prevImages => [...prevImages, newImage]);
            setError('');
        }
    };
    return (
        <TouchableOpacity
            onPress={() => {
                if (images.length < 10) {
                    if (single) {
                        openImagePicker();
                    } else {
                        pickFromGallery();
                    }
                }
            }}
            activeOpacity={0.8}
            style={styles.imageMainContainer}>
            <View style={styles.imageContainer}>
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
                            allowFontScaling={false}
                            style={styles.uploadText}>
                            {single && !profile && !training
                                ? 'Upload image'
                                : single && profile && !training
                                ? 'Upload Profile Image'
                                : !single && !profile && training
                                ? 'Upload Training Images'
                                : 'Upload images'}
                        </Text>
                    </View>
                    <View style={styles.imageUploadContainer}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                fontWeight: '600',
                                fontSize: SIZE(12),
                                color: '#003459',
                                fontFamily: FONTS.bold,
                                lineHeight: SIZE(15),
                            }}>
                            {' '}
                            +Upload
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imageMainContainer: {
        paddingTop: SIZE(24),
        borderWidth: 1,
        borderColor: '#003459',
        borderStyle: 'dashed',
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(8),
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(32),
    },
    imageContainer: {
        alignItems: 'center',
    },
    imageContent: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(40),
        width: SIZE(50),
        height: SIZE(50),
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
});
