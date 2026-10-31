import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

// theme
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//svg
import CloseButton from '../../../assets/icons/close-circle.svg';

export default function UploadImages({item, index, removeImage}) {
    return (
        <View
            key={index}
            style={{
                fontSize: SIZE(12),
                padding: SIZE(12),
                backgroundColor: '#fff',
                borderRadius: SIZE(8),
                borderWidth: SIZE(1),
                borderColor: '#D3D3D3',
                fontFamily: FONTS.regular,
                marginBottom: SIZE(16),
            }}>
            <View>
                <Text
                    allowFontScaling={false}
                    style={{
                        fontSize: SIZE(14),
                        fontFamily: FONTS.medium,
                        marginBottom: SIZE(14),
                        fontWeight: '500',
                        color: '#686868',
                    }}>
                    {item.title}
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    fontSize: SIZE(12),
                    paddingHorizontal: SIZE(12),
                    paddingVertical: SIZE(8),
                    backgroundColor: '#EAF7FF',
                    borderRadius: SIZE(8),
                    borderWidth: SIZE(1),
                    borderColor: '#98C1D9',
                    fontFamily: FONTS.regular,
                    flexDirection: 'row',
                    width: SIZE(331),
                    justifyContent: 'space-between',
                }}>
                <View
                    style={{
                        marginRight: SIZE(10),
                    }}>
                    {item.image && (
                        <Text
                            numberOfLines={1}
                            allowFontScaling={false}
                            style={{
                                fontSize: SIZE(14),
                                fontWeight: '600',
                                color: '#003459',
                                fontFamily: FONTS.bold,
                            }}>
                            {item.title}.jpeg
                        </Text>
                    )}
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    hitSlop={0.7}
                    style={{
                        width: SIZE(20),
                        height: SIZE(20),
                    }}>
                    <CloseButton
                        onPress={() => {
                            removeImage(item);
                        }}
                        width="100%"
                        height="100%"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
