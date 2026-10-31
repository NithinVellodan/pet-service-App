import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

// theme
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

// svg
import UploadICon from '../../../assets/icons/upload.svg';

export default function uploadedImageContainer({openImagePicker}) {
    return (
        <TouchableOpacity
            onPress={() => {
                openImagePicker();
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
                            Upload images
                        </Text>
                    </View>
                    <View style={styles.imageUploadContainer}>
                        <Text
                            allowFontScaling={false}
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
    );
}

const styles = StyleSheet.create({
    imageMainContainer: {
        paddingTop: SIZE(24),
    },
    uploadedImageContainer: {
        width: SIZE(100),
        height: SIZE(100),
        marginBottom: SIZE(15),
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(32),
    },
    uploadText: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#003459',
    },
});
