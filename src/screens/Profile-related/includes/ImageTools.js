import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';

// theme
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import ToolTip from '../../../assets/icons/tooltip.svg';

const ImageTools = ({
    setImageToolList,
    setImageTool,
    imageToolList,
    openImagePicker,
    removeProfileImage,
}) => {
    return (
        <View style={styles.filterMain}>
            <ToolTip
                style={{
                    position: 'absolute',
                    top: SIZE(-19),
                    left: SIZE(20),
                    zIndex: -1500,
                }}
                width={SIZE(20)}
                height={SIZE(20)}
            />
            <Pressable
                onPress={() => {
                    setImageToolList(1);
                    setImageTool(false);
                    if (imageToolList === 1) {
                        setImageToolList(null);
                    }
                    openImagePicker();
                }}
                style={({pressed}) => [
                    styles.buttonContainer,
                    {
                        marginBottom: SIZE(8),
                        backgroundColor: pressed ? '#EAF7FF' : 'transparent',
                    },
                ]}>
                {({pressed}) => (
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.buttonText,
                            {
                                color: !pressed ? '#8E8E8E' : '#009FD3',
                            },
                        ]}>
                        Upload New Picture
                    </Text>
                )}
            </Pressable>
            <Pressable
                onPress={() => {
                    setImageToolList(2);
                    setImageTool(false);
                    if (imageToolList === 2) {
                        setImageToolList(null);
                    }
                    removeProfileImage();
                }}
                style={({pressed}) => [
                    styles.buttonContainer,
                    {
                        backgroundColor: pressed ? '#EAF7FF' : 'transparent',
                    },
                ]}>
                {({pressed}) => (
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.buttonText,
                            {
                                color: !pressed ? '#8E8E8E' : '#009FD3',
                            },
                        ]}>
                        Remove Picture
                    </Text>
                )}
            </Pressable>
        </View>
    );
};

export default ImageTools;

const styles = StyleSheet.create({
    filterMain: {
        padding: SIZE(12),
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        width: SIZE(160),
        position: 'absolute',
        left: SIZE(68),
        top: SIZE(195),
        zIndex: 1000,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.8)',
                shadowOffset: {width: 0, height: SIZE(3)},
                shadowOpacity: 0.3,
                shadowRadius: SIZE(12),
            },
            android: {
                elevation: SIZE(3),
            },
        }),
    },
    buttonContainer: {
        padding: SIZE(8),
        borderRadius: SIZE(6),
    },
    buttonText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
        fontWeight: '600',
        color: '#003459',
    },
});
