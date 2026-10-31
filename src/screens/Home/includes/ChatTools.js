import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';

//packages
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import DocumentIcon from '../../../assets/icons/chat/document-text.svg';
import GalleryIcon from '../../../assets/icons/chat/gallery.svg';
import LocationIcon from '../../../assets/icons/chat/location.svg';

const ChatTools = ({
    state,
    setSelectedImages,
    setDocument,
    setToolsVisible,
    setMapModalVisible,
    setSelectedLocation,
}) => {
    const commonIconStyle = {
        backgroundColor: !state?.userData?.is_service ? '#007EA7' : '#003459',
    };

    const pickImages = useCallback(async () => {
        try {
            const response = await ImagePicker.openPicker({
                multiple: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
            });
            const formattedImages = response.map(image => {
                const filename = image.path.split('/').pop();
                return {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    name: filename,
                };
            });

            setSelectedImages(formattedImages);
        } catch (error) {
            console.log('Error picking images:', error);
        }
    }, []);

    const handleDocumentSelection = useCallback(async () => {
        const response = await DocumentPicker.pick({
            allowMultiSelection: true,
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
        setDocument(response);
    }, []);

    return (
        <View style={styles.bottomTools}>
            <TouchableOpacity
                onPress={async () => {
                    await handleDocumentSelection();
                    setToolsVisible(false);
                    setSelectedImages([]);
                }}
                activeOpacity={0.8}
                style={[styles.iconSub, {marginRight: SIZE(32)}]}>
                <View style={[styles.bottomIcon, commonIconStyle]}>
                    <DocumentIcon width={SIZE(24)} height={SIZE(24)} />
                </View>
                <Text allowFontScaling={false} style={styles.bottomText}>
                    Document
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    pickImages();
                    setToolsVisible(false);
                    setDocument([]);
                }}
                activeOpacity={0.8}
                style={styles.iconSub}>
                <View style={[styles.bottomIcon, commonIconStyle]}>
                    <GalleryIcon width={SIZE(24)} height={SIZE(24)} />
                </View>
                <Text allowFontScaling={false} style={styles.bottomText}>
                    Gallery
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setToolsVisible(false);
                    setDocument([]);
                    setSelectedImages([]);
                    setMapModalVisible(true);
                    setSelectedLocation('');
                }}
                activeOpacity={0.8}
                style={[styles.iconSub, {marginLeft: SIZE(32)}]}>
                <View style={[styles.bottomIcon, commonIconStyle]}>
                    <LocationIcon width={SIZE(24)} height={SIZE(24)} />
                </View>
                <Text allowFontScaling={false} style={styles.bottomText}>
                    Location
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChatTools;

const styles = StyleSheet.create({
    bottomTools: {
        padding: SIZE(32),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#E2E2E2',
        borderTopWidth: SIZE(1),
    },
    iconSub: {},

    bottomIcon: {
        width: SIZE(56),
        height: SIZE(56),
        backgroundColor: '#003459',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(40),
        marginBottom: SIZE(6),
    },
    bottomText: {
        fontSize: SIZE(12),
        color: '#003459',
        fontFamily: FONTS.regular,
        fontWeight: '400',
        textAlign: 'center',
    },
});
