import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ArrowUpIcon from '../../../assets/icons/arrowupblack.svg';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import RangeSlider from '../RangeSlider';

const RangeSelection = ({breedData, values, setValues, final_range}) => {
    const [rateVisible, setRateVisible] = useState(true);

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    setRateVisible(prev => !prev);
                }}
                style={[
                    styles.itemTop,
                    {
                        paddingBottom: rateVisible ? SIZE(12) : 0,
                        borderBottomWidth: rateVisible ? SIZE(1) : 0,
                    },
                ]}>
                <View style={styles.itemHeading}>
                    <Text
                        allowFontScaling={false}
                        style={styles.itemHeadingText}>
                        Rate
                    </Text>
                </View>
                <View style={styles.arrowContainer}>
                    <ArrowUpIcon
                        style={{
                            transform: [
                                {
                                    rotate: !rateVisible ? '180deg' : '0deg',
                                },
                            ],
                        }}
                        width={'100%'}
                        height={'100%'}
                    />
                </View>
            </TouchableOpacity>
            {rateVisible && (
                <View style={styles.itemBottom}>
                    <RangeSlider
                        values={values}
                        setValues={setValues}
                        final_range={final_range ? final_range : 350}
                    />
                </View>
            )}
        </View>
    );
};

export default RangeSelection;

const styles = StyleSheet.create({
    itemContainer: {
        padding: SIZE(15),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        marginBottom: SIZE(16),
    },
    itemTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: SIZE(12),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    itemHeading: {},
    itemHeadingText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    arrowContainer: {
        width: SIZE(16),
        height: SIZE(16),
    },
    itemBottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemSub: {
        marginTop: SIZE(16),
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(8),
        marginRight: SIZE(16),
    },
    itemSubText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
});
