import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

//images and logos
import EditOption from '../../../../assets/icons/editdark.svg';
import RemoveOption from '../../../../assets/icons/battery-disable.svg';

const CardDonate = ({
    item,
    cardPress,
    editPress,
    removePress,
    disableclick,
}) => {
    return (
        <View
            style={[
                styles.item,
                {opacity: !item.is_enabled ? 0.4 : 1},
                {backgroundColor: !item.is_enabled ? 'silver' : '#FFF'},
            ]}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    cardPress && cardPress();
                }}>
                <View style={styles.itemDescriptionContainer}>
                    <Text
                        numberOfLines={1}
                        allowFontScaling={false}
                        style={styles.twoItemTitle}>
                        {item.product_name}
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{uri: item.image}} style={styles.image} />
                </View>
            </TouchableOpacity>
            <View style={{paddingHorizontal: SIZE(16)}}>
                <View style={styles.bottomCard}>
                    <TouchableOpacity
                        hitSlop={10}
                        onPress={() => {
                            editPress && editPress();
                        }}
                        style={styles.bottom}>
                        <EditOption width={SIZE(16)} height={SIZE(16)} />
                        <Text style={styles.bottomText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!disableclick}
                        hitSlop={10}
                        onPress={() => {
                            removePress && removePress();
                        }}
                        style={styles.bottom}>
                        <RemoveOption width={SIZE(16)} height={SIZE(16)} />
                        <Text style={styles.bottomText}>Disable</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CardDonate;

const styles = StyleSheet.create({
    item: {
        width: '48%',
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderRadius: SIZE(12),
        borderWidth: SIZE(0.5),
        borderColor: '#E2E2E2',
    },
    imageContainer: {
        // width: SIZE(190),
        height: SIZE(171),
        overflow: 'hidden',
        paddingHorizontal: SIZE(12),
        marginBottom: SIZE(16),
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: SIZE(8),
    },
    itemDescriptionContainer: {
        paddingTop: SIZE(16),
        paddingHorizontal: SIZE(12),
        marginBottom: SIZE(16),
    },
    twoItemTitle: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        color: '#00171F',
    },
    bottomCard: {
        borderTopWidth: 1,
        borderColor: '#E2E2E2',
        paddingVertical: SIZE(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomText: {
        marginLeft: SIZE(8),
        color: '#003459',
        fontSize: SIZE(12),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(15),
    },
});
