import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomMarker from './includes/CustomMarker';
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
const RangeSlider = ({values, final_range, setValues}) => {
    const [marginTop, setMarginTop] = useState();

    const onValuesChange = newValues => {
        setValues(newValues);
    };

    return (
        <View style={[styles.container, {marginTop}]}>
            <MultiSlider
                values={values}
                sliderLength={SIZE(250)}
                onValuesChange={onValuesChange}
                min={0}
                max={final_range}
                step={10}
                allowOverlap
                snapped
                customMarker={e => (
                    <CustomMarker setMarginTop={setMarginTop} {...e} />
                )}
                containerStyle={styles.sliderContainer}
                trackStyle={styles.trackStyle}
                selectedStyle={styles.selectedStyle}
            />
            <View style={styles.sliderOne}>
                <View style={styles.priceContainer}>
                    <View style={styles.priceLeft}>
                        <View style={styles.headingTextContainer}>
                            <Text style={styles.headingText}>Start</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text allowFontScaling={false} style={styles.text}>
                                AED {values[0]}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.priceRight}>
                        <View style={styles.headingTextContainer}>
                            <Text style={styles.headingText}>End</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text allowFontScaling={false} style={styles.text}>
                                AED {values[1]}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // marginTop: SIZE(60),
    },
    sliderContainer: {
        height: SIZE(20),
    },
    trackStyle: {
        height: SIZE(5),
        borderRadius: SIZE(5),
        backgroundColor: '#E2E2E2',
    },
    selectedStyle: {
        backgroundColor: '#009FD3',
    },
    priceContainer: {
        flexDirection: 'row',
    },
    priceLeft: {
        marginRight: SIZE(170),
    },
    headingTextContainer: {
        marginBottom: SIZE(6),
    },
    headingText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    textContainer: {
        backgroundColor: '#F7F7F7',
        borderWidth: SIZE(1),
        borderColor: '#e2e2e2',
        borderRadius: SIZE(6),
        // width: SIZE(74),
        paddingVertical: SIZE(6),
        paddingHorizontal: SIZE(10),
        alignItems: 'center',
    },
    text: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        textAlign: 'center',
    },
});

export default RangeSlider;
